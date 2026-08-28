#!/usr/bin/env node
/**
 * 还原日记明文：docs/diary/<年>/<月>.md（密文） → private/diary/<年>/<月>.md
 * 换电脑、或本地明文丢了的时候用。
 *
 * 用法：
 *   npm run diary:unlock                已存在的明文文件会跳过
 *   npm run diary:unlock -- --force     覆盖已存在的明文
 *   npm run diary:unlock -- -p <密码>
 *   npm run diary:unlock -- --sync    git pull 后由钩子自动调用，只同步变化的月份
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { decryptText } from '../docs/.vuepress/diaryCrypto.js'
import { PRIVATE_DIR, PUBLIC_DIR, listMonthFiles, parseArgs, getPassword, readPasswordFile, rel } from './diary-common.mjs'

/** 从 lock 生成的 frontmatter 里取出 diary 字段（格式固定，不需要完整 YAML 解析） */
function readPayload(text) {
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fm || !/^diary:/m.test(fm[1])) return null
  const pick = (key) => {
    const m = fm[1].match(new RegExp('^ +' + key + ': *(.+)$', 'm'))
    if (!m) return undefined
    const v = m[1].trim()
    return v.startsWith('"') ? JSON.parse(v) : v
  }
  return { salt: pick('salt'), iv: pick('iv'), data: pick('data'), iterations: Number(pick('iterations')) || undefined }
}

/** 取 git pull / merge 之前（ORIG_HEAD）那个版本的密文文件，没有则返回 null */
function gitShowBefore(file) {
  try {
    return execSync(`git show ORIG_HEAD:${rel(file)}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString('utf8')
  } catch {
    return null
  }
}

/**
 * --sync 模式（post-merge 钩子调用）：git pull 之后把变化的月份同步到本地明文。
 * 安全规则：只有当本地明文没有未提交的改动时才覆盖，否则提示。
 */
async function sync(stubs) {
  const changed = stubs.filter((s) => {
    const before = gitShowBefore(s.file)
    return before === null || before !== fs.readFileSync(s.file, 'utf8')
  })
  if (changed.length === 0) return

  const pwd = readPasswordFile()
  if (!pwd) {
    console.log(`日记有更新（${changed.map((s) => `${s.year}/${s.month}`).join(', ')}）。`)
    console.log('这台电脑没有 private/.password，写入密码后执行 npm run diary:unlock 即可还原明文。')
    return
  }

  for (const s of changed) {
    const out = path.join(PRIVATE_DIR, s.year, `${s.month}.md`)
    let latest
    try {
      latest = JSON.parse(await decryptText(pwd, s.payload)).md
    } catch {
      console.warn(`✖ ${rel(s.file)} 解密失败：private/.password 里的密码和这份密文不匹配`)
      continue
    }
    const local = fs.existsSync(out) ? fs.readFileSync(out, 'utf8') : null

    if (local === latest) continue // 已经是最新

    let localIsClean = local === null
    if (!localIsClean) {
      const beforeText = gitShowBefore(s.file)
      const beforePayload = beforeText ? readPayload(beforeText) : null
      if (beforePayload) {
        try {
          localIsClean = JSON.parse(await decryptText(pwd, beforePayload)).md === local
        } catch {}
      }
    }

    if (!localIsClean) {
      console.warn(`⚠ ${rel(out)} 有未提交的本地改动，未覆盖。请先提交本地改动，或备份后执行 npm run diary:unlock -- --force`)
      continue
    }
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, latest, 'utf8')
    const st = fs.statSync(s.file)
    fs.utimesSync(out, st.atime, st.mtime)
    console.log(`已同步日记明文：${rel(out)}`)
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const stubs = listMonthFiles(PUBLIC_DIR)
    .map((s) => ({ ...s, payload: readPayload(fs.readFileSync(s.file, 'utf8')) }))
    .filter((s) => s.payload)
  if (stubs.length === 0) {
    if (!opts.sync) console.log(`没有找到加密的日记（${rel(PUBLIC_DIR)}/<年>/<月>.md）`)
    return
  }

  if (opts.sync) return sync(stubs)

  const pwd = await getPassword(opts)
  let restored = 0
  for (const { year, month, file, payload } of stubs) {
    const out = path.join(PRIVATE_DIR, year, `${month}.md`)
    if (fs.existsSync(out) && !opts.force) {
      console.log(`跳过（已存在，加 --force 可覆盖）：${rel(out)}`)
      continue
    }
    let plain
    try {
      plain = JSON.parse(await decryptText(pwd, payload)).md
    } catch {
      throw new Error(`解密 ${rel(file)} 失败：密码错误或文件损坏`)
    }
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, plain, 'utf8')
    // 时间戳对齐到密文文件，避免下次提交时被当成"有改动"再加密一遍
    const st = fs.statSync(file)
    fs.utimesSync(out, st.atime, st.mtime)
    console.log(`已还原：${rel(file)} → ${rel(out)}`)
    restored++
  }
  console.log(`\n完成，还原 ${restored} 个文件。`)
}

main().catch((e) => {
  console.error(`失败：${e.message}`)
  process.exit(1)
})
