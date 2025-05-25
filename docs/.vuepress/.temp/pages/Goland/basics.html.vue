<template><div><h1 id="golang-基础知识" tabindex="-1"><a class="header-anchor" href="#golang-基础知识"><span>Golang 基础知识</span></a></h1>
<p>本文档介绍 Golang 的基础概念和使用方法。</p>
<h2 id="go-语言特性" tabindex="-1"><a class="header-anchor" href="#go-语言特性"><span>Go 语言特性</span></a></h2>
<p>Go 语言是一种静态类型、编译型语言，具有以下特点：</p>
<ul>
<li>垃圾回收</li>
<li>内存安全</li>
<li>并发编程支持</li>
<li>快速编译</li>
<li>静态类型</li>
<li>简洁的语法</li>
</ul>
<h2 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world"><span>Hello World</span></a></h2>
<p>以下是 Go 语言中最基本的 Hello World 程序：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"fmt"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello, World!"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="变量和数据类型" tabindex="-1"><a class="header-anchor" href="#变量和数据类型"><span>变量和数据类型</span></a></h2>
<p>Go 语言支持多种数据类型：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// 变量声明</span></span>
<span class="line"><span class="token keyword">var</span> name <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"John"</span></span>
<span class="line"><span class="token keyword">var</span> age <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">30</span></span>
<span class="line"><span class="token keyword">var</span> isValid <span class="token builtin">bool</span> <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 简短变量声明</span></span>
<span class="line">shortName <span class="token operator">:=</span> <span class="token string">"John"</span></span>
<span class="line">shortAge <span class="token operator">:=</span> <span class="token number">30</span></span>
<span class="line">shortIsValid <span class="token operator">:=</span> <span class="token boolean">true</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 基本数据类型</span></span>
<span class="line"><span class="token comment">// 整数类型：int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64</span></span>
<span class="line"><span class="token comment">// 浮点类型：float32, float64</span></span>
<span class="line"><span class="token comment">// 复数类型：complex64, complex128</span></span>
<span class="line"><span class="token comment">// 布尔类型：bool</span></span>
<span class="line"><span class="token comment">// 字符串类型：string</span></span>
<span class="line"><span class="token comment">// 字符类型：rune (等同于 int32)</span></span>
<span class="line"><span class="token comment">// 字节类型：byte (等同于 uint8)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="控制流" tabindex="-1"><a class="header-anchor" href="#控制流"><span>控制流</span></a></h2>
<p>Go 语言提供了多种控制流语句：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// if-else 语句</span></span>
<span class="line"><span class="token keyword">if</span> condition <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> anotherCondition <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// for 循环</span></span>
<span class="line"><span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// while 风格的 for 循环</span></span>
<span class="line"><span class="token keyword">for</span> condition <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 无限循环</span></span>
<span class="line"><span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line">    <span class="token keyword">if</span> exitCondition <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">break</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// switch 语句</span></span>
<span class="line"><span class="token keyword">switch</span> expression <span class="token punctuation">{</span></span>
<span class="line"><span class="token keyword">case</span> value1<span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token keyword">case</span> value2<span class="token punctuation">,</span> value3<span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">    <span class="token comment">// 代码块</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="函数" tabindex="-1"><a class="header-anchor" href="#函数"><span>函数</span></a></h2>
<p>Go 语言中的函数定义和使用：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go"><pre v-pre><code><span class="line"><span class="token comment">// 基本函数</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> a <span class="token operator">+</span> b</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 多返回值</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">divAndMod</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> a <span class="token operator">/</span> b<span class="token punctuation">,</span> a <span class="token operator">%</span> b</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 命名返回值</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">divide</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">float64</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>result <span class="token builtin">float64</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> b <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">        err <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"cannot divide by zero"</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    result <span class="token operator">=</span> a <span class="token operator">/</span> b</span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


