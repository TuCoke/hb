<template><div><h1 id="net-基础知识" tabindex="-1"><a class="header-anchor" href="#net-基础知识"><span>.NET 基础知识</span></a></h1>
<p>本文档介绍 .NET 的基础概念和使用方法。</p>
<h2 id="net-框架组成" tabindex="-1"><a class="header-anchor" href="#net-框架组成"><span>.NET 框架组成</span></a></h2>
<p>.NET 框架由以下主要组件组成：</p>
<ul>
<li><strong>CLR（公共语言运行时）</strong>：执行托管代码的运行时环境</li>
<li><strong>FCL（框架类库）</strong>：提供标准化的 API 集合</li>
<li><strong>开发工具</strong>：包括编译器、调试器等</li>
</ul>
<h2 id="c-语言基础" tabindex="-1"><a class="header-anchor" href="#c-语言基础"><span>C# 语言基础</span></a></h2>
<p>C# 是 .NET 平台上最常用的编程语言之一。以下是 C# 的一些基本语法：</p>
<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre v-pre><code><span class="line"><span class="token comment">// 基本 Hello World 程序</span></span>
<span class="line"><span class="token keyword">using</span> <span class="token namespace">System</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">namespace</span> <span class="token namespace">HelloWorldApp</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">class</span> <span class="token class-name">Program</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">static</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> args<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="常用数据类型" tabindex="-1"><a class="header-anchor" href="#常用数据类型"><span>常用数据类型</span></a></h2>
<p>C# 支持多种数据类型：</p>
<table>
<thead>
<tr>
<th>类型</th>
<th>范围</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>int</td>
<td>-2,147,483,648 到 2,147,483,647</td>
<td>整数</td>
</tr>
<tr>
<td>long</td>
<td>-9,223,372,036,854,775,808 到 9,223,372,036,854,775,807</td>
<td>长整数</td>
</tr>
<tr>
<td>float</td>
<td>±1.5 × 10^−45 到 ±3.4 × 10^38</td>
<td>单精度浮点数</td>
</tr>
<tr>
<td>double</td>
<td>±5.0 × 10^−324 到 ±1.7 × 10^308</td>
<td>双精度浮点数</td>
</tr>
<tr>
<td>string</td>
<td>不适用</td>
<td>字符串</td>
</tr>
<tr>
<td>bool</td>
<td>true 或 false</td>
<td>布尔值</td>
</tr>
</tbody>
</table>
<h2 id="控制流语句" tabindex="-1"><a class="header-anchor" href="#控制流语句"><span>控制流语句</span></a></h2>
<p>C# 提供多种控制流语句：</p>
<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre v-pre><code><span class="line"><span class="token comment">// if-else 语句</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">else</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// for 循环</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// while 循环</span></span>
<span class="line"><span class="token keyword">while</span> <span class="token punctuation">(</span>condition<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// switch 语句</span></span>
<span class="line"><span class="token keyword">switch</span> <span class="token punctuation">(</span>expression<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">case</span> value1<span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment">// 代码块</span></span>
<span class="line">        <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">case</span> value2<span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment">// 代码块</span></span>
<span class="line">        <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">        <span class="token comment">// 默认代码块</span></span>
<span class="line">        <span class="token keyword">break</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


