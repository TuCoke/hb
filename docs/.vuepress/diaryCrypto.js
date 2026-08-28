/**
 * 日记加解密（浏览器与 Node 共用同一份实现，保证两端算法一致）
 *
 *   密钥派生：PBKDF2-SHA256，随机 16 字节盐，30 万次迭代
 *   加密算法：AES-256-GCM，随机 12 字节 IV（自带完整性校验，密码错会直接抛错）
 *
 * 密码不会出现在任何文件里；仓库和构建产物中只有密文。
 */
export const ITERATIONS = 300000

function subtle() {
  const c = globalThis.crypto
  if (!c || !c.subtle) {
    throw new Error('当前环境不支持 WebCrypto，页面需要通过 HTTPS 或 localhost 访问')
  }
  return c.subtle
}

export function toBase64(bytes) {
  let s = ''
  for (const b of bytes) s += String.fromCharCode(b)
  return btoa(s)
}

export function fromBase64(str) {
  const s = atob(str)
  const out = new Uint8Array(s.length)
  for (let i = 0; i < s.length; i++) out[i] = s.charCodeAt(i)
  return out
}

async function deriveKey(password, salt, iterations) {
  const base = await subtle().importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey'])
  return subtle().deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

/** 加密字符串，返回可直接写入 frontmatter 的对象 */
export async function encryptText(password, plain) {
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16))
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt, ITERATIONS)
  const ct = await subtle().encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plain))
  return {
    v: 1,
    iterations: ITERATIONS,
    salt: toBase64(salt),
    iv: toBase64(iv),
    data: toBase64(new Uint8Array(ct)),
  }
}

/** 解密 encryptText 的输出；密码错误时抛出异常 */
export async function decryptText(password, payload) {
  const key = await deriveKey(password, fromBase64(payload.salt), payload.iterations || ITERATIONS)
  const pt = await subtle().decrypt({ name: 'AES-GCM', iv: fromBase64(payload.iv) }, key, fromBase64(payload.data))
  return new TextDecoder().decode(pt)
}
