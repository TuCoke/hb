<template><div><h1 id="net-webapi-示例" tabindex="-1"><a class="header-anchor" href="#net-webapi-示例"><span>.NET WebAPI 示例</span></a></h1>
<p>本文档将介绍如何使用 .NET 创建一个基本的 WebAPI 应用程序。</p>
<h2 id="创建-webapi-项目" tabindex="-1"><a class="header-anchor" href="#创建-webapi-项目"><span>创建 WebAPI 项目</span></a></h2>
<p>使用以下命令创建一个新的 WebAPI 项目：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">dotnet new webapi <span class="token parameter variable">-n</span> MyFirstWebApi</span>
<span class="line"><span class="token builtin class-name">cd</span> MyFirstWebApi</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构"><span>项目结构</span></a></h2>
<p>创建项目后，您将看到以下主要文件和目录：</p>
<ul>
<li><code v-pre>Program.cs</code> - 应用程序入口点和配置</li>
<li><code v-pre>Controllers/</code> - 包含API控制器</li>
<li><code v-pre>Properties/launchSettings.json</code> - 应用程序启动配置</li>
<li><code v-pre>appsettings.json</code> - 应用程序配置文件</li>
<li><code v-pre>MyFirstWebApi.csproj</code> - 项目文件</li>
</ul>
<h2 id="创建模型" tabindex="-1"><a class="header-anchor" href="#创建模型"><span>创建模型</span></a></h2>
<p>首先，让我们创建一个简单的模型类。在项目根目录下创建一个 <code v-pre>Models</code> 文件夹，并添加一个 <code v-pre>TodoItem.cs</code> 文件：</p>
<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre v-pre><code><span class="line"><span class="token keyword">namespace</span> <span class="token namespace">MyFirstWebApi<span class="token punctuation">.</span>Models</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItem</span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> Id <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">string</span><span class="token punctuation">?</span></span> Title <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> IsComplete <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建数据上下文" tabindex="-1"><a class="header-anchor" href="#创建数据上下文"><span>创建数据上下文</span></a></h2>
<p>接下来，添加一个简单的数据上下文类来模拟数据库。创建一个 <code v-pre>Data</code> 文件夹，并添加 <code v-pre>AppDbContext.cs</code> 文件：</p>
<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre v-pre><code><span class="line"><span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>EntityFrameworkCore</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">using</span> <span class="token namespace">MyFirstWebApi<span class="token punctuation">.</span>Models</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">namespace</span> <span class="token namespace">MyFirstWebApi<span class="token punctuation">.</span>Data</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AppDbContext</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">DbContext</span></span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token function">AppDbContext</span><span class="token punctuation">(</span><span class="token class-name">DbContextOptions<span class="token punctuation">&lt;</span>AppDbContext<span class="token punctuation">></span></span> options<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">:</span> <span class="token keyword">base</span><span class="token punctuation">(</span>options<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">public</span> <span class="token return-type class-name">DbSet<span class="token punctuation">&lt;</span>TodoItem<span class="token punctuation">></span></span> TodoItems <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token operator">!</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置服务" tabindex="-1"><a class="header-anchor" href="#配置服务"><span>配置服务</span></a></h2>
<p>在 <code v-pre>Program.cs</code> 文件中，添加 Entity Framework 服务和数据库配置：</p>
<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre v-pre><code><span class="line"><span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>EntityFrameworkCore</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">using</span> <span class="token namespace">MyFirstWebApi<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name"><span class="token keyword">var</span></span> builder <span class="token operator">=</span> WebApplication<span class="token punctuation">.</span><span class="token function">CreateBuilder</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 添加控制器服务</span></span>
<span class="line">builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddControllers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 添加 Swagger/OpenAPI 支持</span></span>
<span class="line">builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddEndpointsApiExplorer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token function">AddSwaggerGen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 添加数据库上下文</span></span>
<span class="line">builder<span class="token punctuation">.</span>Services<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">AddDbContext</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>AppDbContext<span class="token punctuation">></span></span></span><span class="token punctuation">(</span>options <span class="token operator">=></span></span>
<span class="line">    options<span class="token punctuation">.</span><span class="token function">UseInMemoryDatabase</span><span class="token punctuation">(</span><span class="token string">"TodoList"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name"><span class="token keyword">var</span></span> app <span class="token operator">=</span> builder<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 配置 HTTP 请求管道</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>app<span class="token punctuation">.</span>Environment<span class="token punctuation">.</span><span class="token function">IsDevelopment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    app<span class="token punctuation">.</span><span class="token function">UseSwagger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    app<span class="token punctuation">.</span><span class="token function">UseSwaggerUI</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">app<span class="token punctuation">.</span><span class="token function">UseHttpsRedirection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">app<span class="token punctuation">.</span><span class="token function">UseAuthorization</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">app<span class="token punctuation">.</span><span class="token function">MapControllers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">app<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建控制器" tabindex="-1"><a class="header-anchor" href="#创建控制器"><span>创建控制器</span></a></h2>
<p>在 <code v-pre>Controllers</code> 文件夹中，创建 <code v-pre>TodoItemsController.cs</code> 文件：</p>
<div class="language-csharp line-numbers-mode" data-highlighter="prismjs" data-ext="cs"><pre v-pre><code><span class="line"><span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>AspNetCore<span class="token punctuation">.</span>Mvc</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">using</span> <span class="token namespace">Microsoft<span class="token punctuation">.</span>EntityFrameworkCore</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">using</span> <span class="token namespace">MyFirstWebApi<span class="token punctuation">.</span>Data</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">using</span> <span class="token namespace">MyFirstWebApi<span class="token punctuation">.</span>Models</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">namespace</span> <span class="token namespace">MyFirstWebApi<span class="token punctuation">.</span>Controllers</span></span>
<span class="line"><span class="token punctuation">{</span></span>
<span class="line">    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">Route</span><span class="token attribute-arguments"><span class="token punctuation">(</span><span class="token string">"api/[controller]"</span><span class="token punctuation">)</span></span></span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token punctuation">[</span><span class="token attribute"><span class="token class-name">ApiController</span></span><span class="token punctuation">]</span></span>
<span class="line">    <span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TodoItemsController</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ControllerBase</span></span></span>
<span class="line">    <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">AppDbContext</span> _context<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">public</span> <span class="token function">TodoItemsController</span><span class="token punctuation">(</span><span class="token class-name">AppDbContext</span> context<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            _context <span class="token operator">=</span> context<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// GET: api/TodoItems</span></span>
<span class="line">        <span class="token punctuation">[</span>HttpGet<span class="token punctuation">]</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>ActionResult<span class="token punctuation">&lt;</span>IEnumerable<span class="token punctuation">&lt;</span>TodoItem<span class="token punctuation">></span><span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">GetTodoItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">await</span> _context<span class="token punctuation">.</span>TodoItems<span class="token punctuation">.</span><span class="token function">ToListAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// GET: api/TodoItems/5</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token function">HttpGet</span><span class="token punctuation">(</span><span class="token string">"{id}"</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>ActionResult<span class="token punctuation">&lt;</span>TodoItem<span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">GetTodoItem</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name"><span class="token keyword">var</span></span> todoItem <span class="token operator">=</span> <span class="token keyword">await</span> _context<span class="token punctuation">.</span>TodoItems<span class="token punctuation">.</span><span class="token function">FindAsync</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>todoItem <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span> <span class="token function">NotFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            <span class="token keyword">return</span> todoItem<span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// POST: api/TodoItems</span></span>
<span class="line">        <span class="token punctuation">[</span>HttpPost<span class="token punctuation">]</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>ActionResult<span class="token punctuation">&lt;</span>TodoItem<span class="token punctuation">></span><span class="token punctuation">></span></span> <span class="token function">PostTodoItem</span><span class="token punctuation">(</span><span class="token class-name">TodoItem</span> todoItem<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            _context<span class="token punctuation">.</span>TodoItems<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>todoItem<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">await</span> _context<span class="token punctuation">.</span><span class="token function">SaveChangesAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token keyword">return</span> <span class="token function">CreatedAtAction</span><span class="token punctuation">(</span><span class="token keyword">nameof</span><span class="token punctuation">(</span>GetTodoItem<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> id <span class="token operator">=</span> todoItem<span class="token punctuation">.</span>Id <span class="token punctuation">}</span><span class="token punctuation">,</span> todoItem<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// PUT: api/TodoItems/5</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token function">HttpPut</span><span class="token punctuation">(</span><span class="token string">"{id}"</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>IActionResult<span class="token punctuation">></span></span> <span class="token function">PutTodoItem</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">,</span> <span class="token class-name">TodoItem</span> todoItem<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">!=</span> todoItem<span class="token punctuation">.</span>Id<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span> <span class="token function">BadRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            _context<span class="token punctuation">.</span><span class="token function">Entry</span><span class="token punctuation">(</span>todoItem<span class="token punctuation">)</span><span class="token punctuation">.</span>State <span class="token operator">=</span> EntityState<span class="token punctuation">.</span>Modified<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token keyword">try</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">await</span> _context<span class="token punctuation">.</span><span class="token function">SaveChangesAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">DbUpdateConcurrencyException</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">TodoItemExists</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token keyword">return</span> <span class="token function">NotFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">                <span class="token keyword">else</span></span>
<span class="line">                <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token keyword">throw</span><span class="token punctuation">;</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            <span class="token keyword">return</span> <span class="token function">NoContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// DELETE: api/TodoItems/5</span></span>
<span class="line">        <span class="token punctuation">[</span><span class="token function">HttpDelete</span><span class="token punctuation">(</span><span class="token string">"{id}"</span><span class="token punctuation">)</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token keyword">public</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>IActionResult<span class="token punctuation">></span></span> <span class="token function">DeleteTodoItem</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token class-name"><span class="token keyword">var</span></span> todoItem <span class="token operator">=</span> <span class="token keyword">await</span> _context<span class="token punctuation">.</span>TodoItems<span class="token punctuation">.</span><span class="token function">FindAsync</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span>todoItem <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">{</span></span>
<span class="line">                <span class="token keyword">return</span> <span class="token function">NotFound</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">            _context<span class="token punctuation">.</span>TodoItems<span class="token punctuation">.</span><span class="token function">Remove</span><span class="token punctuation">(</span>todoItem<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token keyword">await</span> _context<span class="token punctuation">.</span><span class="token function">SaveChangesAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">            <span class="token keyword">return</span> <span class="token function">NoContent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">bool</span></span> <span class="token function">TodoItemExists</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> id<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> _context<span class="token punctuation">.</span>TodoItems<span class="token punctuation">.</span><span class="token function">Any</span><span class="token punctuation">(</span>e <span class="token operator">=></span> e<span class="token punctuation">.</span>Id <span class="token operator">==</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装必要的包" tabindex="-1"><a class="header-anchor" href="#安装必要的包"><span>安装必要的包</span></a></h2>
<p>运行以下命令安装所需的 NuGet 包：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">dotnet <span class="token function">add</span> package Microsoft.EntityFrameworkCore.InMemory</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="运行应用程序" tabindex="-1"><a class="header-anchor" href="#运行应用程序"><span>运行应用程序</span></a></h2>
<p>现在可以运行 WebAPI 应用程序：</p>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line">dotnet run</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>默认情况下，应用程序将在 <code v-pre>https://localhost:7xxx</code> 和 <code v-pre>http://localhost:5xxx</code> 上运行（端口号可能会有所不同）。</p>
<h2 id="使用-swagger-测试-api" tabindex="-1"><a class="header-anchor" href="#使用-swagger-测试-api"><span>使用 Swagger 测试 API</span></a></h2>
<p>通过浏览器访问 <code v-pre>https://localhost:7xxx/swagger</code> 来打开 Swagger UI 界面，您可以在其中测试 API 的所有端点。</p>
<h2 id="api-测试示例" tabindex="-1"><a class="header-anchor" href="#api-测试示例"><span>API 测试示例</span></a></h2>
<p>以下是使用 curl 测试 API 的一些示例：</p>
<h3 id="创建一个新的待办事项" tabindex="-1"><a class="header-anchor" href="#创建一个新的待办事项"><span>创建一个新的待办事项</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token parameter variable">-d</span> <span class="token string">"{<span class="token entity" title="\&quot;">\"</span>title<span class="token entity" title="\&quot;">\"</span>:<span class="token entity" title="\&quot;">\"</span>完成 WebAPI 教程<span class="token entity" title="\&quot;">\"</span>,<span class="token entity" title="\&quot;">\"</span>isComplete<span class="token entity" title="\&quot;">\"</span>:false}"</span> https://localhost:7xxx/api/TodoItems</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="获取所有待办事项" tabindex="-1"><a class="header-anchor" href="#获取所有待办事项"><span>获取所有待办事项</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET https://localhost:7xxx/api/TodoItems</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="获取特定待办事项" tabindex="-1"><a class="header-anchor" href="#获取特定待办事项"><span>获取特定待办事项</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET https://localhost:7xxx/api/TodoItems/1</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="更新待办事项" tabindex="-1"><a class="header-anchor" href="#更新待办事项"><span>更新待办事项</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> PUT <span class="token parameter variable">-H</span> <span class="token string">"Content-Type: application/json"</span> <span class="token parameter variable">-d</span> <span class="token string">"{<span class="token entity" title="\&quot;">\"</span>id<span class="token entity" title="\&quot;">\"</span>:1,<span class="token entity" title="\&quot;">\"</span>title<span class="token entity" title="\&quot;">\"</span>:<span class="token entity" title="\&quot;">\"</span>完成 WebAPI 教程<span class="token entity" title="\&quot;">\"</span>,<span class="token entity" title="\&quot;">\"</span>isComplete<span class="token entity" title="\&quot;">\"</span>:true}"</span> https://localhost:7xxx/api/TodoItems/1</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="删除待办事项" tabindex="-1"><a class="header-anchor" href="#删除待办事项"><span>删除待办事项</span></a></h3>
<div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre v-pre><code><span class="line"><span class="token function">curl</span> <span class="token parameter variable">-X</span> DELETE https://localhost:7xxx/api/TodoItems/1</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<p>在本示例中，我们创建了一个完整的 .NET WebAPI 应用程序，实现了以下功能：</p>
<ol>
<li>创建基本的 WebAPI 项目结构</li>
<li>定义数据模型</li>
<li>配置 Entity Framework 和内存数据库</li>
<li>实现 CRUD 操作的 API 控制器</li>
<li>使用 Swagger 进行 API 文档和测试</li>
</ol>
<p>这个示例展示了如何使用 .NET 快速创建功能齐全的 RESTful API。</p>
</div></template>


