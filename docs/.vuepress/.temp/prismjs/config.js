import "E:/Code/vscode/blog/vuepress-starter/node_modules/@vuepress/highlighter-helper/lib/client/styles/base.css"
import "E:/Code/vscode/blog/vuepress-starter/node_modules/@vuepress/plugin-prismjs/lib/client/styles/nord.css"
import "E:/Code/vscode/blog/vuepress-starter/node_modules/@vuepress/highlighter-helper/lib/client/styles/line-numbers.css"
import "E:/Code/vscode/blog/vuepress-starter/node_modules/@vuepress/highlighter-helper/lib/client/styles/notation-highlight.css"
import "E:/Code/vscode/blog/vuepress-starter/node_modules/@vuepress/highlighter-helper/lib/client/styles/collapsed-lines.css"
import { setupCollapsedLines } from "E:/Code/vscode/blog/vuepress-starter/node_modules/@vuepress/highlighter-helper/lib/client/index.js"
import "E:/Code/vscode/blog/vuepress-starter/node_modules/@vuepress/highlighter-helper/lib/client/styles/code-block-title.css"

export default {
  setup() {
    setupCollapsedLines()
  }
}
