import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { webpackBundler } from '@vuepress/bundler-webpack'

export default defineUserConfig({
  // 多语言配置
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: '技术文档中心',
    },
    '/en/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Technical Documentation Center',
    },
  },

  base: "/hb/",

  theme: defaultTheme({
    // GitHub 仓库链接，请替换为您实际的GitHub仓库地址
    repo: 'https://github.com/TuCoke/hb/tree/main',
    // 自定义仓库链接文字
    repoLabel: 'GitHub',

    // 是否显示编辑链接
    editLink: true,
    // 文档目录，默认为docs
    docsDir: 'docs',

    // 多语言配置
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        // 编辑链接文字
        editLinkText: '在 GitHub 上编辑此页',
        // 更新时间文字
        lastUpdatedText: '上次编辑于',
        // 贡献者文字
        contributorsText: '贡献者',

        navbar: [
          {
            text: 'Gitee地址',
            link: 'https://gitee.com/Lovely_Rabbit',
          },
          {
            text: '文档',
            children: [
              {
                text: '.NET 文档',
                link: '/Net/',
              },
              {
                text: 'Golang 文档',
                link: '/Goland/',
              },
              {
                text: 'RBAC 权限设计',
                link: '/Rbac/',
              },
            ]
          },
          {
            text: 'Demo集合',
            children: [
              {
                text: '鱼鱼助手',
                link: '/other/auto/',
              },
            ]
          },

        ],
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
          },
          {
            text: 'RBAC 权限设计',
            collapsible: true,
            children: [
              '/Rbac/',
              '/Rbac/ABAC',
              '/Rbac/Combined-Permission-Model',
              '/Rbac/RBAC-XMind-Structure'
            ]
          },
          {
            text: 'Demo合集',
            collapsible: true,
            children: [
              {
                text: '云盘搜索',
                link: '/other/yupan/',
              },
              {
                text: '鱼鱼助手',
                link: '/other/auto/',
              },
              {
                text: '鱼鱼助手运营方案简化版v1',
                link: '/other/auto/yu',
              }
            ]
          }
        ],
      },
      '/en/': {
        selectLanguageName: 'English',
        selectLanguageText: 'Languages',
        // 编辑链接文字
        editLinkText: 'Edit this page on GitHub',
        // 更新时间文字
        lastUpdatedText: 'Last Updated',
        // 贡献者文字
        contributorsText: 'Contributors',

        navbar: [
          {
            text: 'Docs',
            children: [
              {
                text: '.NET Docs',
                link: '/en/Net/',
              },
              {
                text: 'Golang Docs',
                link: '/en/Goland/',
              },
            ]
          },
          {
            text: 'Projects',
            children: [
              {
                text: 'Fish Assistant',
                link: 'https://api-y.cn/#/',
              },
            ]
          },
        ],
        sidebar: [
          {
            text: '.NET Documentation',
            collapsible: true,
            children: [
              '/en/Net/',
              '/en/Net/installation',
              '/en/Net/basics',
              '/en/Net/webapi'
            ]
          },
          {
            text: 'Golang Documentation',
            collapsible: true,
            children: [
              '/en/Goland/',
              '/en/Goland/installation',
              '/en/Goland/basics'
            ]
          }
        ],
      },
    },

    logo: 'https://vuejs.press/images/hero.png',

    displayAllHeaders: true, // 默认值：false
    sidebarDepth: 2, // 设置侧边栏深度
  }),

  bundler: webpackBundler(),
  // 引入自定义样式
  styles: [
    'styles/styles.css', // 引入自定义CSS文件
  ]
})
