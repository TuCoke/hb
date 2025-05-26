import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"技术文档中心\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"文档导航\",\"slug\":\"文档导航\",\"link\":\"#文档导航\",\"children\":[]},{\"level\":2,\"title\":\"最新更新\",\"slug\":\"最新更新\",\"link\":\"#最新更新\",\"children\":[]},{\"level\":2,\"title\":\"关于本文档\",\"slug\":\"关于本文档\",\"link\":\"#关于本文档\",\"children\":[]}],\"git\":{\"updatedTime\":1748176960000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":2,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"f6f4b819781db4ef3598c7eb9b802988220226fd\",\"time\":1748176960000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"文档合并\"},{\"hash\":\"da545420a7cab54fb8b9a2d4960d0ad31b25c30f\",\"time\":1748173360000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并\"}]},\"filePathRelative\":\"README.md\"}")
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
