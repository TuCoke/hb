import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/2025/README-HJY.html.vue"
const data = JSON.parse("{\"path\":\"/work/2025/README-HJY.html\",\"title\":\"宏基因系统\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"项目结构\",\"slug\":\"项目结构\",\"link\":\"#项目结构\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"work/2025/README-HJY.md\"}")
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
