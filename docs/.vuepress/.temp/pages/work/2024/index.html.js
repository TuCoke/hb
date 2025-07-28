import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/2024/index.html.vue"
const data = JSON.parse("{\"path\":\"/work/2024/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"\",\"slug\":\"-1\",\"link\":\"#-1\",\"children\":[]}],\"git\":{\"updatedTime\":1753682290000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"89650b00ac3632330846019f3b58c0a3a0252f2d\",\"time\":1753682290000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"md个人work\"}]},\"filePathRelative\":\"work/2024/README.md\"}")
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
