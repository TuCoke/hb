import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DOCS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/**
 * 根据目录结构自动生成侧边栏，任何板块都可以用，无需手动维护 children。
 *
 * 规则：
 *   - 子目录  → 分组（可折叠）。分组文字取该目录 README.md 的一级标题，没有 README 就用目录名
 *   - .md 文件 → 链接。链接文字由主题自动取页面一级标题（和现有配置写 '/Net/Cache' 的效果一样）
 *   - 基目录下的 README.md 放在第一位；没有任何 .md 的目录（如 images/）自动忽略
 *   - 以 . 或 _ 开头的文件/目录忽略
 *
 * 用法（config.js）：
 *   { text: '日记', collapsible: true, children: autoSidebar('/diary/', { desc: true }) }
 *   { text: 'Work', collapsible: true, children: autoSidebar('/work/') }
 *
 * @param {string} base   以 / 开头、/ 结尾的文档路径，如 '/diary/'
 * @param {object} [options]
 * @param {boolean} [options.desc=false]        倒序排列（日记/日志类目录最新在前）
 * @param {boolean} [options.collapsible=true]  子分组是否可折叠
 * @param {number}  [options.depth=Infinity]    最多向下扫描几层目录
 */
export function autoSidebar(base, options = {}) {
  const { desc = false, collapsible = true, depth = Infinity } = options
  const dir = path.join(DOCS_DIR, base)
  if (!fs.existsSync(dir)) return []
  return scan(dir, base, { desc, collapsible, depth }, 0)
}

function scan(dir, base, opts, level) {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !e.name.startsWith('.') && !e.name.startsWith('_'))

  const compare = (a, b) => a.localeCompare(b, 'zh-CN', { numeric: true })
  const sortNames = (names) => names.sort(desc(opts) ? (a, b) => compare(b, a) : compare)

  const items = []

  // 1. 基目录自己的 README 放最前
  if (entries.some((e) => e.isFile() && e.name === 'README.md')) {
    items.push(base)
  }

  // 2. 子目录 → 分组
  if (level < opts.depth) {
    const dirs = sortNames(entries.filter((e) => e.isDirectory()).map((e) => e.name))
    for (const name of dirs) {
      const subDir = path.join(dir, name)
      const subBase = `${base}${name}/`
      const readme = path.join(subDir, 'README.md')
      const hasReadme = fs.existsSync(readme)
      const children = scan(subDir, subBase, opts, level + 1)
      // 分组里的 README 已由 link 承担，不再重复出现在 children 中
      const rest = children.filter((c) => c !== subBase)
      if (children.length === 0) continue

      items.push({
        text: hasReadme ? pageTitle(readme) || name : name,
        link: hasReadme ? subBase : undefined,
        collapsible: opts.collapsible,
        children: rest,
      })
    }
  }

  // 3. .md 文件 → 链接
  const files = sortNames(
    entries
      .filter((e) => e.isFile() && e.name.endsWith('.md') && e.name !== 'README.md')
      .map((e) => e.name.slice(0, -3))
  )
  for (const name of files) items.push(`${base}${name}`)

  return items
}

function desc(opts) {
  return opts.desc === true
}

/** 读取页面标题：优先 frontmatter 的 title，其次第一个一级标题 */
function pageTitle(file) {
  const text = fs.readFileSync(file, 'utf8')
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (fm) {
    const t = fm[1].match(/^title:\s*(.+)$/m)
    if (t) return t[1].trim().replace(/^['"]|['"]$/g, '')
  }
  const h1 = text.match(/^#\s+(.+?)\s*$/m)
  return h1 ? h1[1].trim() : ''
}
