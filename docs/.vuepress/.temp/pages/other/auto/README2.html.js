import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/auto/README2.html.vue"
const data = JSON.parse("{\"path\":\"/other/auto/README2.html\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"闲鱼云控自动化\",\"slug\":\"闲鱼云控自动化\",\"link\":\"#闲鱼云控自动化\",\"children\":[{\"level\":3,\"title\":\"支持功能\",\"slug\":\"支持功能\",\"link\":\"#支持功能\",\"children\":[]}]}],\"git\":{\"updatedTime\":1753430525000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"b684f88b6fd6bee95bc8582623fa5ba66a9a6a44\",\"time\":1753430525000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"table格式的输出\"}]},\"filePathRelative\":\"other/auto/README2.md\"}")
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
