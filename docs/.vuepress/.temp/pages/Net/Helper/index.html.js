import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/Helper/index.html.vue"
const data = JSON.parse("{\"path\":\"/Net/Helper/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1753781440000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"},{\"name\":\"TuCoke\",\"username\":\"TuCoke\",\"email\":\"57646826+TuCoke@users.noreply.github.com\",\"commits\":2,\"url\":\"https://github.com/TuCoke\"}],\"changelog\":[{\"hash\":\"5a7c717691ec293ead2632dfbc421f44983566e1\",\"time\":1753781440000,\"email\":\"57646826+TuCoke@users.noreply.github.com\",\"author\":\"subman\",\"message\":\"Update README.md\"},{\"hash\":\"342ca48f9540eba2be4794f922efe90d3e76b638\",\"time\":1753781121000,\"email\":\"57646826+TuCoke@users.noreply.github.com\",\"author\":\"subman\",\"message\":\"Update README.md\"},{\"hash\":\"6af988ed1d51b1e14003fc99cc7ac6458b55a195\",\"time\":1749008658000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并\"}]},\"filePathRelative\":\"Net/Helper/README.md\"}")
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
