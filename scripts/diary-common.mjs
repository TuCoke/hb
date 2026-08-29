/** lock / unlock / init / push 脚本共用的小工具 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, '..')

/** 本地密码文件（在 /private/ 下，随目录一起被 gitignore） */
export const PASSWORD_FILE = path.join(ROOT, 'private', '.password')

/**
 * 保险库：需要密码才能看的板块。private 下放明文（不入库），docs 下放自动生成的密文。
 * 再加一个板块只需在这里加一行，lock / unlock / 钩子 / 浏览器解密全部通用。
 *   match(rel)：相对库根目录的路径，决定哪些 .md 参与加密（日记只认 <年>/<月>.md，说明页和表情表不加密）
 */
export const VAULTS = [
  {
    name: '日记',
    privateDir: path.join(ROOT, 'private', 'diary'),
    publicDir: path.join(ROOT, 'docs', 'diary'),
    match: (rel) => /^\d{4}\/(0[1-9]|1[0-2])\.md$/.test(rel),
  },
  {
    name: '工作总结',
    privateDir: path.join(ROOT, 'private', 'work'),
    publicDir: path.join(ROOT, 'docs', 'work'),
    match: (rel) => rel.endsWith('.md'),
  },
]

// 兼容旧引用（new-diary 等只关心日记）
export const PRIVATE_DIR = VAULTS[0].privateDir
export const PUBLIC_DIR = VAULTS[0].publicDir

export const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/')

/** 列出某个库某一侧参与加密的 md 文件 → [{ vault, rel, file }] */
export function listVaultFiles(vault, side) {
  const base = side === 'private' ? vault.privateDir : vault.publicDir
  if (!fs.existsSync(base)) return []
  const out = []
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (e.name.endsWith('.md')) {
        const r = path.relative(base, p).split(path.sep).join('/')
        if (vault.match(r)) out.push({ vault, rel: r, file: p })
      }
    }
  }
  walk(base)
  return out.sort((a, b) => a.rel.localeCompare(b.rel))
}

/** 同一个文件在另一侧的路径（明文 ↔ 密文） */
export function counterpart(entry, side) {
  const base = side === 'private' ? entry.vault.privateDir : entry.vault.publicDir
  return path.join(base, ...entry.rel.split('/'))
}

/** 从 lock 生成的 frontmatter 里取出密文字段（vault: 或早期的 diary:），不是密文文件则返回 null */
export function readPayload(text) {
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!fm || !/^(vault|diary):/m.test(fm[1])) return null
  const pick = (key) => {
    const m = fm[1].match(new RegExp('^ +' + key + ': *(.+)$', 'm'))
    if (!m) return undefined
    const v = m[1].trim()
    return v.startsWith('"') ? JSON.parse(v) : v
  }
  return { salt: pick('salt'), iv: pick('iv'), data: pick('data'), iterations: Number(pick('iterations')) || undefined }
}

/**
 * 解析命令行：
 *   -p/--password 密码    --force 覆盖
 *   --changed 只处理有改动的文件    --check 只检查是否有未加密的改动（不需要密码）
 *   --sync    git pull 后同步（钩子用）
 */
export function parseArgs(argv) {
  const opts = { password: '', force: false, changed: false, check: false, sync: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '-p' || a === '--password') opts.password = argv[++i] || ''
    else if (a.startsWith('--password=')) opts.password = a.slice('--password='.length)
    else if (a === '--force' || a === '-f') opts.force = true
    else if (a === '--changed') opts.changed = true
    else if (a === '--check') opts.check = true
    else if (a === '--sync') opts.sync = true
  }
  return opts
}

/** 读取 private/.password，没有则返回空串 */
export function readPasswordFile() {
  try {
    return fs.readFileSync(PASSWORD_FILE, 'utf8').trim()
  } catch {
    return ''
  }
}

const CTRL_C = String.fromCharCode(3)
const DEL = String.fromCharCode(127)
const BS = String.fromCharCode(8)
const CR = String.fromCharCode(13)
const LF = String.fromCharCode(10)

/** 在终端里隐藏输入地读一行 */
export function askHidden(prompt) {
  return new Promise((resolve, reject) => {
    const stdin = process.stdin
    if (!stdin.isTTY) {
      reject(new Error('当前不是交互终端，请用环境变量 DIARY_PASSWORD 或参数 -p <密码> 提供密码'))
      return
    }
    process.stdout.write(prompt)
    stdin.setRawMode(true)
    stdin.resume()
    stdin.setEncoding('utf8')
    let buf = ''
    const cleanup = () => {
      stdin.setRawMode(false)
      stdin.pause()
      stdin.off('data', onData)
    }
    const onData = (chunk) => {
      for (const ch of chunk) {
        if (ch === CR || ch === LF) {
          cleanup()
          process.stdout.write(LF)
          resolve(buf)
          return
        }
        if (ch === CTRL_C) {
          cleanup()
          process.stdout.write(LF)
          process.exit(130)
        }
        if (ch === DEL || ch === BS) buf = buf.slice(0, -1)
        else buf += ch
      }
    }
    stdin.on('data', onData)
  })
}

/**
 * 获取密码，优先级：-p 参数 > 环境变量 DIARY_PASSWORD > private/.password 文件 > 交互输入。
 * confirm=true 时交互输入需要重复一次（用于加密，防止手误）。
 */
export async function getPassword(opts, { confirm = false } = {}) {
  let pwd = opts.password || process.env.DIARY_PASSWORD || readPasswordFile()
  if (!pwd) {
    pwd = await askHidden('请输入密码：')
    if (confirm) {
      const again = await askHidden('请再输入一次：')
      if (again !== pwd) throw new Error('两次输入的密码不一致')
    }
  }
  if (!pwd) throw new Error('密码不能为空')
  return pwd
}
