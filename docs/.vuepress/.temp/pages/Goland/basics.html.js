import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/basics.html.vue"
const data = JSON.parse("{\"path\":\"/Goland/basics.html\",\"title\":\"Golang 基础知识\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Go 语言特性\",\"slug\":\"go-语言特性\",\"link\":\"#go-语言特性\",\"children\":[]},{\"level\":2,\"title\":\"Hello World\",\"slug\":\"hello-world\",\"link\":\"#hello-world\",\"children\":[]},{\"level\":2,\"title\":\"变量和数据类型\",\"slug\":\"变量和数据类型\",\"link\":\"#变量和数据类型\",\"children\":[]},{\"level\":2,\"title\":\"控制流\",\"slug\":\"控制流\",\"link\":\"#控制流\",\"children\":[]},{\"level\":2,\"title\":\"函数\",\"slug\":\"函数\",\"link\":\"#函数\",\"children\":[]}],\"git\":{\"updatedTime\":1748176960000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"f6f4b819781db4ef3598c7eb9b802988220226fd\",\"time\":1748176960000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"文档合并\"}]},\"filePathRelative\":\"Goland/basics.md\"}")
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
