import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/auto/index.html.vue"
const data = JSON.parse("{\"path\":\"/other/auto/\",\"title\":\"🎯闲鱼自动化工具\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"待开发功能\",\"slug\":\"待开发功能\",\"link\":\"#待开发功能\",\"children\":[]},{\"level\":3,\"title\":\"链接\",\"slug\":\"链接\",\"link\":\"#链接\",\"children\":[]},{\"level\":3,\"title\":\"流程\",\"slug\":\"流程\",\"link\":\"#流程\",\"children\":[]}],\"git\":{\"updatedTime\":1748509701000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":3,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"bc6c5b47692f28e60b98da4a99e6de41067ece89\",\"time\":1748509701000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并推送\"},{\"hash\":\"d30a92697c5345a0f23b700fea7f3977fc2795ca\",\"time\":1748499091000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"咸鱼助手\"},{\"hash\":\"af7eb058337ef80436e87191a5bee1505a87c495\",\"time\":1748261146000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"鱼鱼助手和权限模型\"}]},\"filePathRelative\":\"other/auto/README.md\"}")
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
