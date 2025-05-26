import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/basics.html.vue"
const data = JSON.parse("{\"path\":\"/Net/basics.html\",\"title\":\".NET 基础知识\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\".NET 框架组成\",\"slug\":\"net-框架组成\",\"link\":\"#net-框架组成\",\"children\":[]},{\"level\":2,\"title\":\"C# 语言基础\",\"slug\":\"c-语言基础\",\"link\":\"#c-语言基础\",\"children\":[]},{\"level\":2,\"title\":\"常用数据类型\",\"slug\":\"常用数据类型\",\"link\":\"#常用数据类型\",\"children\":[]},{\"level\":2,\"title\":\"控制流语句\",\"slug\":\"控制流语句\",\"link\":\"#控制流语句\",\"children\":[]}],\"git\":{\"updatedTime\":1748176960000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":1,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"f6f4b819781db4ef3598c7eb9b802988220226fd\",\"time\":1748176960000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"文档合并\"}]},\"filePathRelative\":\"Net/basics.md\"}")
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
