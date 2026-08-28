#!/usr/bin/env node
/**
 * 新建 / 追加一条日记
 *
 * 用法：
 *   npm run diary                        在本月日记里追加今天的标题
 *   npm run diary -- 今天的主题           标题后带上主题
 *   npm run diary -- 2026-08-01 主题     指定日期（补写以前的日记）
 *
 * 文件约定：private/diary/<年>/<月>.md（明文，不入库），一个月一个文件，一天一个二级标题。
 * 写完后执行 npm run diary:lock 加密生成 docs/diary/<年>/<月>.md 再提交。
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIARY_DIR = path.resolve(__dirname, '../private/diary')
const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

const rawArgs = process.argv.slice(2)
const noOpen = rawArgs.includes('--no-open')
const args = rawArgs.filter((a) => a !== '--no-open') // 选项不进标题
let date = new Date()
if (args[0] && /^\d{4}-\d{2}-\d{2}$/.test(args[0])) {
  date = new Date(`${args.shift()}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    console.error('日期无效，请使用 YYYY-MM-DD 格式')
    process.exit(1)
  }
}
const title = args.join(' ').trim()

const pad = (n) => String(n).padStart(2, '0')
const year = String(date.getFullYear())
const month = pad(date.getMonth() + 1)
const day = pad(date.getDate())
const heading = `## ${month}-${day} ${WEEK[date.getDay()]}`

const dir = path.join(DIARY_DIR, year)
const file = path.join(dir, `${month}.md`)
const rel = path.relative(process.cwd(), file)

fs.mkdirSync(dir, { recursive: true })
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, `# ${year}年${month}月日记\n`, 'utf8')
  console.log(`新建文件：${rel}`)
}

const content = fs.readFileSync(file, 'utf8')
// 同一天只保留一个标题：匹配 "## MM-DD 星期X" 或 "## MM-DD 星期X 主题"
const exists = content
  .split(/\r?\n/)
  .some((line) => line.trim() === heading || line.startsWith(heading + ' '))

if (exists) {
  console.log(`条目已存在：${heading}`)
} else {
  const fullHeading = title ? `${heading} ${title}` : heading
  const entry = `\n${fullHeading}\n\n`
  fs.appendFileSync(file, (content.endsWith('\n') ? '' : '\n') + entry, 'utf8')
  console.log(`已追加：${fullHeading}`)
}
console.log(`文件：${rel}`)
console.log('写完直接 git commit，提交钩子会自动加密；也可手动 npm run diary:lock')

// 顺手在 VS Code 里打开这个文件（没装 code 命令就忽略）
if (!noOpen) {
  try {
    const child = spawn('code', ['-r', file], { shell: true, stdio: 'ignore', detached: true })
    child.on('error', () => {})
    child.unref()
  } catch {}
}
