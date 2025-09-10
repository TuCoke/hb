import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/NetCoreCode.html.vue"
const data = JSON.parse("{\"path\":\"/Net/NetCoreCode.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Net Core 3.1 框架本质\",\"slug\":\"net-core-3-1-框架本质\",\"link\":\"#net-core-3-1-框架本质\",\"children\":[{\"level\":3,\"title\":\"1. 基础\",\"slug\":\"_1-基础\",\"link\":\"#_1-基础\",\"children\":[]},{\"level\":3,\"title\":\"2. 框架结构\",\"slug\":\"_2-框架结构\",\"link\":\"#_2-框架结构\",\"children\":[]}]}],\"git\":{\"updatedTime\":1757479443000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"075e13c6c84badb53c6c7c32be07b5e45e847567\",\"time\":1757479443000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并\"}]},\"filePathRelative\":\"Net/NetCoreCode.md\"}")
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
