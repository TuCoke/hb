#!/usr/bin/env node
/**
 * 新电脑初始化日记：写入密码文件 → 启用 git 钩子 → 把仓库里的密文全部解密到 private/diary
 *
 * 用法：
 *   npm run diary:init              交互输入密码
 *   npm run diary:init -- -p <密码>
 *
 * 之后写日记 npm run diary，提交 npm run diary:push，git pull 会自动同步明文。
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { decryptText } from '../docs/.vuepress/diaryCrypto.js'
import { ROOT, PASSWORD_FILE, PUBLIC_DIR, listMonthFiles, parseArgs, askHidden, rel } from './diary-common.mjs'

/** 用第一份密文校验密码是否正确，避免把错密码写进文件 */
async function verifyPassword(pwd) {
  const first = listMonthFiles(PUBLIC_DIR)[0]
  if (!first) return true // 仓库里还没有日记，无从校验
  const text = fs.readFileSync(first.file, 'utf8')
  const pick = (k) => {
    const m = text.match(new RegExp('^ +' + k + ': *(.+)$', 'm'))
    return m ? JSON.parse(m[1].trim()) : undefined
  }
  try {
    await decryptText(pwd, { salt: pick('salt'), iv: pick('iv'), data: pick('data') })
    return true
  } catch {
    return false
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2))
  let pwd = opts.password || process.env.DIARY_PASSWORD || ''
  if (!pwd) pwd = await askHidden('请输入日记密码：')
  if (!pwd) throw new Error('密码不能为空')

  if (!(await verifyPassword(pwd))) {
    throw new Error('密码不正确（无法解开仓库里的日记密文），请重试')
  }

  fs.mkdirSync(path.dirname(PASSWORD_FILE), { recursive: true })
  fs.writeFileSync(PASSWORD_FILE, pwd + '\n', 'utf8')
  console.log(`已写入密码文件：${rel(PASSWORD_FILE)}（该目录已被 gitignore）`)

  const hook = spawnSync('git', ['config', 'core.hooksPath', '.githooks'], { cwd: ROOT, stdio: 'inherit' })
  if (hook.status === 0) console.log('已启用 git 钩子：提交自动加密、pull 自动同步')

  const r = spawnSync('node', ['scripts/diary-unlock.mjs', '--force'], { cwd: ROOT, stdio: 'inherit' })
  if (r.status !== 0) process.exit(r.status ?? 1)

  console.log('\n初始化完成 ✔  写日记：npm run diary    提交：npm run diary:push')
}

main().catch((e) => {
  console.error(`失败：${e.message}`)
  process.exit(1)
})
