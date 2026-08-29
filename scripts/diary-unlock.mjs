#!/usr/bin/env node
/**
 * 还原明文：docs/<库>/**.md（密文） → private/<库>/**.md
 * 换电脑、或本地明文丢了的时候用。库的列表见 diary-common.mjs 的 VAULTS。
 *
 * 用法：
 *   npm run diary:unlock                已存在的明文文件会跳过
 *   npm run diary:unlock -- --force     覆盖已存在的明文
 *   npm run diary:unlock -- -p <密码>
 *   npm run diary:unlock -- --sync      git pull 后由钩子自动调用，只同步变化的 / 本地缺失的文件
 *
 * 注意：还原的是 md 明文；明文里引用的本地图片在加密时已内联进密文，
 *       还原后如需图片文件，请从原始来源复制到 private 对应目录。
 */
import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'
import { decryptText } from '../docs/.vuepress/diaryCrypto.js'
import { VAULTS, listVaultFiles, counterpart, parseArgs, getPassword, readPasswordFile, readPayload, rel } from './diary-common.mjs'

/** 取 git pull / merge 之前（ORIG_HEAD）那个版本的密文文件，没有则返回 null */
function gitShowBefore(file) {
  try {
    return execSync(`git show ORIG_HEAD:${rel(file)}`, { stdio: ['ignore', 'pipe', 'ignore'] }).toString('utf8')
  } catch {
    return null
  }
}

function writePlain(out, text, stubFile) {
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, text, 'utf8')
  // 时间戳对齐到密文文件，避免下次提交时被当成"有改动"再加密一遍
  const st = fs.statSync(stubFile)
  fs.utimesSync(out, st.atime, st.mtime)
}

/**
 * --sync 模式（post-merge 钩子调用）：git pull 之后把变化的文件同步到本地明文。
 * 安全规则：只有当本地明文没有未提交的改动时才覆盖，否则提示。
 */
async function sync(stubs) {
  const changed = stubs.filter((s) => {
    // 这次 pull 有变化的文件，或者本地根本没有明文的文件（别的电脑新建的 / 本地误删的）
    if (!fs.existsSync(counterpart(s, 'private'))) return true
    const before = gitShowBefore(s.file)
    return before === null || before !== fs.readFileSync(s.file, 'utf8')
  })
  if (changed.length === 0) return

  const pwd = readPasswordFile()
  if (!pwd) {
    console.log(`加密内容有更新（${changed.map((s) => rel(s.file)).join(', ')}）。`)
    console.log('这台电脑没有 private/.password，写入密码后执行 npm run diary:unlock 即可还原明文。')
    return
  }

  for (const s of changed) {
    const out = counterpart(s, 'private')
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
    writePlain(out, latest, s.file)
    console.log(`已同步明文：${rel(out)}`)
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  const stubs = VAULTS.flatMap((v) => listVaultFiles(v, 'public'))
    .map((s) => ({ ...s, payload: readPayload(fs.readFileSync(s.file, 'utf8')) }))
    .filter((s) => s.payload)
  if (stubs.length === 0) {
    if (!opts.sync) console.log('没有找到加密文件（docs/diary、docs/work 下没有密文）')
    return
  }

  if (opts.sync) return sync(stubs)

  const pwd = await getPassword(opts)
  let restored = 0
  for (const s of stubs) {
    const out = counterpart(s, 'private')
    if (fs.existsSync(out) && !opts.force) {
      console.log(`跳过（已存在，加 --force 可覆盖）：${rel(out)}`)
      continue
    }
    let plain
    try {
      plain = JSON.parse(await decryptText(pwd, s.payload)).md
    } catch {
      throw new Error(`解密 ${rel(s.file)} 失败：密码错误或文件损坏`)
    }
    writePlain(out, plain, s.file)
    console.log(`已还原：${rel(s.file)} → ${rel(out)}`)
    restored++
  }
  console.log(`\n完成，还原 ${restored} 个文件。`)
}

main().catch((e) => {
  console.error(`失败：${e.message}`)
  process.exit(1)
})
