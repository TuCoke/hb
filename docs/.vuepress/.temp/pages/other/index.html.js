import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/index.html.vue"
const data = JSON.parse("{\"path\":\"/other/\",\"title\":\"闲鱼自动化工具\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"链接\",\"slug\":\"链接\",\"link\":\"#链接\",\"children\":[]},{\"level\":3,\"title\":\"流程\",\"slug\":\"流程\",\"link\":\"#流程\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"other/README.md\"}")
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
