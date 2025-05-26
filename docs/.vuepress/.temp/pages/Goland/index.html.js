import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/index.html.vue"
const data = JSON.parse("{\"path\":\"/Goland/\",\"title\":\"Golang 文档\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"简介\",\"slug\":\"简介\",\"link\":\"#简介\",\"children\":[]},{\"level\":2,\"title\":\"特点\",\"slug\":\"特点\",\"link\":\"#特点\",\"children\":[]},{\"level\":2,\"title\":\"安装指南\",\"slug\":\"安装指南\",\"link\":\"#安装指南\",\"children\":[]},{\"level\":2,\"title\":\"基本语法\",\"slug\":\"基本语法\",\"link\":\"#基本语法\",\"children\":[]}],\"git\":{\"updatedTime\":1748176960000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"f6f4b819781db4ef3598c7eb9b802988220226fd\",\"time\":1748176960000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"文档合并\"}]},\"filePathRelative\":\"Goland/README.md\"}")
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
