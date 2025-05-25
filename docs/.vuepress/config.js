import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({

  lang: 'en-US',

  base: "/hb/",
  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
      },
      '/en/': {
        selectLanguageName: 'English',
        selectLanguageText: 'Language',
      }
    },
    logo: 'https://vuejs.press/images/hero.png',

    // 禁用导航栏
    navbar: false,

    // 配置侧边栏 - 所有页面显示相同的侧边栏
    sidebar: [
      {
        text: '.NET 文档',
        collapsible: true,
        children: [
          '/Net/',
          '/Net/installation',
          '/Net/basics',
          '/Net/webapi'
        ]
      },
      {
        text: 'Golang 文档',
        collapsible: true,
        children: [
          '/Goland/',
          '/Goland/installation',
          '/Goland/basics'
        ]
      }
    ],

    displayAllHeaders: true, // 默认值：false

    // 设置为true使得侧边栏总是可见
    sidebarDepth: 2
  }),

  bundler: webpackBundler(),
})
