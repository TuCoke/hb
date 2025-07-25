import comp from "E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/yolo/index.html.vue"
const data = JSON.parse("{\"path\":\"/yolo/\",\"title\":\"C#调用YoloV5\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"使用yolo帮助我们识别自动化脚本2D 之类的图片\",\"slug\":\"使用yolo帮助我们识别自动化脚本2d-之类的图片\",\"link\":\"#使用yolo帮助我们识别自动化脚本2d-之类的图片\",\"children\":[]},{\"level\":2,\"title\":\"参考\",\"slug\":\"参考\",\"link\":\"#参考\",\"children\":[]},{\"level\":2,\"title\":\"环境准备\",\"slug\":\"环境准备\",\"link\":\"#环境准备\",\"children\":[{\"level\":3,\"title\":\"数据标注\",\"slug\":\"数据标注\",\"link\":\"#数据标注\",\"children\":[]}]},{\"level\":2,\"title\":\"模型训练\",\"slug\":\"模型训练\",\"link\":\"#模型训练\",\"children\":[{\"level\":3,\"title\":\"使用命令\",\"slug\":\"使用命令\",\"link\":\"#使用命令\",\"children\":[]}]}],\"git\":{\"updatedTime\":1753241003000,\"contributors\":[{\"name\":\"Bo-Hong\",\"username\":\"Bo-Hong\",\"email\":\"2764136779@qq.com\",\"commits\":2,\"url\":\"https://github.com/Bo-Hong\"}],\"changelog\":[{\"hash\":\"c9f5df927032344b38e85554c6ddee1d8fc36001\",\"time\":1753241003000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"1\"},{\"hash\":\"398c4e6356ed9ed77c7548da056a745a6c5e601f\",\"time\":1753236297000,\"email\":\"2764136779@qq.com\",\"author\":\"Bo-Hong\",\"message\":\"视觉\"}]},\"filePathRelative\":\"yolo/README.md\"}")
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
