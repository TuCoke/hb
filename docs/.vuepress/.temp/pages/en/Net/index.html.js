import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/en/Net/index.html.vue"
const data = JSON.parse("{\"path\":\"/en/Net/\",\"title\":\".NET Documentation\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Introduction\",\"slug\":\"introduction\",\"link\":\"#introduction\",\"children\":[]},{\"level\":2,\"title\":\"Usage\",\"slug\":\"usage\",\"link\":\"#usage\",\"children\":[]},{\"level\":2,\"title\":\"Getting Started\",\"slug\":\"getting-started\",\"link\":\"#getting-started\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"en/Net/README.md\"}")
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
