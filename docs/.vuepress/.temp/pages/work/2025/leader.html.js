import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/2025/leader.html.vue"
const data = JSON.parse("{\"path\":\"/work/2025/leader.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"任务\",\"slug\":\"任务\",\"link\":\"#任务\",\"children\":[]},{\"level\":2,\"title\":\"功能点\",\"slug\":\"功能点\",\"link\":\"#功能点\",\"children\":[]},{\"level\":2,\"title\":\"任务分解 甘特图\",\"slug\":\"任务分解-甘特图\",\"link\":\"#任务分解-甘特图\",\"children\":[]}],\"git\":{\"updatedTime\":1749448259000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":3,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"21a6f3231c2399edbcf419a7028a4a5bec8c800a\",\"time\":1749448259000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"整合上货工具\"},{\"hash\":\"9592b82029e65fe86334b6348ac6850ff20bdcdb\",\"time\":1749437308000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"leader如何分配\"},{\"hash\":\"da545420a7cab54fb8b9a2d4960d0ad31b25c30f\",\"time\":1748173360000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并\"}]},\"filePathRelative\":\"work/2025/leader.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
