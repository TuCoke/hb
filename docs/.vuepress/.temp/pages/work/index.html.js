import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/index.html.vue"
const data = JSON.parse("{\"path\":\"/work/\",\"title\":\"个人工作总结\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":1753680814000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"676f1282e7be8737045e7ccf955315c7fb717f69\",\"time\":1753680814000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"个人工作总结work\"}]},\"filePathRelative\":\"work/README.md\"}")
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
