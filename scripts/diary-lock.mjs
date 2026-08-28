#!/usr/bin/env node
/**
 * 加密日记：private/diary/<年>/<月>.md（明文） → docs/diary/<年>/<月>.md（只含密文）
 *
 * 用法：
 *   npm run diary:lock                 交互输入密码（输入两次）
 *   npm run diary:lock -- -p <密码>    参数传密码（注意会留在 shell 历史里）
 *   DIARY_PASSWORD=<密码> npm run diary:lock
 *
 * 生成的文件只包含：页面标题（取明文第一个一级标题，会公开显示）+ 密文。
 * 每次运行都会重新生成全部月份，密文会变化（盐/IV 随机），这是正常的。
 */
import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import { encryptText } from '../docs/.vuepress/diaryCrypto.js'
import { PRIVATE_DIR, PUBLIC_DIR, listMonthFiles, parseArgs, getPassword, rel } from './diary-common.mjs'

const md = new MarkdownIt({ html: true, linkify: true })

/** 把第一个一级标题拆出来当页面标题，正文不再重复渲染它 */
function splitTitle(text, fallback) {
  const lines = text.split(/\r?\n/)
  const i = lines.findIndex((l) => /^#\s+\S/.test(l))
  if (i === -1) return { title: fallback, body: text }
  const title = lines[i].replace(/^#\s+/, '').trim()
  lines.splice(i, 1)
  return { title, body: lines.join('\n').trim() + '\n' }
}

/** --changed 模式：密文不存在，或明文比密文新，才需要重新加密 */
function needsLock({ year, month, file }) {
  const out = path.join(PUBLIC_DIR, year, `${month}.md`)
  if (!fs.existsSync(out)) return true
  return fs.statSync(file).mtimeMs > fs.statSync(out).mtimeMs
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  let sources = listMonthFiles(PRIVATE_DIR)
  if (sources.length === 0) {
    console.log(`没有找到明文日记（${rel(PRIVATE_DIR)}/<年>/<月>.md），先执行 npm run diary 写一篇吧`)
    return
  }
  if (opts.changed || opts.check) {
    sources = sources.filter(needsLock)
    if (sources.length === 0) {
      console.log('日记没有改动，无需重新加密')
      return
    }
  }
  if (opts.check) {
    // 只报告，不加密：有未加密的改动时以非 0 退出，供 git 钩子使用
    console.log('以下月份有改动但尚未加密：')
    for (const s of sources) console.log(`  ${rel(s.file)}`)
    process.exit(1)
  }

  const pwd = await getPassword(opts, { confirm: true })
  if (pwd.length < 6) throw new Error('密码至少 6 位')
  if (pwd.length < 16) console.warn('提示：密文会公开在仓库里，短密码可被离线暴力破解，建议 16 位以上\n')

  for (const { year, month, file } of sources) {
    const text = fs.readFileSync(file, 'utf8')
    const { title, body } = splitTitle(text, `${year}年${month}月`)
    const html = md.render(body)
    const payload = await encryptText(pwd, JSON.stringify({ md: text, html }))

    const stub = [
      '---',
      `title: ${JSON.stringify(title)}`,
      'diary:',
      `  v: ${payload.v}`,
      `  iterations: ${payload.iterations}`,
      `  salt: ${JSON.stringify(payload.salt)}`,
      `  iv: ${JSON.stringify(payload.iv)}`,
      `  data: ${JSON.stringify(payload.data)}`,
      '---',
      '',
      `<!-- ⚠ 本文件由 npm run diary:lock 自动生成，正文已加密，请勿手动编辑。`,
      `     要写日记请编辑：private/diary/${year}/${month}.md -->`,
      '',
      `# ${title}`,
      '',
      '<DiaryVault />',
      '',
    ].join('\n')

    const out = path.join(PUBLIC_DIR, year, `${month}.md`)
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, stub, 'utf8')
    console.log(`已加密：${rel(file)} → ${rel(out)}  (${(payload.data.length / 1024).toFixed(1)} KB)`)
  }

  // 提醒：docs/diary 里有、private/diary 里没有的月份
  const have = new Set(sources.map((s) => `${s.year}/${s.month}`))
  const orphans = listMonthFiles(PUBLIC_DIR).filter((s) => !have.has(`${s.year}/${s.month}`))
  for (const o of orphans) {
    console.warn(`提示：${rel(o.file)} 在本地没有对应明文（可能是在别的电脑写的），未改动。需要时可用 npm run diary:unlock 还原`)
  }
  if (!opts.changed) console.log('\n完成。现在可以 git add docs/diary 并提交。')
}

main().catch((e) => {
  console.error(`失败：${e.message}`)
  process.exit(1)
})
