import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/installation.html.vue"
const data = JSON.parse("{\"path\":\"/Net/installation.html\",\"title\":\".NET 安装指南\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"系统要求\",\"slug\":\"系统要求\",\"link\":\"#系统要求\",\"children\":[]},{\"level\":2,\"title\":\"Windows 安装步骤\",\"slug\":\"windows-安装步骤\",\"link\":\"#windows-安装步骤\",\"children\":[]},{\"level\":2,\"title\":\"macOS 安装步骤\",\"slug\":\"macos-安装步骤\",\"link\":\"#macos-安装步骤\",\"children\":[]},{\"level\":2,\"title\":\"Linux 安装步骤\",\"slug\":\"linux-安装步骤\",\"link\":\"#linux-安装步骤\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"Net/installation.md\"}")
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
