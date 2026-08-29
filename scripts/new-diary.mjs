#!/usr/bin/env node
/**
 * 新建 / 追加日记条目（每天一个二级标题，自带骨架），并整理当月排版
 *
 * 用法：
 *   npm run diary                          新增今天的条目
 *   npm run diary -- 今天的主题             标题后带上主题
 *   npm run diary -- 2026-08-01 主题       指定日期（补写以前的日记）
 *   npm run diary -- --month               一次生成本月所有天数（已有的跳过）
 *   npm run diary -- --month 2026-09       一次生成指定月份所有天数
 *   npm run diary -- --format              只整理排版，不新增
 *   任意命令加 --no-open                    不自动打开编辑器
 *
 * 规则：已存在的日期条目一律不改动；月份文件只在不存在时新建；条目按日期升序排列。
 * 文件约定：private/diary/<年>/<月>.md（明文，不入库），提交时钩子自动加密到 docs/diary。
 */
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIARY_DIR = path.resolve(__dirname, '../private/diary')
const WEEK = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

/**
 * 新条目的骨架：分块列要点，最后一段总结。用不到的块直接删掉即可。
 * 排序只看 "## MM-DD" 这一层，### 小标题会跟着当天一起走。
 */
const ENTRY_TEMPLATE = `### 反思
1.

### 项目
1.

### 总结
> `

const rawArgs = process.argv.slice(2)
const noOpen = rawArgs.includes('--no-open')
const formatOnly = rawArgs.includes('--format') // 只整理排版，不新增条目
const wholeMonth = rawArgs.includes('--month') // 一次生成整月
const args = rawArgs.filter((a) => !a.startsWith('--')) // 选项不进标题

const pad = (n) => String(n).padStart(2, '0')
const headingOf = (d) => `## ${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${WEEK[d.getDay()]}`

/**
 * 整理当月文件排版：
 *   - 以 "## MM-DD" 开头的段落按日期升序排列（01 → 31，越往下越新）
 *   - 段落之间统一为一个空行，文件以单个换行结尾
 *   - 一级标题及其后、第一个日期段落之前的内容保持在最前
 *   - 不是日期格式的 "## xxx" 段落保持原有相对顺序，放在所有日期段落之后
 * @param {string} text 原文
 * @param {string[]} newHeadings 要插入的新标题（已存在的跳过）
 * @returns {{ text: string, added: string[] }}
 */
function formatDiary(text, newHeadings) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const preamble = []
  const sections = []
  let cur = null
  for (const line of lines) {
    if (/^##\s+/.test(line)) {
      cur = { heading: line.trimEnd(), body: [] }
      sections.push(cur)
    } else if (cur) {
      cur.body.push(line)
    } else {
      preamble.push(line)
    }
  }
  const dateOf = (s) => {
    const m = s.heading.match(/^##\s+(\d{2})-(\d{2})\b/)
    return m ? m[1] + m[2] : null
  }
  const dateKey = (heading) => heading.match(/^##\s+(\d{2})-(\d{2})\b/)?.slice(1).join('') ?? null
  const added = []
  for (const h of newHeadings) {
    const key = dateKey(h)
    // 同一天已有条目（不管标题后面的主题是什么）就不再新增
    if (sections.some((s) => (key ? dateOf(s) === key : s.heading === h))) continue
    sections.push({ heading: h, body: ENTRY_TEMPLATE.split('\n') })
    added.push(h)
  }
  const dated = sections.filter((s) => dateOf(s)).sort((a, b) => dateOf(a).localeCompare(dateOf(b)))
  const undated = sections.filter((s) => !dateOf(s))
  const render = (s) => {
    const body = s.body.join('\n').trim()
    return body ? `${s.heading}\n\n${body}` : s.heading
  }
  const head = preamble.join('\n').trim()
  return { text: [head, ...dated.map(render), ...undated.map(render)].filter(Boolean).join('\n\n') + '\n', added }
}

// ---------- 解析日期 ----------
let date = new Date()
if (args[0] && /^\d{4}-\d{2}(-\d{2})?$/.test(args[0])) {
  const s = args.shift()
  date = new Date(`${s.length === 7 ? s + '-01' : s}T00:00:00`)
  if (Number.isNaN(date.getTime())) {
    console.error('日期无效，请使用 YYYY-MM-DD（或 --month 配合 YYYY-MM）')
    process.exit(1)
  }
}
const title = args.join(' ').trim()
const year = String(date.getFullYear())
const month = pad(date.getMonth() + 1)

// ---------- 准备月份文件（只在不存在时新建）----------
const dir = path.join(DIARY_DIR, year)
const file = path.join(dir, `${month}.md`)
const rel = path.relative(process.cwd(), file)
fs.mkdirSync(dir, { recursive: true })
if (!fs.existsSync(file)) {
  fs.writeFileSync(file, `# ${year}年${month}月日记\n`, 'utf8')
  console.log(`新建文件：${rel}`)
}

// ---------- 决定要插入哪些标题 ----------
let newHeadings = []
if (formatOnly) {
  newHeadings = []
} else if (wholeMonth) {
  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  for (let d = 1; d <= days; d++) newHeadings.push(headingOf(new Date(date.getFullYear(), date.getMonth(), d)))
} else {
  const h = headingOf(date)
  newHeadings = [title ? `${h} ${title}` : h]
}

// ---------- 写入 ----------
const content = fs.readFileSync(file, 'utf8')
const { text: formatted, added } = formatDiary(content, newHeadings)
if (formatted !== content) fs.writeFileSync(file, formatted, 'utf8')

if (formatOnly) {
  console.log(formatted !== content ? '已整理排版（按日期排序、统一空行）' : '排版已是整齐的，无需改动')
} else if (wholeMonth) {
  console.log(added.length ? `已生成 ${year}年${month}月 的 ${added.length} 天（已有的 ${newHeadings.length - added.length} 天保持不动）` : `${year}年${month}月 所有天数都已存在，未改动`)
} else if (added.length === 0) {
  console.log(`条目已存在：${headingOf(date)}（未改动）`)
} else {
  console.log(`已新增：${added[0]}（按日期插入到对应位置）`)
}
console.log(`文件：${rel}`)
console.log('写完双击 提交日记.bat（或 npm run diary:push）即可加密并推送')

// 顺手在 VS Code 里打开这个文件（没装 code 命令就忽略）
if (!noOpen) {
  try {
    const child = spawn('code', ['-r', file], { shell: true, stdio: 'ignore', detached: true })
    child.on('error', () => {})
    child.unref()
  } catch {}
}
