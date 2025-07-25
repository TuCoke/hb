import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/P/index.html.vue"
const data = JSON.parse("{\"path\":\"/P/\",\"title\":\"个人总结\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"解决问题能力\",\"slug\":\"解决问题能力\",\"link\":\"#解决问题能力\",\"children\":[]},{\"level\":2,\"title\":\"\",\"slug\":\"\",\"link\":\"#\",\"children\":[]}],\"git\":{\"updatedTime\":1751450265000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":2,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"557bf97a03f1235bf8457454a09bf7125f11e8d9\",\"time\":1751450265000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"工作个人两个月总结\"},{\"hash\":\"433abbffcdbbe1cc0c5fe1643850ccbc4ced8c8a\",\"time\":1749454780000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"整店搬运\"}]},\"filePathRelative\":\"P/README.md\"}")
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
