import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { webpackBundler } from '@vuepress/bundler-webpack'
import { autoSidebar } from './autoSidebar.js'

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
            text: '自己项目总结',
            children: [
              {
                text: '云盘搜索',
                link: '/other/yupan/',
              },
              {
                text: '鱼鱼助手（闲鱼自动化）',
                link: '/other/auto/',
              },
              {
                text: 'AutoGo 云控',
                link: '/other/autogov/',
              },
            ]
          },

          {
            text: '日记',
            link: '/diary/',
          },
        ],
        sidebar: [
          {
            text: '.NET 文档',
            collapsible: true,
            children: [
              '/Net/',
              '/Net/Cache',
              '/Net/Wechat',
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
            text: 'Work',
            //collapsible: true,
            children: [
              {
                text: '2024年工作总结',
                collapsible: true,
                link: '/work/README2024',
                children: [
                  // {
                  //   text: '文件上传工具',
                  //   link: '/work/2025/README-Table',
                  // },
                ]
              },
              {
                text: '2025年工作总结',
                link: '/work/README2025',
                //  collapsible: true,
                children: [
                  {
                    text: '宏基因',
                    link: '/work/2025/README-HJY',
                  },
                  {
                    text: '文件上传工具',
                    link: '/work/2025/README-Table',
                  },
                  {
                    text: '跨境电商ERP-Commerce',
                    link: '/work/2025/12/README-Commerce'
                  },
                ]
              },


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
            text: '机器视觉',
            collapsible: true,
            children: [
              '/yolo/'
            ]
          },
          {
            text: '自己项目总结',
            collapsible: true,
            children: [
              {
                text: '总览',
                link: '/other/',
              },
              {
                text: '云盘搜索',
                link: '/other/yupan/',
              },
              {
                text: '鱼鱼助手（闲鱼自动化）',
                link: '/other/auto/',
                collapsible: true,
                children: [
                  {
                    text: '云控功能说明',
                    link: '/other/auto/README2',
                  },
                  {
                    text: '运营推广方案',
                    link: '/other/auto/yu',
                  },
                ]
              },
              {
                text: 'AutoGo 云控',
                link: '/other/autogov/',
                collapsible: true,
                children: [
                  {
                    text: '开发日志',
                    link: '/other/autogov/changelog',
                  },
                ]
              }
            ]
          },
          {
            text: '日记',
            collapsible: true,
            children: [
              // 按目录自动生成（年→月，最新在前），见 .vuepress/autoSidebar.js
              ...autoSidebar('/diary/', { desc: true }),
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

    // git 插件：页面底部“贡献者”只显示真人，过滤掉 AI 协作者（Co-Authored-By 尾注）
    themePlugins: {
      git: {
        contributors: {
          transform: (contributors) =>
            contributors.filter((c) => !/anthropic.com$/i.test(c.email) && !/^claude/i.test(c.name)),
        },
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
