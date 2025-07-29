# 个人整理工具类


### 钉钉消息通知 


```csharp
using Azure.Core;
using DA.FileCloudSync.Core.Configuration;
using DA.FileCloudSync.Models.ViewModels.DingTalkRobot;
using Microsoft.Extensions.FileSystemGlobbing.Internal.PathSegments;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace DA.FileCloudSync.Core.Utilities
{
    public class DingTalkRobot
    {

        //https://open.dingtalk.com/document/robots/customize-robot-security-settings
        public static DingTalkRobot Build
        {
            get
            {
                return new DingTalkRobot();
            }
        }
        private string _timestamp { get; set; }

        private string _secret { get; set; }

        private string _singnature { get; set; }

        private string _Url { get; set; }
        public DingTalkRobot()
        {
            _timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();
            _secret = AppSetting.DingTalkRobot.DiDiSecret ?? "";
            _singnature = GenerateHmacSignature();
            _Url = string.Format(AppSetting.DingTalkRobot.DDHost
           , _timestamp, _singnature);
        }




        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="secret"></param>
        /// <param name="url"></param>
        public DingTalkRobot(string secret, string url)
        {
            _timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString();
            _secret = secret ?? "";
            _singnature = GenerateHmacSignature();
            var dingurl = url + "&timestamp=" + _timestamp + "&sign=" + _singnature;
            _Url = dingurl;
        }

        /// <summary>
        ///   
        /// </summary>
        /// <param name="content">消息内容</param>
        /// <param name="atMobiles">手机号列表</param>
        /// <param name="isAtAll"></param>
        /// <returns></returns>
        public async Task SendTextAsync(string content, List<string> atMobiles, bool isAtAll = false)
        {
            TextModel tModel = new TextModel()
            {
                msgtype = "text",
                at = new atText()
                {
                    isAtAll = isAtAll,
                    atMobiles = atMobiles
                },
                text = new text()
                {
                    //关键词
                    content = AppSetting.DingTalkRobot.KeyWord + content
                }
            };
            string data = JsonConvert.SerializeObject(tModel);
            string json = await Request(data, "POST");
        }




        /// <summary>
        /// md文档格式
        /// </summary>
        /// <param name="content"></param>
        /// <param name="atMobiles"></param>
        /// <param name="isAtAll"></param>
        public async Task SendMarkdown(string title, string markdownContent, List<string> atMobiles, bool isAtAll = false)
        {
            try
            {
                // 确保atMobiles不为null
                atMobiles = atMobiles ?? new List<string>();

                // 创建markdown消息模型
                var mdModel = new MarkdownModel
                {
                    msgtype = "markdown",
                    at = new AtModel
                    {
                        isAtAll = isAtAll,
                        atMobiles = atMobiles
                    },
                    markdown = new MarkdownContent
                    {
                        title = title,
                        text = markdownContent
                    }
                };

                // 在markdown内容末尾添加@信息（钉钉markdown消息需要在内容中显式添加@）
                if (isAtAll)
                {
                    mdModel.markdown.text += "\n\n@所有人";
                }
                else if (atMobiles.Any())
                {
                    foreach (var mobile in atMobiles)
                    {
                        mdModel.markdown.text += $"@{mobile}\n";
                    }
                }

                string data = JsonConvert.SerializeObject(mdModel);
                string json = await Request(data, "POST");
            }
            catch (Exception ex)
            {

            }
        }



        private async Task<string> Request(string data, string reqtype)
        {
            try
            {

                //string url = await GetUrl();
                DateTime dt = DateTime.Now;
                string key = "DTRobotMinCount:" + $"{dt.Minute}";

                //if (url.IsEmptyOrNull())
                //{
                //    //对于机器人不断的超过限制发送，好像会封机器人发送信息几分钟避免此直接不发了
                //    _logger.LogWarning("钉钉机器人信息发送已超过每分钟发送限制");
                //    return string.Empty;
                //}
                //string url = string.Format(AppSetting.DingTalkRobot.DDHost
                //    , _timestamp, _singnature);
                var web = (HttpWebRequest)HttpWebRequest.Create(_Url);
                web.Method = reqtype;
                web.ContentType = "application/json";
                if (data.Length > 0 && reqtype.Trim().ToUpper() == "POST")
                {
                    byte[] postBytes = Encoding.UTF8.GetBytes(data);
                    web.ContentLength = postBytes.Length;
                    using (Stream reqStream = await web.GetRequestStreamAsync())
                    {
                        await reqStream.WriteAsync(postBytes, 0, postBytes.Length);
                    }
                }

                var html = string.Empty;
                using (HttpWebResponse response = (HttpWebResponse)await web.GetResponseAsync())
                {
                    Stream responseStream = response.GetResponseStream();
                    StreamReader streamReader = new StreamReader(responseStream, Encoding.UTF8);
                    html = await streamReader.ReadToEndAsync();
                }
                return html;
            }
            catch (Exception ex)
            {

                return "";
            }
        }

        public string GenerateHmacSignature()
        {
            string stringToSign = _timestamp + "\n" + _secret;

            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(_secret)))
            {
                byte[] signData = hmac.ComputeHash(Encoding.UTF8.GetBytes(stringToSign));
                string sign = HttpUtility.UrlEncode(Convert.ToBase64String(signData));

                return sign;
            }
        }
    }

    public interface IDingTalkRobotManager
    {

    }


    #region Markdown


    /// <summary>
    /// Markdown消息模型
    /// </summary>
    public class MarkdownModel
    {
        /// <summary>
        /// 消息类型，固定为markdown
        /// </summary>
        public string msgtype { get; set; } = "markdown";

        /// <summary>
        /// @人信息
        /// </summary>
        public AtModel at { get; set; }

        /// <summary>
        /// Markdown内容
        /// </summary>
        public MarkdownContent markdown { get; set; }
    }

    /// <summary>
    /// Markdown内容
    /// </summary>
    public class MarkdownContent
    {
        /// <summary>
        /// 标题
        /// </summary>
        public string title { get; set; }

        /// <summary>
        /// Markdown格式的消息内容
        /// </summary>
        public string text { get; set; }
    }

    /// <summary>
    /// @人信息
    /// </summary>
    public class AtModel
    {
        /// <summary>
        /// @所有人时:true,否则为:false
        /// </summary>
        public bool isAtAll { get; set; }

        /// <summary>
        /// 被@人的手机号
        /// </summary>
        public List<string> atMobiles { get; set; }
    }
    #endregion
}

```
