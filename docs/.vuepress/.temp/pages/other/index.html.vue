<template><div><h1 id="🎯-demo-集合" tabindex="-1"><a class="header-anchor" href="#🎯-demo-集合"><span>🎯 demo 集合</span></a></h1>
<table>
<thead>
<tr>
<th>项目</th>
<th>描述</th>
<th>地址</th>
</tr>
</thead>
<tbody>
<tr>
<td>鱼鱼助手</td>
<td><RouteLink to="/docs/other/auto/">脚本助手</RouteLink></td>
<td>https://api-y.cn</td>
</tr>
<tr>
<td>云盘搜索</td>
<td>云盘搜索</td>
<td>https://yuyu.api-y.cn</td>
</tr>
</tbody>
</table>
<h2 id="🚀-云盘搜索" tabindex="-1"><a class="header-anchor" href="#🚀-云盘搜索"><span>🚀 云盘搜索</span></a></h2>
<ul>
<li>使用NET8、Mysql、Elasticsearch、Hangfire、redis、Mediator中介者、RabbitMQ(暂时取消)</li>
<li><a href="https://github.com/hu17889/go_spider" target="_blank" rel="noopener noreferrer">爬虫框架https://github.com/hu17889/go_spider</a></li>
</ul>
<h2 id="📋-项目概述" tabindex="-1"><a class="header-anchor" href="#📋-项目概述"><span>📋 项目概述</span></a></h2>
<blockquote>
<p>本项目是一个基于 Go 语言开发的云盘搜索系统，使用 go_spider 框架进行数据爬取，结合 .NET 8 后端服务进行数据处理和验证。系统支持断点续爬功能，确保数据爬取的连续性和完整性。通过浏览器插件实现自动化数据采集和配置管理。</p>
</blockquote>
<h2 id="🛠️-技术架构" tabindex="-1"><a class="header-anchor" href="#🛠️-技术架构"><span>🛠️ 技术架构</span></a></h2>
<ul>
<li>🕷️ 爬虫框架：go_spider (https://github.com/hu17889/go_spider)</li>
<li>⚡ 后端服务：.NET8、Mysql、Elasticsearch、Hangfire、redis、Mediator中介者、(RabbitMQ 一致性要求不高 取消掉了 暂时使用redis)</li>
<li>💾 数据存储：MySQL + Redis</li>
<li>🔧 开发语言：Go + C#</li>
<li>🌐 浏览器插件：Chrome Extension</li>
</ul>
<h2 id="🔄-系统流程" tabindex="-1"><a class="header-anchor" href="#🔄-系统流程"><span>🔄 系统流程</span></a></h2>
<h3 id="_1️⃣-浏览器插件功能" tabindex="-1"><a class="header-anchor" href="#_1️⃣-浏览器插件功能"><span>1️⃣ 浏览器插件功能</span></a></h3>
<ol>
<li>🔍 自动采集功能：
<ul>
<li>📝 自动收集当前页面的 URL （多种类型的bbs、例如discuz、wordpress、flarum、等 自动根据发送选择的类型到爬虫端 进行解析）</li>
<li>🔑 获取网站 Token</li>
<li>🍪 获取网站 Cookie</li>
<li>🌐 识别网站类型</li>
</ul>
</li>
<li>⚙️ 配置管理：
<ul>
<li>🔄 代理设置开关</li>
<li>🎯 爬取目标配置</li>
<li>⏰ 定时任务设置</li>
</ul>
</li>
<li>📡 数据开始：
<ul>
<li>🔄 实时同步到 Go 爬虫服务</li>
<li>📊 状态监控和反馈</li>
</ul>
</li>
</ol>
<h3 id="_2️⃣-数据爬取流程" tabindex="-1"><a class="header-anchor" href="#_2️⃣-数据爬取流程"><span>2️⃣ 数据爬取流程</span></a></h3>
<ol>
<li>🕷️ 使用 go_spider 框架爬取目标网站数据 (支持 cookie token 等验证)</li>
<li>📍 支持断点续爬功能：
<ul>
<li>📝 记录上次爬取位置</li>
<li>💾 保存爬取进度</li>
<li>🔄 支持任务中断恢复</li>
</ul>
</li>
<li>🔍 提取关键信息：数据ID、URL、文章标题</li>
<li>🔐 生成唯一标识 HashID</li>
<li>🧹 数据清洗和格式化</li>
</ol>
<h3 id="_3️⃣-数据存储流程" tabindex="-1"><a class="header-anchor" href="#_3️⃣-数据存储流程"><span>3️⃣ 数据存储流程</span></a></h3>
<ol>
<li>🔍 根据 HashID 判断数据是新增还是更新</li>
<li>💾 批量写入 MySQL 数据库</li>
<li>🔄 将数据写入 Redis 队列</li>
<li>📡 发送 redis Publish  Subscribe 通知到 .NET 8 后端服务 去执行任务</li>
</ol>
<h3 id="_4️⃣-数据验证流程" tabindex="-1"><a class="header-anchor" href="#_4️⃣-数据验证流程"><span>4️⃣ 数据验证流程</span></a></h3>
<ol>
<li>🔄 .NET 8 后端服务消费 Redis 队列数据</li>
<li>✅ 根据数据类型进行 URL 有效性验证</li>
<li>📊 更新数据状态（有效/无效）</li>
<li>⏰ 定时任务验证 URL 有效性 定时分批同步到Elasticsearch 中</li>
</ol>
<h3 id="_5️-搜索限制" tabindex="-1"><a class="header-anchor" href="#_5️-搜索限制"><span>5️ 搜索限制</span></a></h3>
<ol>
<li>使用中间件对中间件对用户进行</li>
</ol>
<!-- ![es查询接口](/docs/other/yupan/image.png) -->
<h2 id="📊-流程图" tabindex="-1"><a class="header-anchor" href="#📊-流程图"><span>📊 流程图</span></a></h2>
<p><img src="@source/other/mermaid-2.png" alt="alt text"></p>
<div class="language-mermaid line-numbers-mode" data-highlighter="prismjs" data-ext="mermaid"><pre v-pre><code><span class="line"><span class="token keyword">graph</span> LR</span>
<span class="line">    A<span class="token text string">[🌐 浏览器插件]</span> <span class="token arrow operator">--></span> B<span class="token text string">[📡 发送配置数据]</span></span>
<span class="line">    B <span class="token arrow operator">--></span> C<span class="token text string">[⏰ Cron定时任务]</span></span>
<span class="line">    C <span class="token arrow operator">--></span> D<span class="token text string">[🚀 开始爬取]</span></span>
<span class="line">    D <span class="token arrow operator">--></span> E<span class="token text string">[📝 检查断点记录]</span></span>
<span class="line">    E <span class="token arrow operator">--></span> F<span class="token text string">{❓ 是否存在断点}</span></span>
<span class="line">    F <span class="token arrow operator">--></span><span class="token label property">|✅ 是|</span> G<span class="token text string">[🔄 从断点继续爬取]</span></span>
<span class="line">    F <span class="token arrow operator">--></span><span class="token label property">|❌ 否|</span> H<span class="token text string">[🕷️ go_spider爬虫]</span></span>
<span class="line">    G <span class="token arrow operator">--></span> I<span class="token text string">[🔍 数据提取]</span></span>
<span class="line">    H <span class="token arrow operator">--></span> I</span>
<span class="line">    I <span class="token arrow operator">--></span> J<span class="token text string">[🔐 生成HashID]</span></span>
<span class="line">    J <span class="token arrow operator">--></span> K<span class="token text string">{📊 数据判断}</span></span>
<span class="line">    K <span class="token arrow operator">--></span><span class="token label property">|➕ 新增|</span> L<span class="token text string">[💾 MySQL写入]</span></span>
<span class="line">    K <span class="token arrow operator">--></span><span class="token label property">|🔄 更新|</span> M<span class="token text string">[📝 MySQL更新]</span></span>
<span class="line">    L <span class="token arrow operator">--></span> N<span class="token text string">[🔄 Redis写入]</span></span>
<span class="line">    M <span class="token arrow operator">--></span> N</span>
<span class="line">    N <span class="token arrow operator">--></span> O<span class="token text string">[📡 通知.NET服务]</span></span>
<span class="line">    O <span class="token arrow operator">--></span> P<span class="token text string">[🔄 消费Redis数据]</span></span>
<span class="line">    P <span class="token arrow operator">--></span> Q<span class="token text string">[✅ URL验证]</span></span>
<span class="line">    Q <span class="token arrow operator">--></span> R<span class="token text string">{🔍 URL是否有效}</span></span>
<span class="line">    R <span class="token arrow operator">--></span><span class="token label property">|✅ 有效|</span> S<span class="token text string">[📊 更新状态]</span></span>
<span class="line">    R <span class="token arrow operator">--></span><span class="token label property">|❌ 无效|</span> T<span class="token text string">[❌ 标记无效]</span></span>
<span class="line">    S <span class="token arrow operator">--></span> U<span class="token text string">[⏰ 定时验证]</span></span>
<span class="line">    T <span class="token arrow operator">--></span> U</span>
<span class="line">    U <span class="token arrow operator">--></span> V<span class="token text string">{⏰ 是否到达验证时间}</span></span>
<span class="line">    V <span class="token arrow operator">--></span><span class="token label property">|✅ 是|</span> Q</span>
<span class="line">    V <span class="token arrow operator">--></span><span class="token label property">|❌ 否|</span> W<span class="token text string">[⏳ 等待下次验证]</span></span>
<span class="line">    W <span class="token arrow operator">--></span> V</span>
<span class="line">    I <span class="token arrow operator">--></span> X<span class="token text string">[💾 保存断点记录]</span></span>
<span class="line">    X <span class="token arrow operator">--></span> Y<span class="token text string">[⏰ 定时保存进度]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🔑-关键功能说明" tabindex="-1"><a class="header-anchor" href="#🔑-关键功能说明"><span>🔑 关键功能说明</span></a></h2>
<h3 id="_1️⃣-浏览器插件功能-1" tabindex="-1"><a class="header-anchor" href="#_1️⃣-浏览器插件功能-1"><span>1️⃣ 浏览器插件功能</span></a></h3>
<ul>
<li>🌐 自动采集网站数据</li>
<li>🔑 管理认证信息</li>
<li>⚙️ 配置爬取参数</li>
<li>📡 实时数据同步</li>
</ul>
<h3 id="_2️⃣-定时任务" tabindex="-1"><a class="header-anchor" href="#_2️⃣-定时任务"><span>2️⃣ 定时任务</span></a></h3>
<ul>
<li>⏰ 使用 Cron 表达式配置爬虫执行时间</li>
<li>🔄 支持灵活的任务调度策略</li>
<li>📅 可配置多个时间点执行</li>
</ul>
<h3 id="_3️⃣-断点续爬功能" tabindex="-1"><a class="header-anchor" href="#_3️⃣-断点续爬功能"><span>3️⃣ 断点续爬功能</span></a></h3>
<ul>
<li>🔄 支持任务中断恢复</li>
<li>📝 记录爬取进度和位置</li>
<li>💾 定时保存断点信息</li>
<li>⚡ 支持多任务并行爬取</li>
<li>🔒 确保数据爬取的连续性</li>
</ul>
<h3 id="_4️⃣-hashid-生成" tabindex="-1"><a class="header-anchor" href="#_4️⃣-hashid-生成"><span>4️⃣ HashID 生成</span></a></h3>
<ul>
<li>🔐 基于数据ID、URL、文章标题生成唯一标识</li>
<li>🔑 使用加密算法生成短字符串</li>
<li>📊 用于判断数据是新增还是更新</li>
<li>🔒 保证数据的唯一性和可追踪性</li>
</ul>
<h3 id="_5️⃣-数据存储" tabindex="-1"><a class="header-anchor" href="#_5️⃣-数据存储"><span>5️⃣ 数据存储</span></a></h3>
<ul>
<li>💾 MySQL：存储完整数据</li>
<li>🔄 Redis：存储待处理数据队列</li>
</ul>
<h3 id="_6️⃣-url-验证" tabindex="-1"><a class="header-anchor" href="#_6️⃣-url-验证"><span>6️⃣ URL 验证</span></a></h3>
<ul>
<li>✅ 实时验证：数据入库时进行验证</li>
<li>⏰ 定时验证：每天定时检查 URL 有效性</li>
</ul>
<h2 id="🚀-部署要求" tabindex="-1"><a class="header-anchor" href="#🚀-部署要求"><span>🚀 部署要求</span></a></h2>
<ol>
<li>🔧 Go 环境配置</li>
<li>⚡ .NET 8 运行环境</li>
<li>💾 MySQL 数据库</li>
<li>🔄 Redis 服务</li>
<li>🌐 Chrome 浏览器</li>
</ol>
</div></template>


