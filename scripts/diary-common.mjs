/** lock / unlock 脚本共用的小工具 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(__dirname, '..')
export const PRIVATE_DIR = path.join(ROOT, 'private', 'diary') // 明文，不入库
export const PUBLIC_DIR = path.join(ROOT, 'docs', 'diary')     // 密文，提交到仓库

export const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/')

/** 列出 <dir>/<YYYY>/<MM>.md，返回 [{ year, month, file }] */
export function listMonthFiles(dir) {
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const year of fs.readdirSync(dir).filter((n) => /^\d{4}$/.test(n)).sort()) {
    const ydir = path.join(dir, year)
    if (!fs.statSync(ydir).isDirectory()) continue
    for (const f of fs.readdirSync(ydir).filter((n) => /^(0[1-9]|1[0-2])\.md$/.test(n)).sort()) {
      out.push({ year, month: f.slice(0, 2), file: path.join(ydir, f) })
    }
  }
  return out
}

/** 本地密码文件（在 /private/ 下，随目录一起被 gitignore） */
export const PASSWORD_FILE = path.join(ROOT, 'private', '.password')

/**
 * 解析命令行：
 *   -p/--password 密码    --force 覆盖
 *   --changed 只处理有改动的月份    --check 只检查是否有未加密的改动（不需要密码）
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
    pwd = await askHidden('请输入日记密码：')
    if (confirm) {
      const again = await askHidden('请再输入一次：')
      if (again !== pwd) throw new Error('两次输入的密码不一致')
    }
  }
  if (!pwd) throw new Error('密码不能为空')
  return pwd
}
