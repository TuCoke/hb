import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/en/Net/index.html.vue"
const data = JSON.parse("{\"path\":\"/en/Net/\",\"title\":\".NET Documentation\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Introduction\",\"slug\":\"introduction\",\"link\":\"#introduction\",\"children\":[]},{\"level\":2,\"title\":\"Usage\",\"slug\":\"usage\",\"link\":\"#usage\",\"children\":[]},{\"level\":2,\"title\":\"Getting Started\",\"slug\":\"getting-started\",\"link\":\"#getting-started\",\"children\":[]}],\"git\":{\"updatedTime\":1748261146000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"af7eb058337ef80436e87191a5bee1505a87c495\",\"time\":1748261146000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"鱼鱼助手和权限模型\"}]},\"filePathRelative\":\"en/Net/README.md\"}")
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
