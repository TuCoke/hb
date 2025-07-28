# NetCore 公众号登录功能

> 通过接入微信公众号,用户关注后,发送关键字生成一个验证码,用户填写验证码正确则登录成功 反之失败.
> 个人公众号如何实现一个简单的回复关键字登录
> xml格式通讯,需要自己准备一个xml转化工具


### 流程 
> 1.根据微信公众号文档,首先配置接口地址.
> 2.根据用户关注后回复验证码 为关键字,随机生成一串数字为验证码,发送给用户.
> 3.用户填写后,点击登录即完成登录功能.

### 1. 第一步：配置微信公众号后台接口地址
在微信公众号后台配置接口地址，如下所示：
![微信公众号配置](https://github.com/user-attachments/assets/99d82936-412e-4db8-b5c4-1147f246ef77)

### 2. 第二步：代码配置
我们需要设置一个 GET 请求以响应微信的请求，以及一个 POST 请求来接收微信发送过来的 XML 数据。
> 如上方图片所示,我们Url 为 Token  例如 api/xxx/Token 确保Url正确才能使用
> 本地开发调试需要用到内网穿透工具.

### 3. API 接口层

<details>
  <summary>API 接口层代码</summary>

```csharp
/// <summary>
/// 微信公众号配置 验证token
/// </summary>
/// <param name="echostr"></param>
/// <returns></returns>
[AllowAnonymous]
[HttpGet("Token")]  // 微信公众号后台配置的地址url
public IActionResult Token(string echostr)
{
    return Content(echostr);
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

        return Content(result, "text/xml"); // 注意为xml格式
    }
    catch (Exception ex)
    {
        // Log the error
        Logger.Error(LoggerType.Login, $"WeChat API Error: {ex.Message}", ex.StackTrace);
        return Content(string.Empty);
    }
}
```
</details>

### 4. Handle 接收微信 XML 格式

<details>
  <summary>处理 Handle 接收微信 XML 格式</summary>

```csharp
public async Task<string> Handle(WeChatRequest request, CancellationToken cancellationToken = default)
{
    var dicData = XmlToDic(request.XmlData);
    var msgType = dicData["MsgType"].ToString();

    if (msgType == "event")
    {
        var eventType = dicData["Event"].ToString();

        if (eventType == "subscribe" || eventType == "unsubscribe")
        {
            // 关注或取消关注事件
            var ev = new WechatsubscribeEvent
            {
                OpenId = dicData["FromUserName"].ToString(),
                IsSubscribe = eventType == "subscribe",
            };
            // 将 OpenId 存储在缓存中以便临时登录验证
            if (ev.IsSubscribe)
            {
                _cacheService.Add("wechat:openid:" + ev.OpenId, ev.OpenId, 86400); // 存储 24 小时
            }
        }
        var hasEventKey = dicData.TryGetValue("EventKey", out object oEventKey);
        if (hasEventKey)
        {
            // 处理 EventKey 逻辑
        }
    }
    else
    {
        var v = (ResponseMsgType)Enum.Parse(typeof(ResponseMsgType), msgType, true);

        switch (v)
        {
            case ResponseMsgType.Empty:
                break;

            case ResponseMsgType.Text:
                var xmlbody = Util.ClearXmlHeader(request.XmlData);
                MessageBase obj = (MessageBase)_xmlSerializer.Deserialize(xmlbody);

                // 获取用户发送的文本内容
                var userContent = dicData["Content"]?.ToString()?.Trim();
                var fromUserName = dicData["FromUserName"]?.ToString();
                var toUserName = dicData["ToUserName"]?.ToString();

                // 检查用户是否发送了"验证码"
                if (!string.IsNullOrEmpty(userContent) && userContent.Equals("验证码", StringComparison.OrdinalIgnoreCase))
                {
                    // 使用加密安全的随机数生成 6 位验证码
                    var verificationCode = GenerateSecureVerificationCode();
                    
                    // 将验证码与 OpenId 存储
                    var openId = obj.FromUserName;
                    _cacheService.Add("code:" + verificationCode, verificationCode, 180);
                    _cacheService.Add("openid:" + verificationCode, openId, 180);

                    // 构造回复消息 XML
                    var replyXml = $@"<xml>
                                        <ToUserName><![CDATA[{obj.FromUserName}]]></ToUserName>
                                        <FromUserName><![CDATA[{obj.ToUserName}]]></FromUserName>
                                        <CreateTime>{DateTimeOffset.UtcNow.ToUnixTimeSeconds()}</CreateTime>
                                        <MsgType><![CDATA[text]]></MsgType>
                                        <Content><![CDATA[您的验证码是：{verificationCode}，有效期3分钟，请妥善保管。]]></Content>
                                    </xml>";

                    return replyXml;
                }

                break;
            default:
                break;
        }
    }
    await Task.CompletedTask;

    return "";
}
```
</details>


#### 5. 登录实现
> 我们使用 _cacheService 缓存来实现记录用户的openid,来存储判断用户是否已经登录过了.
> 根据 verificationCode 来判断用户 输入的验证码是否正确 
> 登陆给用户添加默认角色.颁发token
> 登录逻辑都不同,这里就不展示代码了

