import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/index.html.vue"
const data = JSON.parse("{\"path\":\"/other/\",\"title\":\"闲鱼自动化工具\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"链接\",\"slug\":\"链接\",\"link\":\"#链接\",\"children\":[]},{\"level\":3,\"title\":\"流程\",\"slug\":\"流程\",\"link\":\"#流程\",\"children\":[]}],\"git\":{\"updatedTime\":1748261146000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"af7eb058337ef80436e87191a5bee1505a87c495\",\"time\":1748261146000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"鱼鱼助手和权限模型\"}]},\"filePathRelative\":\"other/README.md\"}")
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
