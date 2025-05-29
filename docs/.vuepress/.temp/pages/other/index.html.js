import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/index.html.vue"
const data = JSON.parse("{\"path\":\"/other/\",\"title\":\"demo\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"云盘搜索\",\"slug\":\"云盘搜索\",\"link\":\"#云盘搜索\",\"children\":[]},{\"level\":2,\"title\":\"鱼鱼助手\",\"slug\":\"鱼鱼助手\",\"link\":\"#鱼鱼助手\",\"children\":[]}],\"git\":{\"updatedTime\":1748521783000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":7,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"1f05cc2ceec2c5576cc12c3c569dafc8691ba86b\",\"time\":1748521783000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并\"},{\"hash\":\"33b3b24647c686197249bdd8e65d5fc10d91f2b9\",\"time\":1748510894000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并路径\"},{\"hash\":\"281908f7b47ad5fa12b0ad0bc611c92965783239\",\"time\":1748510541000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并问题\"},{\"hash\":\"1cdb539d12c34e8ab5dbc935ec8d4b0e45b28139\",\"time\":1748510182000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"链接跳转\"},{\"hash\":\"bc6c5b47692f28e60b98da4a99e6de41067ece89\",\"time\":1748509701000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并推送\"},{\"hash\":\"d30a92697c5345a0f23b700fea7f3977fc2795ca\",\"time\":1748499091000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"咸鱼助手\"},{\"hash\":\"af7eb058337ef80436e87191a5bee1505a87c495\",\"time\":1748261146000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"鱼鱼助手和权限模型\"}]},\"filePathRelative\":\"other/README.md\"}")
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
