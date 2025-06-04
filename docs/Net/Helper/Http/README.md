
## 入参 和 出参

```C#
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Polly;
using Polly.Retry;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace DA.FileCloudSync.Core.Utilities.ObjRequest
{
    /// <summary>
    /// 增强版HTTP请求客户端
    /// </summary>
    public class ObjRequest2
    {
        private readonly ILogger<ObjRequest2> _logger;
        private readonly HttpClient _httpClient;
        private readonly RetryPolicy<HttpResponseMessage> _retryPolicy;
        private readonly int _defaultTimeoutSeconds;
        private readonly Dictionary<string, string> _defaultHeaders;

        /// <summary>
        /// 单例访问器
        /// </summary>
        public static ObjRequest2 Build(ILogger<ObjRequest2> logger = null)
        {
            return new ObjRequest2(logger);
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="logger">日志记录器</param>
        /// <param name="defaultTimeoutSeconds">默认超时时间(秒)</param>
        /// <param name="maxRetryAttempts">最大重试次数</param>
        public ObjRequest2(ILogger<ObjRequest2> logger = null, int defaultTimeoutSeconds = 30, int maxRetryAttempts = 3)
        {
            _logger = logger;
            _defaultTimeoutSeconds = defaultTimeoutSeconds;
            _httpClient = new HttpClient();
            _defaultHeaders = new Dictionary<string, string>();
            
            // 配置重试策略
            _retryPolicy = Policy
                .HandleResult<HttpResponseMessage>(r => !r.IsSuccessStatusCode && 
                    r.StatusCode != HttpStatusCode.BadRequest && 
                    r.StatusCode != HttpStatusCode.Unauthorized && 
                    r.StatusCode != HttpStatusCode.Forbidden)
                .WaitAndRetryAsync(
                    maxRetryAttempts,
                    retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
                    onRetry: (outcome, timespan, retryAttempt, context) =>
                    {
                        _logger?.LogWarning(
                            "正在重试请求 (尝试 {RetryAttempt}/{MaxRetries}). " +
                            "上次请求状态: {StatusCode}, URL: {Url}",
                            retryAttempt, maxRetryAttempts, outcome.Result.StatusCode, 
                            outcome.Result.RequestMessage?.RequestUri);
                    });
        }

        /// <summary>
        /// 添加默认请求头
        /// </summary>
        public ObjRequest2 AddDefaultHeader(string key, string value)
        {
            _defaultHeaders[key] = value;
            return this;
        }

        /// <summary>
        /// 设置授权Token
        /// </summary>
        public ObjRequest2 WithBearerToken(string token)
        {
            if (!string.IsNullOrEmpty(token))
            {
                AddDefaultHeader("Authorization", $"Bearer {token}");
            }
            return this;
        }

        /// <summary>
        /// 发送请求并获取指定类型的响应
        /// </summary>
        /// <typeparam name="TResponse">响应类型</typeparam>
        /// <typeparam name="TRequest">请求类型</typeparam>
        /// <param name="url">请求URL</param>
        /// <param name="method">HTTP方法</param>
        /// <param name="request">请求对象</param>
        /// <param name="timeoutSeconds">超时时间(秒)</param>
        /// <param name="mediaType">媒体类型</param>
        /// <param name="cancellationToken">取消令牌</param>
        /// <returns>响应对象或异常结果</returns>
        public async Task<ApiResult<TResponse>> SendRequestAsync<TResponse, TRequest>(
            string url,
            HttpMethod method,
            TRequest request = default,
            int? timeoutSeconds = null,
            string mediaType = "application/json",
            CancellationToken cancellationToken = default)
        {
            _logger?.LogDebug("开始请求 {Method} {Url}", method, url);
            var startTime = DateTime.Now;
            var result = new ApiResult<TResponse>();

            try
            {
                using (var requestMessage = new HttpRequestMessage(method, url))
                {
                    // 设置请求超时
                    var timeoutTokenSource = new CancellationTokenSource();
                    timeoutTokenSource.CancelAfter(TimeSpan.FromSeconds(timeoutSeconds ?? _defaultTimeoutSeconds));
                    
                    // 合并取消令牌
                    using (var linkedTokenSource = CancellationTokenSource.CreateLinkedTokenSource(
                        cancellationToken, timeoutTokenSource.Token))
                    {
                        // 添加默认请求头
                        foreach (var header in _defaultHeaders)
                        {
                            requestMessage.Headers.TryAddWithoutValidation(header.Key, header.Value);
                        }

                        // 添加请求体
                        if ((method == HttpMethod.Post || method == HttpMethod.Put || method == HttpMethod.Patch) && 
                            request != null)
                        {
                            string jsonContent = JsonConvert.SerializeObject(request);
                            requestMessage.Content = new StringContent(jsonContent, Encoding.UTF8, mediaType);
                            _logger?.LogTrace("请求内容: {Content}", jsonContent);
                        }

                        // 应用重试策略
                        var response = await _retryPolicy.ExecuteAsync(async () =>
                        {
                            return await _httpClient.SendAsync(
                                requestMessage, 
                                HttpCompletionOption.ResponseHeadersRead, 
                                linkedTokenSource.Token);
                        });

                        // 处理响应
                        result.StatusCode = (int)response.StatusCode;
                        string responseContent = await response.Content.ReadAsStringAsync();
                        
                        if (response.IsSuccessStatusCode)
                        {
                            if (!string.IsNullOrEmpty(responseContent))
                            {
                                try
                                {
                                    result.Data = JsonConvert.DeserializeObject<TResponse>(responseContent);
                                }
                                catch (JsonException ex)
                                {
                                    _logger?.LogError(ex, "响应反序列化失败: {Error}", ex.Message);
                                    result.ErrorMessage = $"响应反序列化失败: {ex.Message}";
                                    result.HasError = true;
                                }
                            }
                        }
                        else
                        {
                            result.HasError = true;
                            result.ErrorMessage = $"HTTP请求失败: {response.StatusCode} - {responseContent}";
                            _logger?.LogWarning("请求失败: {StatusCode} - {Content}", 
                                response.StatusCode, responseContent);
                        }
                    }
                }
            }
            catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
            {
                result.HasError = true;
                result.ErrorMessage = "请求被取消";
                _logger?.LogWarning("请求被取消: {Url}", url);
            }
            catch (OperationCanceledException)
            {
                result.HasError = true;
                result.ErrorMessage = "请求超时";
                _logger?.LogWarning("请求超时: {Url}", url);
            }
            catch (HttpRequestException ex)
            {
                result.HasError = true;
                result.ErrorMessage = $"网络请求异常: {ex.Message}";
                _logger?.LogError(ex, "网络请求异常: {Error}", ex.Message);
            }
            catch (Exception ex)
            {
                result.HasError = true;
                result.ErrorMessage = $"请求处理异常: {ex.Message}";
                _logger?.LogError(ex, "请求处理异常: {Error}", ex.Message);
            }

            var elapsed = DateTime.Now - startTime;
            _logger?.LogDebug("完成请求 {Method} {Url} - 用时: {Elapsed}ms, 状态: {Success}",
                method, url, elapsed.TotalMilliseconds, !result.HasError);

            return result;
        }

        /// <summary>
        /// 针对BaseRequest<T>和BaseResponse类型的请求
        /// 与原ObjRequest兼容的方法
        /// </summary>
        public async Task<TResponse> SendRequestAsync<TResponse>(
            string url,
            HttpMethod method,
            BaseRequest<TResponse> request,
            string token = null,
            string mediaType = "application/json",
            CancellationToken cancellationToken = default) 
            where TResponse : BaseResponse, new()
        {
            // 如果提供了token，设置授权头
            if (!string.IsNullOrEmpty(token))
            {
                WithBearerToken(token);
            }

            var result = await SendRequestAsync<TResponse, BaseRequest<TResponse>>(
                url, method, request, null, mediaType, cancellationToken);

            if (result.HasError)
            {
                _logger?.LogWarning("请求失败: {Error}", result.ErrorMessage);
                return new TResponse(); // 返回默认实例以兼容原接口
            }

            return result.Data ?? new TResponse();
        }
    }

    /// <summary>
    /// API结果包装类
    /// </summary>
    public class ApiResult<T>
    {
        /// <summary>
        /// 响应数据
        /// </summary>
        public T Data { get; set; }

        /// <summary>
        /// HTTP状态码
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// 是否发生错误
        /// </summary>
        public bool HasError { get; set; }

        /// <summary>
        /// 错误信息
        /// </summary>
        public string ErrorMessage { get; set; }

        /// <summary>
        /// 请求是否成功
        /// </summary>
        public bool IsSuccess => !HasError && (StatusCode >= 200 && StatusCode < 300);
    }
} 
```
