import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/1.html.vue"
const data = JSON.parse("{\"path\":\"/Net/1.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"sidebar\":\"auto\"},\"headers\":[],\"git\":{\"updatedTime\":1748175050000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":3,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"75f9116aea6c8027f7f7112587c6e4af22188a22\",\"time\":1748175050000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"1\"},{\"hash\":\"957e6d20d966d1d93692576a6be78550910e7f55\",\"time\":1748173947000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"1\"},{\"hash\":\"da545420a7cab54fb8b9a2d4960d0ad31b25c30f\",\"time\":1748173360000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并\"}]},\"filePathRelative\":\"Net/1.md\"}")
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
