import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/en/index.html.vue"
const data = JSON.parse("{\"path\":\"/en/\",\"title\":\"Technical Documentation Center\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Documentation Navigation\",\"slug\":\"documentation-navigation\",\"link\":\"#documentation-navigation\",\"children\":[]},{\"level\":2,\"title\":\"Latest Updates\",\"slug\":\"latest-updates\",\"link\":\"#latest-updates\",\"children\":[]},{\"level\":2,\"title\":\"About This Documentation\",\"slug\":\"about-this-documentation\",\"link\":\"#about-this-documentation\",\"children\":[]}],\"git\":{\"updatedTime\":1748261146000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"af7eb058337ef80436e87191a5bee1505a87c495\",\"time\":1748261146000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"鱼鱼助手和权限模型\"}]},\"filePathRelative\":\"en/README.md\"}")
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
