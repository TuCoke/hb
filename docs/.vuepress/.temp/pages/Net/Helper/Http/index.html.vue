<template><div><h2 id="入参-和-出参" tabindex="-1"><a class="header-anchor" href="#入参-和-出参"><span>入参 和 出参</span></a></h2>
<div class="language-C# line-numbers-mode" data-highlighter="prismjs" data-ext="C#"><pre v-pre><code><span class="line">using Microsoft.Extensions.Logging;</span>
<span class="line">using Newtonsoft.Json;</span>
<span class="line">using Polly;</span>
<span class="line">using Polly.Retry;</span>
<span class="line">using System;</span>
<span class="line">using System.Collections.Generic;</span>
<span class="line">using System.Net;</span>
<span class="line">using System.Net.Http;</span>
<span class="line">using System.Text;</span>
<span class="line">using System.Threading;</span>
<span class="line">using System.Threading.Tasks;</span>
<span class="line"></span>
<span class="line">namespace DA.FileCloudSync.Core.Utilities.ObjRequest</span>
<span class="line">{</span>
<span class="line">    /// &lt;summary&gt;</span>
<span class="line">    /// 增强版HTTP请求客户端</span>
<span class="line">    /// &lt;/summary&gt;</span>
<span class="line">    public class ObjRequest2</span>
<span class="line">    {</span>
<span class="line">        private readonly ILogger&lt;ObjRequest2&gt; _logger;</span>
<span class="line">        private readonly HttpClient _httpClient;</span>
<span class="line">        private readonly RetryPolicy&lt;HttpResponseMessage&gt; _retryPolicy;</span>
<span class="line">        private readonly int _defaultTimeoutSeconds;</span>
<span class="line">        private readonly Dictionary&lt;string, string&gt; _defaultHeaders;</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 单例访问器</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        public static ObjRequest2 Build(ILogger&lt;ObjRequest2&gt; logger = null)</span>
<span class="line">        {</span>
<span class="line">            return new ObjRequest2(logger);</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 构造函数</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;param name=&quot;logger&quot;&gt;日志记录器&lt;/param&gt;</span>
<span class="line">        /// &lt;param name=&quot;defaultTimeoutSeconds&quot;&gt;默认超时时间(秒)&lt;/param&gt;</span>
<span class="line">        /// &lt;param name=&quot;maxRetryAttempts&quot;&gt;最大重试次数&lt;/param&gt;</span>
<span class="line">        public ObjRequest2(ILogger&lt;ObjRequest2&gt; logger = null, int defaultTimeoutSeconds = 30, int maxRetryAttempts = 3)</span>
<span class="line">        {</span>
<span class="line">            _logger = logger;</span>
<span class="line">            _defaultTimeoutSeconds = defaultTimeoutSeconds;</span>
<span class="line">            _httpClient = new HttpClient();</span>
<span class="line">            _defaultHeaders = new Dictionary&lt;string, string&gt;();</span>
<span class="line">            </span>
<span class="line">            // 配置重试策略</span>
<span class="line">            _retryPolicy = Policy</span>
<span class="line">                .HandleResult&lt;HttpResponseMessage&gt;(r =&gt; !r.IsSuccessStatusCode &amp;&amp; </span>
<span class="line">                    r.StatusCode != HttpStatusCode.BadRequest &amp;&amp; </span>
<span class="line">                    r.StatusCode != HttpStatusCode.Unauthorized &amp;&amp; </span>
<span class="line">                    r.StatusCode != HttpStatusCode.Forbidden)</span>
<span class="line">                .WaitAndRetryAsync(</span>
<span class="line">                    maxRetryAttempts,</span>
<span class="line">                    retryAttempt =&gt; TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),</span>
<span class="line">                    onRetry: (outcome, timespan, retryAttempt, context) =&gt;</span>
<span class="line">                    {</span>
<span class="line">                        _logger?.LogWarning(</span>
<span class="line">                            &quot;正在重试请求 (尝试 {RetryAttempt}/{MaxRetries}). &quot; +</span>
<span class="line">                            &quot;上次请求状态: {StatusCode}, URL: {Url}&quot;,</span>
<span class="line">                            retryAttempt, maxRetryAttempts, outcome.Result.StatusCode, </span>
<span class="line">                            outcome.Result.RequestMessage?.RequestUri);</span>
<span class="line">                    });</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 添加默认请求头</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        public ObjRequest2 AddDefaultHeader(string key, string value)</span>
<span class="line">        {</span>
<span class="line">            _defaultHeaders[key] = value;</span>
<span class="line">            return this;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 设置授权Token</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        public ObjRequest2 WithBearerToken(string token)</span>
<span class="line">        {</span>
<span class="line">            if (!string.IsNullOrEmpty(token))</span>
<span class="line">            {</span>
<span class="line">                AddDefaultHeader(&quot;Authorization&quot;, $&quot;Bearer {token}&quot;);</span>
<span class="line">            }</span>
<span class="line">            return this;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 发送请求并获取指定类型的响应</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        /// &lt;typeparam name=&quot;TResponse&quot;&gt;响应类型&lt;/typeparam&gt;</span>
<span class="line">        /// &lt;typeparam name=&quot;TRequest&quot;&gt;请求类型&lt;/typeparam&gt;</span>
<span class="line">        /// &lt;param name=&quot;url&quot;&gt;请求URL&lt;/param&gt;</span>
<span class="line">        /// &lt;param name=&quot;method&quot;&gt;HTTP方法&lt;/param&gt;</span>
<span class="line">        /// &lt;param name=&quot;request&quot;&gt;请求对象&lt;/param&gt;</span>
<span class="line">        /// &lt;param name=&quot;timeoutSeconds&quot;&gt;超时时间(秒)&lt;/param&gt;</span>
<span class="line">        /// &lt;param name=&quot;mediaType&quot;&gt;媒体类型&lt;/param&gt;</span>
<span class="line">        /// &lt;param name=&quot;cancellationToken&quot;&gt;取消令牌&lt;/param&gt;</span>
<span class="line">        /// &lt;returns&gt;响应对象或异常结果&lt;/returns&gt;</span>
<span class="line">        public async Task&lt;ApiResult&lt;TResponse&gt;&gt; SendRequestAsync&lt;TResponse, TRequest&gt;(</span>
<span class="line">            string url,</span>
<span class="line">            HttpMethod method,</span>
<span class="line">            TRequest request = default,</span>
<span class="line">            int? timeoutSeconds = null,</span>
<span class="line">            string mediaType = &quot;application/json&quot;,</span>
<span class="line">            CancellationToken cancellationToken = default)</span>
<span class="line">        {</span>
<span class="line">            _logger?.LogDebug(&quot;开始请求 {Method} {Url}&quot;, method, url);</span>
<span class="line">            var startTime = DateTime.Now;</span>
<span class="line">            var result = new ApiResult&lt;TResponse&gt;();</span>
<span class="line"></span>
<span class="line">            try</span>
<span class="line">            {</span>
<span class="line">                using (var requestMessage = new HttpRequestMessage(method, url))</span>
<span class="line">                {</span>
<span class="line">                    // 设置请求超时</span>
<span class="line">                    var timeoutTokenSource = new CancellationTokenSource();</span>
<span class="line">                    timeoutTokenSource.CancelAfter(TimeSpan.FromSeconds(timeoutSeconds ?? _defaultTimeoutSeconds));</span>
<span class="line">                    </span>
<span class="line">                    // 合并取消令牌</span>
<span class="line">                    using (var linkedTokenSource = CancellationTokenSource.CreateLinkedTokenSource(</span>
<span class="line">                        cancellationToken, timeoutTokenSource.Token))</span>
<span class="line">                    {</span>
<span class="line">                        // 添加默认请求头</span>
<span class="line">                        foreach (var header in _defaultHeaders)</span>
<span class="line">                        {</span>
<span class="line">                            requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value);</span>
<span class="line">                        }</span>
<span class="line"></span>
<span class="line">                        // 添加请求体</span>
<span class="line">                        if ((method == HttpMethod.Post || method == HttpMethod.Put || method == HttpMethod.Patch) &amp;&amp; </span>
<span class="line">                            request != null)</span>
<span class="line">                        {</span>
<span class="line">                            string jsonContent = JsonConvert.SerializeObject(request);</span>
<span class="line">                            requestMessage.Content = new StringContent(jsonContent, Encoding.UTF8, mediaType);</span>
<span class="line">                            _logger?.LogTrace(&quot;请求内容: {Content}&quot;, jsonContent);</span>
<span class="line">                        }</span>
<span class="line"></span>
<span class="line">                        // 应用重试策略</span>
<span class="line">                        var response = await _retryPolicy.ExecuteAsync(async () =&gt;</span>
<span class="line">                        {</span>
<span class="line">                            return await _httpClient.SendAsync(</span>
<span class="line">                                requestMessage, </span>
<span class="line">                                HttpCompletionOption.ResponseHeadersRead, </span>
<span class="line">                                linkedTokenSource.Token);</span>
<span class="line">                        });</span>
<span class="line"></span>
<span class="line">                        // 处理响应</span>
<span class="line">                        result.StatusCode = (int)response.StatusCode;</span>
<span class="line">                        string responseContent = await response.Content.ReadAsStringAsync();</span>
<span class="line">                        </span>
<span class="line">                        if (response.IsSuccessStatusCode)</span>
<span class="line">                        {</span>
<span class="line">                            if (!string.IsNullOrEmpty(responseContent))</span>
<span class="line">                            {</span>
<span class="line">                                try</span>
<span class="line">                                {</span>
<span class="line">                                    result.Data = JsonConvert.DeserializeObject&lt;TResponse&gt;(responseContent);</span>
<span class="line">                                }</span>
<span class="line">                                catch (JsonException ex)</span>
<span class="line">                                {</span>
<span class="line">                                    _logger?.LogError(ex, &quot;响应反序列化失败: {Error}&quot;, ex.Message);</span>
<span class="line">                                    result.ErrorMessage = $&quot;响应反序列化失败: {ex.Message}&quot;;</span>
<span class="line">                                    result.HasError = true;</span>
<span class="line">                                }</span>
<span class="line">                            }</span>
<span class="line">                        }</span>
<span class="line">                        else</span>
<span class="line">                        {</span>
<span class="line">                            result.HasError = true;</span>
<span class="line">                            result.ErrorMessage = $&quot;HTTP请求失败: {response.StatusCode} - {responseContent}&quot;;</span>
<span class="line">                            _logger?.LogWarning(&quot;请求失败: {StatusCode} - {Content}&quot;, </span>
<span class="line">                                response.StatusCode, responseContent);</span>
<span class="line">                        }</span>
<span class="line">                    }</span>
<span class="line">                }</span>
<span class="line">            }</span>
<span class="line">            catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)</span>
<span class="line">            {</span>
<span class="line">                result.HasError = true;</span>
<span class="line">                result.ErrorMessage = &quot;请求被取消&quot;;</span>
<span class="line">                _logger?.LogWarning(&quot;请求被取消: {Url}&quot;, url);</span>
<span class="line">            }</span>
<span class="line">            catch (OperationCanceledException)</span>
<span class="line">            {</span>
<span class="line">                result.HasError = true;</span>
<span class="line">                result.ErrorMessage = &quot;请求超时&quot;;</span>
<span class="line">                _logger?.LogWarning(&quot;请求超时: {Url}&quot;, url);</span>
<span class="line">            }</span>
<span class="line">            catch (HttpRequestException ex)</span>
<span class="line">            {</span>
<span class="line">                result.HasError = true;</span>
<span class="line">                result.ErrorMessage = $&quot;网络请求异常: {ex.Message}&quot;;</span>
<span class="line">                _logger?.LogError(ex, &quot;网络请求异常: {Error}&quot;, ex.Message);</span>
<span class="line">            }</span>
<span class="line">            catch (Exception ex)</span>
<span class="line">            {</span>
<span class="line">                result.HasError = true;</span>
<span class="line">                result.ErrorMessage = $&quot;请求处理异常: {ex.Message}&quot;;</span>
<span class="line">                _logger?.LogError(ex, &quot;请求处理异常: {Error}&quot;, ex.Message);</span>
<span class="line">            }</span>
<span class="line"></span>
<span class="line">            var elapsed = DateTime.Now - startTime;</span>
<span class="line">            _logger?.LogDebug(&quot;完成请求 {Method} {Url} - 用时: {Elapsed}ms, 状态: {Success}&quot;,</span>
<span class="line">                method, url, elapsed.TotalMilliseconds, !result.HasError);</span>
<span class="line"></span>
<span class="line">            return result;</span>
<span class="line">        }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 针对BaseRequest&lt;T&gt;和BaseResponse类型的请求</span>
<span class="line">        /// 与原ObjRequest兼容的方法</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        public async Task&lt;TResponse&gt; SendRequestAsync&lt;TResponse&gt;(</span>
<span class="line">            string url,</span>
<span class="line">            HttpMethod method,</span>
<span class="line">            BaseRequest&lt;TResponse&gt; request,</span>
<span class="line">            string token = null,</span>
<span class="line">            string mediaType = &quot;application/json&quot;,</span>
<span class="line">            CancellationToken cancellationToken = default) </span>
<span class="line">            where TResponse : BaseResponse, new()</span>
<span class="line">        {</span>
<span class="line">            // 如果提供了token，设置授权头</span>
<span class="line">            if (!string.IsNullOrEmpty(token))</span>
<span class="line">            {</span>
<span class="line">                WithBearerToken(token);</span>
<span class="line">            }</span>
<span class="line"></span>
<span class="line">            var result = await SendRequestAsync&lt;TResponse, BaseRequest&lt;TResponse&gt;&gt;(</span>
<span class="line">                url, method, request, null, mediaType, cancellationToken);</span>
<span class="line"></span>
<span class="line">            if (result.HasError)</span>
<span class="line">            {</span>
<span class="line">                _logger?.LogWarning(&quot;请求失败: {Error}&quot;, result.ErrorMessage);</span>
<span class="line">                return new TResponse(); // 返回默认实例以兼容原接口</span>
<span class="line">            }</span>
<span class="line"></span>
<span class="line">            return result.Data ?? new TResponse();</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line"></span>
<span class="line">    /// &lt;summary&gt;</span>
<span class="line">    /// API结果包装类</span>
<span class="line">    /// &lt;/summary&gt;</span>
<span class="line">    public class ApiResult&lt;T&gt;</span>
<span class="line">    {</span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 响应数据</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        public T Data { get; set; }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// HTTP状态码</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        public int StatusCode { get; set; }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 是否发生错误</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        public bool HasError { get; set; }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 错误信息</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        public string ErrorMessage { get; set; }</span>
<span class="line"></span>
<span class="line">        /// &lt;summary&gt;</span>
<span class="line">        /// 请求是否成功</span>
<span class="line">        /// &lt;/summary&gt;</span>
<span class="line">        public bool IsSuccess =&gt; !HasError &amp;&amp; (StatusCode &gt;= 200 &amp;&amp; StatusCode &lt; 300);</span>
<span class="line">    }</span>
<span class="line">} </span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


