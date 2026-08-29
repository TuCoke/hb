# AutoGo 云控

> 自研的 **安卓群控 + 投屏 + 找图/OCR/YOLO + LLM 决策** 系统：一句自然语言进去，手机上被真实操作完成。
> 2026-07 启动，63 次提交，详见 [开发日志](./changelog.md)。

## 一、这是什么

三层，各自独立可跑，设备之间不直接通信，全靠服务端中转：

```
 浏览器控制台 / Tauri 客户端        服务端 Server               手机 Agent × N
 (React + Vite)         ←WS→     (Go，单二进制)      ←WS→    (Go，单二进制，cgo + OpenCV + ncnn)
                                     │
                                     ├── MCP  (/mcp)   把设备能力暴露成标准工具，外部 LLM 宿主可直接调
                                     └── brain（脑）   自然语言 → 动作 → 经 MCP 下发 → 真机执行
```

- **设备端 Agent**：把自己屏幕发出去（H.264）、执行收到的命令（点击 / 输入 / 找图 / 识别 / 跑流程）
- **服务端**：设备注册表、订阅式投屏、命令路由、任务编排、模型管理、多租户
- **控制端**：设备网格 + 详情（WebCodecs 硬解）+ 点击回传 + AI 对话；桌面 / 安卓 / 浏览器三种形态
- **ESP32-S3 硬件后端**（可选）：决策不变，只把最后一步 touch 从软件注入换成 USB / 蓝牙 HID 真触摸，作为某些 ROM 堵死软件注入时的兜底

## 二、关键设计决策

| 决策 | 原因 |
|---|---|
| **不做虚拟屏（一机多开）**，形态 = N 台物理手机各一个实例 | 去掉了闭源框架里唯一难复刻的护城河 |
| **自研薄栈，不绑闭源运行时** | 闭源核心说关就关、商用授权不明；参考其公开 API 设计但全部代码自己可控 |
| 识别混合：**高频"找图 → 点击"放手机端**（OpenCV），语义 / 没见过的界面交**服务端 LLM** | 延迟与灵活性各取所长 |
| 只自研差异化：编排 + 控制台 + LLM + 多设备管理；投屏 / 注入 / CV / 穿透用成熟件 | OpenCV、ncnn、frp、libadb-android、ADBKeyBoard |
| LLM 编排层一律参照官方 Open-AutoGLM 源码 | 凭经验猜的三次改动全部只有真机才暴露问题 |

## 三、架构与目录

**Agent 四层解耦，加新能力只加文件、不改核心：**

```
main.go        装配：解析参数 → Init → core.NewSession().Run()（断线重连）
core/          薄核心：Session（连 / 注册 / 心跳 / 缩略图 / 读循环）+ 命令注册表 + 分发
commands/      桥接：core.Register("tap", …) —— 命令名 → 能力调用
能力包         motion / images / capture / device / app / uiacc / yolo / files / storages / https（纯净、不依赖 core）
native         inject.c（注入）、match.cpp（OpenCV 找图）、libyolo.so（ncnn）、utils.dex（Java 框架桥，//go:embed 内嵌）
```

**Server 按 Go 包 DAG 分层：** `proto ← hub ← automation ← router ← main`，另有 `mcp / brain / tasks / dispatch / flows / store` 等业务包。

**其他目录：** `biz/` 业务层（独立 module，只经 MCP 边界）、`agent-esp32S3/` 固件、`flash/` 一键烧录包、`deploy-server/` 服务端打包、`handbook/` 项目手册（换电脑接手从这里读）。

## 四、已实现能力

| 类别 | 能力 |
|---|---|
| 投屏 | H.264 硬编 → WS → WebCodecs；按状态切换：网格态低频 JPEG、详情态实时视频；GOP 缓存、慢客户端隔离 |
| 注入 | root 走 `/dev/input`（亚毫秒）；无 root 走 utils.dex 的 `injectInputEvent` 多指注入；系统键走 `input keyevent`；拟人化速度剖面 + 弧线 + 震颤 |
| 控件 | UiAutomation 进程内控件树（毫秒级）+ 链式选择器 + `performAction`；SoM 元素编号定位 |
| 输入 | ADBKeyBoard 会话式输入法 / `ACTION_SET_TEXT` / 剪贴板，三级兜底 |
| 识别 | OpenCV 找图找色（端上 ~50ms）、PP-OCRv5、YOLOv8（自研 libyolo.so，ncnn）、区域截图 |
| 激活 | 免电脑：内置 adb 客户端 + root / adb-tcp / 无线调试（通知栏内联填码）三路自激活；Magisk 模块开机自启 |
| 保活 | 前台服务锚点 + 心跳文件看护 + Doze 持续压制 + `PARTIAL_WAKE_LOCK` |
| 连接 | 动态学习服务端 LAN 地址、adb / LAN / 公网自动切换、frp 穿透、nginx WSS 反代 |
| 编排 | MCP 70+ 工具分组；brain 文本动作协议（每步一次模型调用）、进度记账、原地打转检测、Dialect 抽象；autoglm-phone 与通用模型两套协议 |
| 流程 | 录制 → 语义 flow → 确定性回放 + 卡住 AI 自愈；等控件出现而非固定等待；概率执行 / 随机等待 |
| 运维 | 内核 A/B 双槽热更新（10 秒零人工）、派发队列、任务页、远程 shell、一键烧录包、模型管理进库、多租户 / 卡密 / 审计 |

## 五、踩过的坑（精选）

完整版按"症状 → 根因 → 修法"记在 [开发日志](./changelog.md)，这里挑影响最大的几条：

1. **WebCodecs 只在安全上下文可用**——局域网 IP + HTTP 打开控制台直接黑屏 `VideoDecoder is not defined`，必须 `localhost` 或 HTTPS
2. **一条同步阻塞写拖垮全场**——任一观看者收不动，堵住的是整台设备的心跳 / 回执；投屏、日志、回执三条通道先后栽在同一个病根上
3. **"假成功"是一类问题**——丢弃的 error、无 root 时 `su()` 静默返回空串、无条件 toast、`performAction` 返回 true 但界面不动、未回读就报成功……最后单独写进排查手册开篇
4. **无障碍注入整套推翻**——会被反外挂检测、锁屏受限，且"input 被封"是误判
5. **滑动翻不动页不是注入问题，是物理**——缓动末速度为 0，安卓翻页要 fling 速度；对照实验三种组合才定位
6. **热更新的三个真机坑**——新内核把自己回滚、把正在运行的槽删了、APK 用旧 agent 覆盖新版
7. **LLM 侧：信文档不信源码**——`max_tokens` 文档 2048 源码 3000、prompt 自己"精简"后模型不打标签、function calling 在 24 工具下退化
8. **编码纪律**——`.bat` 必须纯 ASCII + CRLF，`.sh` 必须 LF，打包时做成强制检查后真的拦下过事故

## 六、部署形态

- **局域网**：PC 起 Server，手机 agent 拨出连 `ws://<PC>:9091/agent`，浏览器开 `http://127.0.0.1:9091/`
- **跨网**：Server 放 VPS（nginx WSS 反代 + token），或内网 Server + frp 穿透一个入口；设备是出站连接，天然穿 NAT，不需要逐台穿透
- **给没有环境的人**：`flash/` 一键烧录包（双击 bat，自带 adb），`client-portable/` 便携客户端
- **换电脑接手**：读 `handbook/`，八篇约 4.2 万字，从环境搭建到排查手册
