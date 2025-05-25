export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/get-started.html", { loader: () => import(/* webpackChunkName: "get-started.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/get-started.html.js"), meta: {"title":""} }],
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":"技术文档中心"} }],
  ["/Net/basics.html", { loader: () => import(/* webpackChunkName: "Net_basics.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/basics.html.js"), meta: {"title":".NET 基础知识"} }],
  ["/Net/installation.html", { loader: () => import(/* webpackChunkName: "Net_installation.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/installation.html.js"), meta: {"title":".NET 安装指南"} }],
  ["/Net/", { loader: () => import(/* webpackChunkName: "Net_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/index.html.js"), meta: {"title":".NET 文档"} }],
  ["/Net/webapi.html", { loader: () => import(/* webpackChunkName: "Net_webapi.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Net/webapi.html.js"), meta: {"title":".NET WebAPI 示例"} }],
  ["/Goland/basics.html", { loader: () => import(/* webpackChunkName: "Goland_basics.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/basics.html.js"), meta: {"title":"Golang 基础知识"} }],
  ["/Goland/installation.html", { loader: () => import(/* webpackChunkName: "Goland_installation.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/installation.html.js"), meta: {"title":"Golang 安装指南"} }],
  ["/Goland/", { loader: () => import(/* webpackChunkName: "Goland_index.html" */"E:/Code/vscode/blog/vuepress-starter/docs/.vuepress/.temp/pages/Goland/index.html.js"), meta: {"title":"Golang 文档"} }],
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
