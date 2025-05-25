export const themeData = JSON.parse("{\"locales\":{\"/\":{\"selectLanguageName\":\"简体中文\",\"selectLanguageText\":\"选择语言\"},\"/en/\":{\"selectLanguageName\":\"English\",\"selectLanguageText\":\"Language\"}},\"logo\":\"https://vuejs.press/images/hero.png\",\"navbar\":false,\"sidebar\":[{\"text\":\".NET 文档\",\"collapsible\":true,\"children\":[\"/Net/\",\"/Net/installation\",\"/Net/basics\",\"/Net/webapi\"]},{\"text\":\"Golang 文档\",\"collapsible\":true,\"children\":[\"/Goland/\",\"/Goland/installation\",\"/Goland/basics\"]}],\"displayAllHeaders\":true,\"sidebarDepth\":2,\"colorMode\":\"auto\",\"colorModeSwitch\":true,\"repo\":null,\"selectLanguageText\":\"Languages\",\"selectLanguageAriaLabel\":\"Select language\",\"editLink\":true,\"editLinkText\":\"Edit this page\",\"lastUpdated\":true,\"contributors\":true,\"contributorsText\":\"Contributors\",\"notFound\":[\"There's nothing here.\",\"How did we get here?\",\"That's a Four-Oh-Four.\",\"Looks like we've got some broken links.\"],\"backToHome\":\"Take me home\",\"openInNewWindow\":\"open in new window\",\"toggleColorMode\":\"toggle color mode\",\"toggleSidebar\":\"toggle sidebar\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
