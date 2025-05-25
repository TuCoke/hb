<template><div><h1 id="net-安装指南" tabindex="-1"><a class="header-anchor" href="#net-安装指南"><span>.NET 安装指南</span></a></h1>
<p>本文档将指导您完成 .NET 的安装过程。</p>
<h2 id="系统要求" tabindex="-1"><a class="header-anchor" href="#系统要求"><span>系统要求</span></a></h2>
<p>在安装 .NET 之前，请确保您的系统满足以下最低要求：</p>
<ul>
<li>支持的操作系统：Windows、macOS、Linux</li>
<li>处理器：1.8 GHz 或更快</li>
<li>内存：2 GB RAM（建议 4 GB RAM）</li>
<li>磁盘空间：1 GB 可用空间</li>
</ul>
<h2 id="windows-安装步骤" tabindex="-1"><a class="header-anchor" href="#windows-安装步骤"><span>Windows 安装步骤</span></a></h2>
<ol>
<li>访问 <a href="https://dotnet.microsoft.com/download" target="_blank" rel="noopener noreferrer">.NET 下载页面</a></li>
<li>下载 .NET SDK 安装程序</li>
<li>运行安装程序并按照提示操作</li>
<li>安装完成后，打开命令提示符并运行 <code v-pre>dotnet --version</code> 验证安装</li>
</ol>
<h2 id="macos-安装步骤" tabindex="-1"><a class="header-anchor" href="#macos-安装步骤"><span>macOS 安装步骤</span></a></h2>
<ol>
<li>访问 <a href="https://dotnet.microsoft.com/download" target="_blank" rel="noopener noreferrer">.NET 下载页面</a></li>
<li>下载 macOS 版本的 .NET SDK</li>
<li>运行安装程序并按照提示操作</li>
<li>安装完成后，打开终端并运行 <code v-pre>dotnet --version</code> 验证安装</li>
</ol>
<h2 id="linux-安装步骤" tabindex="-1"><a class="header-anchor" href="#linux-安装步骤"><span>Linux 安装步骤</span></a></h2>
<p>不同的 Linux 发行版有不同的安装方法，以下是 Ubuntu 的安装步骤：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token comment"># 添加 Microsoft 包签名密钥</span></span>
<span class="line"><span class="token function">wget</span> https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb <span class="token parameter variable">-O</span> packages-microsoft-prod.deb</span>
<span class="line"><span class="token function">sudo</span> dpkg <span class="token parameter variable">-i</span> packages-microsoft-prod.deb</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 安装 .NET SDK</span></span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> apt-transport-https</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> update</span>
<span class="line"><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> dotnet-sdk-6.0</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装完成后，运行 <code v-pre>dotnet --version</code> 验证安装。</p>
</div></template>


