<template><div><h1 id="net-core-中使用-mediator-中介者" tabindex="-1"><a class="header-anchor" href="#net-core-中使用-mediator-中介者"><span>.Net Core 中使用 mediator 中介者</span></a></h1>
<h2 id="mediator" tabindex="-1"><a class="header-anchor" href="#mediator"><span>mediator</span></a></h2>
<p>.NET中的简单中介者模式实现，一种进程内消息传递机制（无其他外部依赖）。
支持以同步或异步的形式进行请求/响应，命令，查询，通知和事件的消息传递，并通过C#泛型支持消息的智能调度。</p>
<h2 id="为什么要用mediator-解耦" tabindex="-1"><a class="header-anchor" href="#为什么要用mediator-解耦"><span>为什么要用mediator (解耦)</span></a></h2>
<p>MediatR 是 .NET 中的一种实现 中介者模式（Mediator Pattern） 的库。
它允许您将应用程序中的请求和响应解耦，使各个组件通过一个中介者进行通信，避免了直接依赖，从而使得代码更加松耦合，易于扩展和维护。</p>
<blockquote>
<p>参考<a href="https://www.cnblogs.com/wudequn/p/13063254.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/wudequn/p/13063254.html</a></p>
</blockquote>
<h2 id="_1-处理请求和返回基本用法" tabindex="-1"><a class="header-anchor" href="#_1-处理请求和返回基本用法"><span>1. 处理请求和返回基本用法</span></a></h2>
<p>MediatR 使用 请求/响应模式，即客户端通过请求发送数据，并由处理程序处理后返回响应。请求通常是实现 IRequest&lt;TResponse&gt; 接口的类，
TResponse 是请求的响应类型。处理程序需要实现 IRequestHandler&lt;TRequest, TResponse&gt; 接口来处理请求。</p>
<h3 id="定义请求" tabindex="-1"><a class="header-anchor" href="#定义请求"><span>定义请求</span></a></h3>
<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre v-pre><code><span class="line">    </span>
<span class="line">	<span class="token comment">// 定义Rquest 请求 继承 IRequest&amp;lt;T&amp;gt;   注意这里 T 为返回值 例如 </span></span>
<span class="line">	<span class="token comment">// return "11";</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyRequest</span> <span class="token punctuation">:</span> IRequest<span class="token operator">&amp;</span>lt<span class="token punctuation">;</span><span class="token keyword">string</span><span class="token operator">&amp;</span>gt<span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Name <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="定义handler" tabindex="-1"><a class="header-anchor" href="#定义handler"><span>定义handler</span></a></h3>
<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre v-pre><code><span class="line"><span class="token keyword">using</span> <span class="token namespace">MediatR</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">using</span> <span class="token namespace">System<span class="token punctuation">.</span>Threading<span class="token punctuation">.</span>Tasks</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// MyRequest 是我们上方定义的 请求体, 返回类型 string类型</span></span>
<span class="line"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyRequestHandler</span> <span class="token punctuation">:</span> IRequestHandler<span class="token operator">&amp;</span>lt<span class="token punctuation">;</span>MyRequest<span class="token punctuation">,</span> <span class="token keyword">string</span><span class="token operator">&amp;</span>gt<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> Task<span class="token operator">&amp;</span>lt<span class="token punctuation">;</span><span class="token keyword">string</span><span class="token operator">&amp;</span>gt<span class="token punctuation">;</span> <span class="token function">Handle</span><span class="token punctuation">(</span><span class="token class-name">MyRequest</span> request<span class="token punctuation">,</span> <span class="token class-name">CancellationToken</span> cancellationToken<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 在这里处理请求的业务逻辑</span></span>
<span class="line">        <span class="token keyword">return</span> Task<span class="token punctuation">.</span><span class="token function">FromResult</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"Hello, </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">request<span class="token punctuation">.</span>Name</span><span class="token punctuation">}</span></span><span class="token string">!"</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>MyRequestHandler 处理 MyRequest 请求，并返回一个字符串响应，格式为 &quot;Hello, !&quot;。</p>
</blockquote>
</div></template>


