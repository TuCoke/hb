import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/basics.html.vue"
const data = JSON.parse("{\"path\":\"/Net/basics.html\",\"title\":\".NET 基础知识\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\".NET 框架组成\",\"slug\":\"net-框架组成\",\"link\":\"#net-框架组成\",\"children\":[]},{\"level\":2,\"title\":\"C# 语言基础\",\"slug\":\"c-语言基础\",\"link\":\"#c-语言基础\",\"children\":[]},{\"level\":2,\"title\":\"常用数据类型\",\"slug\":\"常用数据类型\",\"link\":\"#常用数据类型\",\"children\":[]},{\"level\":2,\"title\":\"控制流语句\",\"slug\":\"控制流语句\",\"link\":\"#控制流语句\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"Net/basics.md\"}")
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
