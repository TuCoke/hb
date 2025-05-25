<template><div><h1 id="golang-安装指南" tabindex="-1"><a class="header-anchor" href="#golang-安装指南"><span>Golang 安装指南</span></a></h1>
<p>本文档将指导您完成 Golang 的安装过程。</p>
<h2 id="系统要求" tabindex="-1"><a class="header-anchor" href="#系统要求"><span>系统要求</span></a></h2>
<p>Go 可以在以下操作系统上运行：</p>
<ul>
<li>Windows 7 或更高版本</li>
<li>macOS 10.11 或更高版本</li>
<li>Linux 系统，如 Ubuntu、CentOS、Debian 等</li>
</ul>
<h2 id="windows-安装步骤" tabindex="-1"><a class="header-anchor" href="#windows-安装步骤"><span>Windows 安装步骤</span></a></h2>
<ol>
<li>访问 <a href="https://golang.org/dl/" target="_blank" rel="noopener noreferrer">Go 官方下载页面</a></li>
<li>下载 Windows 安装包（.msi 文件）</li>
<li>运行下载的安装包并按照提示进行操作</li>
<li>完成安装后，打开命令提示符并运行 <code v-pre>go version</code> 验证安装</li>
</ol>
<h2 id="macos-安装步骤" tabindex="-1"><a class="header-anchor" href="#macos-安装步骤"><span>macOS 安装步骤</span></a></h2>
<h3 id="使用-homebrew-安装" tabindex="-1"><a class="header-anchor" href="#使用-homebrew-安装"><span>使用 Homebrew 安装</span></a></h3>
<p>如果您已安装 Homebrew，可以使用以下命令：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">brew <span class="token function">install</span> go</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="使用安装包安装" tabindex="-1"><a class="header-anchor" href="#使用安装包安装"><span>使用安装包安装</span></a></h3>
<ol>
<li>访问 <a href="https://golang.org/dl/" target="_blank" rel="noopener noreferrer">Go 官方下载页面</a></li>
<li>下载 macOS 安装包（.pkg 文件）</li>
<li>运行安装包并按照提示进行操作</li>
<li>完成安装后，打开终端并运行 <code v-pre>go version</code> 验证安装</li>
</ol>
<h2 id="linux-安装步骤" tabindex="-1"><a class="header-anchor" href="#linux-安装步骤"><span>Linux 安装步骤</span></a></h2>
<h3 id="ubuntu-debian" tabindex="-1"><a class="header-anchor" href="#ubuntu-debian"><span>Ubuntu/Debian</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> golang-go</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="centos-rhel" tabindex="-1"><a class="header-anchor" href="#centos-rhel"><span>CentOS/RHEL</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> epel-release</span>
<span class="line"><span class="token function">sudo</span> yum <span class="token function">install</span> golang</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设置-gopath" tabindex="-1"><a class="header-anchor" href="#设置-gopath"><span>设置 GOPATH</span></a></h2>
<p>安装 Go 后，还需要设置 GOPATH 环境变量，它指定了您的 Go 工作区位置：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># Linux/macOS (添加到 ~/.bashrc 或 ~/.zshrc)</span></span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/go</span>
<span class="line"><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$GOPATH</span>/bin</span>
<span class="line"></span>
<span class="line"><span class="token comment"># Windows (系统环境变量)</span></span>
<span class="line"><span class="token comment"># GOPATH = C:\Users\YourName\go</span></span>
<span class="line"><span class="token comment"># 将 %GOPATH%\bin 添加到 PATH</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


