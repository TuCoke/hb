#!/usr/bin/env node
/**
 * 加密：private/<库>/**.md（明文） → docs/<库>/**.md（只含密文）
 * 库的列表见 diary-common.mjs 的 VAULTS（目前：日记、工作总结）。
 *
 * 用法：
 *   npm run diary:lock                 加密全部（有 private/.password 就不问密码）
 *   npm run diary:lock -- --changed    只加密内容有变化的文件（钩子用）
 *   npm run diary:lock -- --check      只检查有没有未加密的改动，不需要密码（钩子用）
 *   npm run diary:lock -- -p <密码>
 *
 * 生成的密文文件只包含：页面标题（取明文第一个一级标题，会公开显示）+ 密文。
 * 明文里引用的本地图片会转成 data URI 一起加密，图片文件不需要放在 docs 下。
 */
import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import { encryptText, decryptText } from '../docs/.vuepress/diaryCrypto.js'
import { VAULTS, listVaultFiles, counterpart, parseArgs, getPassword, rel, readPayload } from './diary-common.mjs'

// breaks: true —— 单个换行就显示为换行，怎么分行网页上就怎么显示
const md = new MarkdownIt({ html: true, linkify: true, breaks: true })

// 图片内联：相对路径的本地图片读成 data URI（≤ 5MB），这样图片也在密文里，不必公开
const MIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml', bmp: 'image/bmp' }
const defaultImage = md.renderer.rules.image
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const tok = tokens[idx]
  const src = tok.attrGet('src') || ''
  if (env && env.mdFile && !/^(https?:|data:|\/)/i.test(src)) {
    const abs = path.resolve(path.dirname(env.mdFile), decodeURI(src.split('#')[0].split('?')[0]))
    if (fs.existsSync(abs) && fs.statSync(abs).isFile() && fs.statSync(abs).size <= 5 * 1024 * 1024) {
      const mime = MIME[path.extname(abs).slice(1).toLowerCase()] || 'application/octet-stream'
      tok.attrSet('src', `data:${mime};base64,${fs.readFileSync(abs).toString('base64')}`)
      env.inlined = (env.inlined || 0) + 1
    }
  }
  return defaultImage(tokens, idx, options, env, self)
}

/** 把第一个一级标题拆出来当页面标题，正文不再重复渲染它 */
function splitTitle(text, fallback) {
  const lines = text.split(/\r?\n/)
  const i = lines.findIndex((l) => /^#\s+\S/.test(l))
  if (i === -1) return { title: fallback, body: text }
  const title = lines[i].replace(/^#\s+/, '').trim()
  lines.splice(i, 1)
  return { title, body: lines.join('\n').trim() + '\n' }
}

function fallbackTitle(entry) {
  const m = entry.rel.match(/^(\d{4})\/(\d{2})\.md$/)
  if (m) return `${m[1]}年${m[2]}月`
  return path.basename(entry.rel, '.md')
}

/** 时间戳预筛：密文不存在，或明文比密文新，才可能需要重新加密 */
function needsLock(entry) {
  const out = counterpart(entry, 'public')
  if (!fs.existsSync(out)) return true
  return fs.statSync(entry.file).mtimeMs > fs.statSync(out).mtimeMs
}

/** 现有密文解出来是否和明文一致（密码不匹配或文件损坏都视为不一致，需要重新加密） */
async function sameAsEncrypted(entry, pwd) {
  const out = counterpart(entry, 'public')
  if (!fs.existsSync(out)) return false
  const payload = readPayload(fs.readFileSync(out, 'utf8'))
  if (!payload) return false
  try {
    return JSON.parse(await decryptText(pwd, payload)).md === fs.readFileSync(entry.file, 'utf8')
  } catch {
    return false
  }
}

function buildStub(entry, title, payload) {
  return [
    '---',
    `title: ${JSON.stringify(title)}`,
    'vault:',
    `  v: ${payload.v}`,
    `  iterations: ${payload.iterations}`,
    `  salt: ${JSON.stringify(payload.salt)}`,
    `  iv: ${JSON.stringify(payload.iv)}`,
    `  data: ${JSON.stringify(payload.data)}`,
    '---',
    '',
    `<!-- ⚠ 本文件由 npm run diary:lock 自动生成，正文已加密，请勿手动编辑。`,
    `     要修改内容请编辑：${rel(entry.file)} -->`,
    '',
    `# ${title}`,
    '',
    '<DiaryVault />',
    '',
  ].join('\n')
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  let sources = VAULTS.flatMap((v) => listVaultFiles(v, 'private'))
  if (sources.length === 0) {
    console.log('没有找到明文文件（private/diary、private/work 下都是空的）')
    return
  }
  if (opts.changed || opts.check) {
    sources = sources.filter(needsLock)
    if (sources.length === 0) {
      console.log('没有改动，无需重新加密')
      return
    }
  }
  if (opts.check) {
    // 只报告，不加密：有未加密的改动时以非 0 退出，供 git 钩子使用
    console.log('以下文件有改动但尚未加密：')
    for (const s of sources) console.log(`  ${rel(s.file)}`)
    process.exit(1)
  }

  const pwd = await getPassword(opts, { confirm: true })
  if (pwd.length < 6) throw new Error('密码至少 6 位')
  if (pwd.length < 16) console.warn('提示：密文会公开在仓库里，短密码可被离线暴力破解，建议 16 位以上\n')

  if (opts.changed) {
    // 有密码时改用内容比对：解开现有密文和明文一致就跳过，比时间戳可靠（编辑器打开文件也不会误判）
    const really = []
    for (const s of sources) if (!(await sameAsEncrypted(s, pwd))) really.push(s)
    sources = really
    if (sources.length === 0) {
      console.log('没有改动，无需重新加密')
      return
    }
  }

  for (const entry of sources) {
    const text = fs.readFileSync(entry.file, 'utf8')
    const { title, body } = splitTitle(text, fallbackTitle(entry))
    const env = { mdFile: entry.file, inlined: 0 }
    const html = md.render(body, env)
    const payload = await encryptText(pwd, JSON.stringify({ md: text, html }))
    const out = counterpart(entry, 'public')
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, buildStub(entry, title, payload), 'utf8')
    const size = (payload.data.length / 1024).toFixed(1)
    console.log(`已加密：${rel(entry.file)} → ${rel(out)}  (${size} KB${env.inlined ? `，内联 ${env.inlined} 张图片` : ''})`)
  }

  // 提醒：docs 里有、private 里没有的密文（可能是别的电脑写的）
  for (const v of VAULTS) {
    const have = new Set(listVaultFiles(v, 'private').map((s) => s.rel))
    for (const o of listVaultFiles(v, 'public')) {
      if (have.has(o.rel)) continue
      if (!readPayload(fs.readFileSync(o.file, 'utf8'))) continue
      console.warn(`提示：${rel(o.file)} 在本地没有对应明文（可能是在别的电脑写的），未改动。需要时可用 npm run diary:unlock 还原`)
    }
  }
  if (!opts.changed) console.log('\n完成。现在可以提交了。')
}

main().catch((e) => {
  console.error(`失败：${e.message}`)
  process.exit(1)
})
