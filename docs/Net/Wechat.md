# NetCore 简单的公众号扫码回复零时登录功能

## 流程 
>1.首先去微信公众号后台,配置接口地址 如下


```csharp
        /// <summary>
        /// 微信公众号配置 验证token
        /// </summary>
        /// <param name="echostr"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet("Token")]
        public IActionResult Token(string echostr)
        {
            return Content(echostr);
            //return Ok();
        }

        /// <summary>
        /// 微信公众号配置 接收 微信 xml body内容
        /// </summary>
        /// <param name="signature"></param>
        /// <param name="timestamp"></param>
        /// <param name="nonce"></param>
        /// <param name="openid"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("Token")]
        public async Task<IActionResult> Token(string signature, string timestamp, string nonce, string openid)
        {
            try
            {
                using StreamReader? reader = new StreamReader(Request.Body);
                var xmlStr = await reader.ReadToEndAsync();

                // Log the incoming request if needed
                // Logger.Info(LoggerType.Login, $"WeChat Request: {xmlStr}", null, null);

                var request = new WeChatRequest
                {
                    XmlData = xmlStr,
                    Signature = signature,
                    Timestamp = timestamp,
                    Nonce = nonce
                };

                var result = await _messageHandle.Handle(request);

                return Content(result, "text/xml");
            }
            catch (Exception ex)
            {
                // Log the error
                Logger.Error(LoggerType.Login, $"WeChat API Error: {ex.Message}", ex.StackTrace);
                return Content(string.Empty);
            }
        }
```
