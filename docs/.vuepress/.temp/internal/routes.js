export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":""} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/en/", { loader: () => import(/* webpackChunkName: "en_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/en/index.html.js"), meta: {"title":"Technical Documentation Center"} }],
  ["/Goland/basics.html", { loader: () => import(/* webpackChunkName: "Goland_basics.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/basics.html.js"), meta: {"title":"Golang 基础知识"} }],
  ["/Goland/installation.html", { loader: () => import(/* webpackChunkName: "Goland_installation.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/installation.html.js"), meta: {"title":"Golang 安装指南"} }],
  ["/Goland/", { loader: () => import(/* webpackChunkName: "Goland_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/index.html.js"), meta: {"title":"Golang 文档"} }],
  ["/Net/basics.html", { loader: () => import(/* webpackChunkName: "Net_basics.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/basics.html.js"), meta: {"title":".NET 基础知识"} }],
  ["/Net/installation.html", { loader: () => import(/* webpackChunkName: "Net_installation.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/installation.html.js"), meta: {"title":".NET 安装指南"} }],
  ["/Net/", { loader: () => import(/* webpackChunkName: "Net_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/index.html.js"), meta: {"title":".NET 文档"} }],
  ["/Net/webapi.html", { loader: () => import(/* webpackChunkName: "Net_webapi.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/webapi.html.js"), meta: {"title":".NET WebAPI 示例"} }],
  ["/other/", { loader: () => import(/* webpackChunkName: "other_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/index.html.js"), meta: {"title":""} }],
  ["/P/", { loader: () => import(/* webpackChunkName: "P_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/P/index.html.js"), meta: {"title":"个人总结"} }],
  ["/P/shuzhi.html", { loader: () => import(/* webpackChunkName: "P_shuzhi.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/P/shuzhi.html.js"), meta: {"title":""} }],
  ["/Rbac/ABAC.html", { loader: () => import(/* webpackChunkName: "Rbac_ABAC.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Rbac/ABAC.html.js"), meta: {"title":"深入浅出ABAC权限设计"} }],
  ["/Rbac/Combined-Permission-Model.html", { loader: () => import(/* webpackChunkName: "Rbac_Combined-Permission-Model.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Rbac/Combined-Permission-Model.html.js"), meta: {"title":"综合权限控制模型设计"} }],
  ["/Rbac/RBAC-XMind-Structure.html", { loader: () => import(/* webpackChunkName: "Rbac_RBAC-XMind-Structure.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Rbac/RBAC-XMind-Structure.html.js"), meta: {"title":"RBAC权限模型XMind结构图"} }],
  ["/Rbac/", { loader: () => import(/* webpackChunkName: "Rbac_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Rbac/index.html.js"), meta: {"title":"深入浅出RBAC权限设计"} }],
  ["/yolo/", { loader: () => import(/* webpackChunkName: "yolo_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/yolo/index.html.js"), meta: {"title":"C#调用YoloV5"} }],
  ["/en/Net/", { loader: () => import(/* webpackChunkName: "en_Net_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/en/Net/index.html.js"), meta: {"title":".NET Documentation"} }],
  ["/Net/Helper/", { loader: () => import(/* webpackChunkName: "Net_Helper_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/Helper/index.html.js"), meta: {"title":"个人整理工具类"} }],
  ["/other/auto/", { loader: () => import(/* webpackChunkName: "other_auto_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/auto/index.html.js"), meta: {"title":"🎯闲鱼自动化工具"} }],
  ["/other/auto/README2.html", { loader: () => import(/* webpackChunkName: "other_auto_README2.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/auto/README2.html.js"), meta: {"title":""} }],
  ["/other/auto/yu.html", { loader: () => import(/* webpackChunkName: "other_auto_yu.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/auto/yu.html.js"), meta: {"title":"🚀 闲鱼自动化上货工具 - 个人运营推广方案"} }],
  ["/other/yupan/", { loader: () => import(/* webpackChunkName: "other_yupan_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/yupan/index.html.js"), meta: {"title":""} }],
  ["/work/2025/leader.html", { loader: () => import(/* webpackChunkName: "work_2025_leader.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/2025/leader.html.js"), meta: {"title":""} }],
  ["/work/2025/README-Table.html", { loader: () => import(/* webpackChunkName: "work_2025_README-Table.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/2025/README-Table.html.js"), meta: {"title":"文件上传系统"} }],
  ["/work/2025/", { loader: () => import(/* webpackChunkName: "work_2025_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/2025/index.html.js"), meta: {"title":"文件上传系统"} }],
  ["/Net/Helper/Http/", { loader: () => import(/* webpackChunkName: "Net_Helper_Http_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/Helper/Http/index.html.js"), meta: {"title":""} }],
  ["/work/2025/07/DA-File-Table.html", { loader: () => import(/* webpackChunkName: "work_2025_07_DA-File-Table.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/2025/07/DA-File-Table.html.js"), meta: {"title":"服务端部署说明 - 文件上传工具文档"} }],
  ["/work/2025/07/DA-File.html", { loader: () => import(/* webpackChunkName: "work_2025_07_DA-File.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/2025/07/DA-File.html.js"), meta: {"title":"服务端部署说明"} }],
  ["/work/2025/07/", { loader: () => import(/* webpackChunkName: "work_2025_07_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/work/2025/07/index.html.js"), meta: {"title":"七月份日常工作"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
