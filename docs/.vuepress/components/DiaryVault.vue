<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'
import { decryptText } from '../diaryCrypto.js'

// 同一个标签页里记住密码，切换月份不用重复输入；关闭标签页即失效
const STORAGE_KEY = 'diary:password'

const frontmatter = usePageFrontmatter()
const payload = computed(() => frontmatter.value.diary)

const password = ref('')
const html = ref('')
const error = ref('')
const busy = ref(false)

async function unlock(pwd, { fromStorage = false } = {}) {
  if (!pwd || !payload.value) return
  busy.value = true
  error.value = ''
  try {
    const json = await decryptText(pwd, payload.value)
    html.value = JSON.parse(json).html
    try { sessionStorage.setItem(STORAGE_KEY, pwd) } catch {}
  } catch (e) {
    try { sessionStorage.removeItem(STORAGE_KEY) } catch {}
    if (!fromStorage) {
      error.value = e && e.message && e.message.includes('WebCrypto') ? e.message : '密码不正确'
    }
  } finally {
    busy.value = false
  }
}

function submit() {
  unlock(password.value)
}

function lock() {
  html.value = ''
  password.value = ''
  error.value = ''
  try { sessionStorage.removeItem(STORAGE_KEY) } catch {}
}

onMounted(() => {
  let saved = ''
  try { saved = sessionStorage.getItem(STORAGE_KEY) || '' } catch {}
  if (saved) unlock(saved, { fromStorage: true })
})
</script>

<template>
  <div class="diary-vault">
    <template v-if="html">
      <div class="diary-vault__bar">
        <span>🔓 已解锁，内容仅在你的浏览器里解密</span>
        <button type="button" class="diary-vault__btn diary-vault__btn--ghost" @click="lock">锁定</button>
      </div>
      <div class="diary-vault__content" v-html="html"></div>
    </template>

    <form v-else class="diary-vault__form" @submit.prevent="submit">
      <div class="diary-vault__icon">🔒</div>
      <p class="diary-vault__hint">这一页的内容已加密，输入密码后在浏览器本地解密查看。</p>
      <div class="diary-vault__row">
        <input
          v-model="password"
          class="diary-vault__input"
          type="password"
          placeholder="请输入密码"
          autocomplete="current-password"
          :disabled="busy"
        />
        <button type="submit" class="diary-vault__btn" :disabled="busy || !password">
          {{ busy ? '解密中…' : '解锁' }}
        </button>
      </div>
      <p v-if="error" class="diary-vault__error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.diary-vault__form {
  margin: 2rem auto;
  max-width: 28rem;
  padding: 2rem 1.5rem;
  border: 1px solid var(--vp-c-border, #e2e2e3);
  border-radius: 8px;
  background: var(--vp-c-bg-alt, #f6f6f7);
  text-align: center;
}
.diary-vault__icon {
  font-size: 2.5rem;
  line-height: 1;
  margin-bottom: 0.75rem;
}
.diary-vault__hint {
  margin: 0 0 1rem;
  color: var(--vp-c-text-mute, #6b7280);
  font-size: 0.95rem;
}
.diary-vault__row {
  display: flex;
  gap: 0.5rem;
}
.diary-vault__input {
  flex: 1;
  min-width: 0;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--vp-c-border, #e2e2e3);
  border-radius: 6px;
  background: var(--vp-c-bg, #fff);
  color: var(--vp-c-text, #213547);
}
.diary-vault__input:focus {
  outline: none;
  border-color: var(--vp-c-accent, #3eaf7c);
}
.diary-vault__btn {
  padding: 0.5rem 1.1rem;
  font-size: 0.95rem;
  border: 1px solid var(--vp-c-accent, #3eaf7c);
  border-radius: 6px;
  background: var(--vp-c-accent-bg, var(--vp-c-accent, #3eaf7c));
  color: var(--vp-c-accent-text, #fff);
  cursor: pointer;
}
.diary-vault__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.diary-vault__btn--ghost {
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  background: transparent;
  color: var(--vp-c-accent, #3eaf7c);
}
.diary-vault__error {
  margin: 0.75rem 0 0;
  color: var(--vp-c-danger, #e5484d);
  font-size: 0.9rem;
}
.diary-vault__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin: 1rem 0 1.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background: var(--vp-c-bg-alt, #f6f6f7);
  color: var(--vp-c-text-mute, #6b7280);
  font-size: 0.85rem;
}
</style>
