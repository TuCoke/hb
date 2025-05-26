export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":""} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"技术文档中心"} }],
  ["/en/", { loader: () => import(/* webpackChunkName: "en_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/en/index.html.js"), meta: {"title":"Technical Documentation Center"} }],
  ["/Goland/basics.html", { loader: () => import(/* webpackChunkName: "Goland_basics.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/basics.html.js"), meta: {"title":"Golang 基础知识"} }],
  ["/Goland/installation.html", { loader: () => import(/* webpackChunkName: "Goland_installation.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/installation.html.js"), meta: {"title":"Golang 安装指南"} }],
  ["/Goland/", { loader: () => import(/* webpackChunkName: "Goland_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/index.html.js"), meta: {"title":"Golang 文档"} }],
  ["/Net/basics.html", { loader: () => import(/* webpackChunkName: "Net_basics.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/basics.html.js"), meta: {"title":".NET 基础知识"} }],
  ["/Net/installation.html", { loader: () => import(/* webpackChunkName: "Net_installation.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/installation.html.js"), meta: {"title":".NET 安装指南"} }],
  ["/Net/", { loader: () => import(/* webpackChunkName: "Net_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/index.html.js"), meta: {"title":".NET 文档"} }],
  ["/Net/webapi.html", { loader: () => import(/* webpackChunkName: "Net_webapi.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/webapi.html.js"), meta: {"title":".NET WebAPI 示例"} }],
  ["/other/", { loader: () => import(/* webpackChunkName: "other_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/other/index.html.js"), meta: {"title":"闲鱼自动化工具"} }],
  ["/Rbac/ABAC.html", { loader: () => import(/* webpackChunkName: "Rbac_ABAC.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Rbac/ABAC.html.js"), meta: {"title":"深入浅出ABAC权限设计"} }],
  ["/Rbac/Combined-Permission-Model.html", { loader: () => import(/* webpackChunkName: "Rbac_Combined-Permission-Model.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Rbac/Combined-Permission-Model.html.js"), meta: {"title":"综合权限控制模型设计"} }],
  ["/Rbac/RBAC-XMind-Structure.html", { loader: () => import(/* webpackChunkName: "Rbac_RBAC-XMind-Structure.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Rbac/RBAC-XMind-Structure.html.js"), meta: {"title":"RBAC权限模型XMind结构图"} }],
  ["/Rbac/", { loader: () => import(/* webpackChunkName: "Rbac_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Rbac/index.html.js"), meta: {"title":"深入浅出RBAC权限设计"} }],
  ["/en/Net/", { loader: () => import(/* webpackChunkName: "en_Net_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/en/Net/index.html.js"), meta: {"title":".NET Documentation"} }],
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
