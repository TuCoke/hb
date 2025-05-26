import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/Yuyu.html.vue"
const data = JSON.parse("{\"path\":\"/other/Yuyu.html\",\"title\":\"闲鱼自动化工具\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"\",\"slug\":\"\",\"link\":\"#\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"other/Yuyu.md\"}")
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
