import { defineClientConfig } from 'vuepress/client'
import DiaryVault from './components/DiaryVault.vue'

export default defineClientConfig({
  enhance({ app }) {
    // 日记页面里 <DiaryVault /> 用到：输入密码后在浏览器本地解密显示
    app.component('DiaryVault', DiaryVault)
  },
})
