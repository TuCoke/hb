import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"\",\"slug\":\"\",\"link\":\"#\",\"children\":[]}],\"git\":{\"updatedTime\":1754896300000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":4,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"aef6e82fd7c49ebbc8e7fcd04773bbc21aed3577\",\"time\":1754896300000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"个人介绍\"},{\"hash\":\"5eddb729217b33f99909ea9f1fa5961cccbaee5e\",\"time\":1749096903000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"个人简介todo\"},{\"hash\":\"f6f4b819781db4ef3598c7eb9b802988220226fd\",\"time\":1748176960000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"文档合并\"},{\"hash\":\"da545420a7cab54fb8b9a2d4960d0ad31b25c30f\",\"time\":1748173360000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"合并\"}]},\"filePathRelative\":\"README.md\"}")
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
