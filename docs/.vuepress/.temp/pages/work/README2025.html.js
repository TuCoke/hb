import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/README2025.html.vue"
const data = JSON.parse("{\"path\":\"/work/README2025.html\",\"title\":\"个人工作总结\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{},\"filePathRelative\":\"work/README2025.md\"}")
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
