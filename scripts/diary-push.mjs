#!/usr/bin/env node
/**
 * 一步到位：加密有改动的日记 → 提交 → 推送
 *
 * 用法：
 *   npm run diary:push                 提交说明默认为 "日记 YYYY-MM-DD"
 *   npm run diary:push -- 补写上周      自定义提交说明
 *
 * 为什么需要它：只改了日记（private/ 不入库）直接 git commit 时，git 会因为暂存区为空而
 * 提示 nothing to commit，即使 pre-commit 钩子已经加密并暂存了密文，需要再 commit 一次。
 * 这个脚本把这几步串起来。
 */
import { spawnSync } from 'node:child_process'
import { ROOT } from './diary-common.mjs'

function run(cmd, args, { quiet = false } = {}) {
  // 不经过 shell：提交说明里的空格、中文才不会被拆开（git / node 都是可执行文件，直接调用即可）
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: quiet ? 'pipe' : 'inherit' })
  if (r.status !== 0 && !quiet) {
    console.error(`失败：${cmd} ${args.join(' ')}`)
    process.exit(r.status ?? 1)
  }
  return r
}

const message = process.argv.slice(2).join(' ').trim() || `日记 ${new Date().toISOString().slice(0, 10)}`

// 1. 只加密有改动的月份
run('node', ['scripts/diary-lock.mjs', '--changed'])

// 2. 暂存密文
run('git', ['add', 'docs/diary'])

// 3. 有变化才提交（--no-verify：钩子里的加密刚刚已经做过了）
const staged = run('git', ['diff', '--cached', '--quiet'], { quiet: true }).status !== 0
if (staged) {
  run('git', ['commit', '--no-verify', '-m', message])
} else {
  console.log('没有需要提交的日记变化')
}

// 4. 推送（本地有未推送的提交时才会真正推东西）
run('git', ['push'])
console.log('\n完成 ✔')
