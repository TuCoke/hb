import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/1.html.vue"
const data = JSON.parse("{\"path\":\"/Net/1.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"测试标题\",\"slug\":\"测试标题\",\"link\":\"#测试标题\",\"children\":[{\"level\":3,\"title\":\"测试标题2\",\"slug\":\"测试标题2\",\"link\":\"#测试标题2\",\"children\":[]}]}],\"git\":{\"updatedTime\":1748173360000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"da545420a7cab54fb8b9a2d4960d0ad31b25c30f\",\"time\":1748173360000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并\"}]},\"filePathRelative\":\"Net/1.md\"}")
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
