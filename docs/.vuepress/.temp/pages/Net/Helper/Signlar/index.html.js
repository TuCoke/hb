import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/Helper/Signlar/index.html.vue"
const data = JSON.parse("{\"path\":\"/Net/Helper/Signlar/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Signlar\",\"slug\":\"signlar\",\"link\":\"#signlar\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"Net/Helper/Signlar/README.md\"}")
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
