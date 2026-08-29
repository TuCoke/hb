# AutoGo 云控 · 开发日志

> 2026-07-21 → 2026-08-22，63 次提交。版本号按阶段划分（项目本身未打 tag），**最新在最上面**。
> 每条尽量按"症状 → 根因 → 修法"记录，方便以后回查。项目介绍见 [AutoGo 云控](./README.md)。

## v0.6 · 产品化（08-15 ~ 08-22）

**新增**

- **模型管理进库**（MySQL）：多模型、按租户隔离、对话框里随时切换、改完立刻生效；API Key 用 AES-GCM 加密存储、接口永远只回尾四位；自检按钮分阶段报错（连不上 / Key 错 / 模型名错 / 不支持看图）；老部署启动时自动把 `llm.env` 导入成公共模型
- **brain 进度记账**：接上官方动作表里一直被降级成空操作的 `Note`——模型自己记一行，程序每轮回灌到消息末尾并计数，解决"看十个视频实际做成 7 个或 13 个"
- 多租户 / 角色 / 数据范围 / 审计；卡密额度分租户和卡两层；体验 token（填用户名领 3 小时试用）
- 投屏：Java 桥虚拟屏 + 硬编码，默认 1.5Mbps / 20fps / 长边 ≤1280 自动算宽
- **ADBKeyBoard 会话式输入法**：用时切入 → `commitText` → 切回原输入法，不常驻、不挡人工打字；agent 自动内嵌安装 APK
- 桌面客户端双栏文件管理（本地 ↔ 设备）；设备详情改竖排图标条；远程停止 / 唤醒内核
- **AI 学流程 + 确定性回放**：命中已学流程 → 确定性回放 + 卡住时 AI 自愈；没学过 → AI 现学一遍并编译成语义 flow 入库（轨迹 → flow 编译器，坐标反查控件）；流程库从磁盘搬进 MySQL
- **brain Dialect 抽象**：GLM / autoglm 走同一套接口，换模型家族只加一个 `dialect_*.go`
- 离线设备花名册：掉线的设备标灰留在列表里，不再消失

**修复**

- 自检图 8×8 被模型服务回 500 且文案伪装成"网络错误"，把视觉模型误判成纯文本模型 → 自检图必须 ≥224px
- 模型名写错回的是 400 不是 404，只按状态码分类会落进兜底桶 → 分开处理；并立下规矩（有测试锁）：**点名的模型取不到必须报错，绝不悄悄回落**，否则界面显示 A、日志写 A、实际跑 B
- `noteTool` 被"无进展"判定误杀（连记三条就把任务判死，而那正是任务在推进的证据）→ 豁免
- 连接切换五个 bug 叠加导致"切不过去" → 重写成 kind → 具体地址
- UiAutomation 孤儿进程占住唯一槽位，粘贴 / 滚动全废而投屏点击照常（最难查的一个）→ 白名单自动清理 + 错误码细化
- 手机端顶栏被两个 720px 媒体查询互相覆盖压成四行 → 两行
- 打包校验按启动日志原话比对，日志一改就误报"编的是旧代码" → 改为校验结构
- `truncate` 裸切字节切出半个中文 → 退到字符边界（字节预算不变，防上下文体积悄悄涨三倍）
- `ime_on/off` 未登记权限导致崩溃循环；brain 任务 panic 兜底；任务完成用 broadcast 清所有标签页的"执行中"
- 心跳误判：只认 5s 业务心跳，shell 一卡就被判离线 → 收到任意入站帧即续命，reaper TTL 15s → 120s 兜底
- `build-portable.ps1` 误删同目录的 `一键打包.bat` → 只删生成物

## v0.5 · 业务流程引擎（08-10 ~ 08-11）

**新增**

- **图文发布全流程**在免 root 真机跑通（3 张图 → 入库 → 切文件夹 → 逐张勾选 → 标题正文，27 步零重试）；发布动作留在流程末尾且默认可选
- 素材库：多图素材 + 平台绑定，数据落独立数据目录与程序分离
- flow 引擎新动作：**控件点坐标**（`performAction` 在列表里会一路爬到整个容器、返回 true 但界面纹丝不动）、**按形状点网格图**（缩略图没有 text/desc、id 混淆、硬编码坐标必错）、选择器 class 附加过滤（两个同名「全部」只有 class 不同）
- **内核热更新 A/B 双槽**：下载 → sha256 → 解包备槽 → 原子切指针 → `syscall.Exec` 自重启 → 连回确认，10 秒零人工。不就地换文件的原因：内核是 bin + 4 个 so + 模型**一组**，逐个 rename 不是整体原子，中途断开就"新 bin 配旧 so"启动即崩、连推回滚的通道都没有
- 派发队列：同设备排队、跨设备并行；素材 × 设备多对多
- 任务页、远程 shell（贴脚本 → 选设备 → 按设备回传输出）
- 流程容错：固定等待改为**等控件出现**（400ms 轮询、最多 15s）；可选步骤单独策略（6s × 2）；重试退避翻倍
- 种草流程复用同一套结构（搜索词 = 素材标题，话术 = 素材正文）；引擎加通用 `Prob`（概率执行）和 `SecMax`（随机等待区间）——固定停顿会让几十台设备时序完全同步
- **接入 autoglm-phone**：按模型名分岔两套动作协议（千分制坐标 vs SoM 编号），prompt 用官方原文、思考按位置切、上下文累积、采样参数补齐、MaxSteps 15 → 100；真机坐标精度 2‰
- 版本号规则改为时间戳 `yyyyMMddHHmm`：递增、定长、字符串比较即时间序

**修复**

- 控件树走 `uitree` 通道而不是 `op_result`，用 `Query` 等就永远"查询超时" → 等对信箱
- 点缩略图中心会跳进预览页而非勾选；单图时预览页也有「下一步」一路蒙混过关，到三图才暴露 → 点右上角勾选圈
- 选中首张后底部弹出的预览条比网格图更大，"取面积最大一档"被它顶掉、第 2 张点到预览条上 → 改取"同尺寸且个数最多"一档 + 网格区下界
- 选中后按钮文字变「下一步(3)」精确匹配失效 → `textContains`
- 热更新三处真机才暴露的坑：新内核启动就把自己回滚（"看到 pending 就回滚"，而第一次启动跑的正是新内核）→ 尝试计数；把正在运行的槽删了（切槽后没重启，指针指 b 进程在 a）→ `Reconcile` 以实际运行槽校正 + 拒绝清运行中的槽；APK 用内嵌的旧 agent 覆盖设备上的新版 → 按 versionCode 判断
- 3 条素材发给同一台手机 = 3 条流程同时操作一块屏幕，事后日志却每步"成功" → 同设备排队
- 失败也记发布记录，素材被标"已派发"再不重发 → 只有成功才记
- 可选弹窗一视同仁加轮询，流程从 100s 涨到 190s，全花在两个不存在的弹窗上 → 单列策略
- **滑动翻不动页**：模型自称"滑到下一个视频"，报的却还是同一个。根因是速度剖面——`ease` 在终点速度严格为 0，而安卓翻页只认抬手 fling 速度或位移 >50% → 改 `easeFling` 匀速冲出（末速度 1.33 倍均速）；时长改按速度 2500px/s 且放在 agent 侧按分辨率算。对照实验：1254ms 桥 / 1254ms 原生 swipe 都不翻、300ms 原生 swipe 翻 → 不是注入的问题
- APK versionCode 忘了 +1 → 装完 APK 跑的还是旧内核
- 打包脚本"清空 web 再从 dist 复制"在 outDir 改成 `../web` 后成了破坏性操作 → 线上白屏 → 修
- 前端构建产物落点错，浏览器一直吃几天前的旧包 → 直出 `../web`
- 冷启草稿弹窗挡住一切操作 → 加「存草稿」步骤；绝不能点「去编辑」（会进上一条未完成的笔记）
- `Logf` / `fmt.Errorf` 非常量格式串（消息含 `%` 被二次解释）
- 删素材留一堆孤儿图片（33MB 里 31MB 是废的）→ 一并删只有它在用的图

## v0.4 · 稳定性与 LLM 决策层（08-06 ~ 08-09）

**新增**

- **拟人化操作**：最小急动度速度剖面 + 二阶贝塞尔弧线 + 8~12Hz 生理震颤 + 正态落点散布（Fitts law），幅度按 dp 定义适配不同分辨率，`-humanize=false` 可关
- **投屏按流媒体服务器方式重构**：每客户端一条有界队列（256）+ 独立发送协程，转发只做非阻塞投递；队列满就倒空并等关键帧，丢就丢到 GOP 边界；新观众补发整组 GOP；码率 6 → 2.5Mbps 并可调
- 手机端控制台改**云手机式全屏播放器**：画面占满视口、页面锁死不滚、底部固定虚拟键条、设备信息改半透明 HUD、其余收进抽屉。老浏览器兜底：`100vh` 打底再 `dvh` 覆盖、`inset` 补四边写法、`aspect-ratio` 用 `min-height` 兜底、vite target 显式 ES2019
- **一键烧录包**：整个文件夹发给对方双击即可，自带 adb，交互式 / 批量两种模式，被 ROM 拦时有 root 自动改走 `su pm install`
- 服务端打包脚本，带校验：`install-server.sh` 必须 LF、二进制里能搜到关键字符串、`index.html` 引用的 assets 对得上
- **MCP 工具集分组精简**：brain 预设从 24 个工具降到 11 个（schema 6910 → 794 token）。实测 glm-4.6v 在 24 工具规模下 function calling 退化——输出了动作描述却不产出 tool_call
- **SoM（Set-of-Mark）定位**：observe 枚举可操作元素并编号，`tap_element` 按编号点击，坐标由系统查表；补 `long_press_element`
- **决策层改文本动作协议**（对标 Open-AutoGLM）：`<think>思考</think><answer>do(action="Tap", element=14)</answer>`，思考与动作是同一段连续输出。三角色（规划 / 决策 / 反思）合并成单次调用，反思改为确定性判定 → 同一任务 110s → 44s。新增原地打转检测（界面变了 ≠ 有进展）
- 任务编排：Job / Task 两级、同设备串行、全局并发闸、失败重试、人工接管标记
- 设备页内联任务 / 自动化，移除独立脚本页；`main.tsx` 全局错误兜底（白屏至少能看到原因）
- **项目手册 `handbook/` 八篇**（约 4.2 万字），排查手册按"症状 → 根因 → 修法"组织，开篇单列"警惕假成功"

**修复**

- 9 个选择器类工具返回"已点击"却没等真实回执：agent 自写信封漏 id，服务端配不上对只能不等结果 → 统一走 `op_result` 并回填 id；`input_text` 增加回读控件树验证（`input text` 无焦点时 exit 0 却不生效）
- brain 丢弃工具返回值，模型只能反复空查同一件事 → 回流给模型；决策调用失败与"未产出动作"改为重试而非终止整个任务
- GLM 在工具多时把参数吐成 `<arg_key>` 内部格式并混进上一个参数的值里 → 容错解析
- 无 root 时缺 CPU 保活（内核 wake_lock 只有 root 写得进）→ 前台服务持 `PARTIAL_WAKE_LOCK`
- **一个慢客户端拖垮全场**：`RelayVideo` 在读循环里逐个客户端同步写，任一观看者收不动，卡住的是整台设备的消息通道（日志 / 回执 / 心跳全堵），严重时被判离线 → 见上"投屏重构"。同一病根后来在日志 / 回执通道再出现一次（任务在第 2 步后静默停住 200 秒）→ `WriteJSONTimeout` 5s 即断开该客户端，宁可掉一个观察者也不能拖住任务
- 中途加入者花屏到下一个 IDR：原来只补 SPS + IDR，新观众解完接到的是当前时刻 P 帧、中间整段缺失 → 补发从 IDR 起累积的整组 GOP
- 线上一直报"缺 LLM_API_KEY"，明明已经传上去了：从别的工作目录起服务，相对路径找不到 `llm.env` → 按可执行文件所在目录查找 + 启动日志说明是否加载成功
- `systemctl enable --now` 对已在运行的服务不重启，"部署完了还是旧版本"（MCP 工具数卡在 11）→ `enable + restart`
- 悬浮窗创建失败被 `catch{stopSelf()}` 吞掉悄无声息（MIUI 默认把 SYSTEM_ALERT_WINDOW 设成 ignore）→ 记日志 + lastError + toast
- `.sh` 带 CRLF 在 Linux 报 `/usr/bin/env: 'bash\r'`，纯 LF 的 `.bat` 让 cmd 找不到 `call :label` → `.gitattributes` 强制行尾；`.bat` 必须纯 ASCII，打包时扫描非 ASCII 直接报错退出（真的拦下过一次）
- 41 处 `Require*` 的 error 被丢弃，参数静默变成 0 / 空串，报出来的「设备上没找到应用 ""」把排查方向带偏 → 逐处修
- 元素清单 60 秒硬过期，把没动过的首页判成"过期"拒绝点击 → 清单由编排器每步重新抓取，不设 TTL
- `ui_dump` 属于 ui 组而老预设根本没带 ui，每步感知取控件树都在无声失败 → 分组反查改 allowTool
- **"切不到公网"三个 bug 叠加**：`Shell.su()` 无 root 时静默返回空串，启动 / 停止 / 查状态全是空操作而界面显示成功；「切公网」只写 SharedPreferences 不重启 agent；服务已在跑时 `tryAuto` 不再触发而 toast 无条件弹 → root → adb-tcp 降级链 + 显式重启 + toast 如实反映结果
- 公网端点下发全是死地址：VPS 上枚举出的是云内网 10.x 和 docker 网桥，还被 agent 持久化后每次重连挨个乱试 → 新增公网 URL 显式配置 + 过滤 docker / br- / veth / virbr 虚拟网卡
- 浏览器缓存旧 `index.html` → 引用的 hash JS 已被删 → 404 白屏 → `index.html` no-store、`/assets/` immutable
- 拔电锁屏约 8 分钟掉线：Doze 只在启动时压一次，系统复原后没人管 → 每 2 分钟复查并重压；日志改记命令输出 + 事后真实状态，而不是那句无条件的"已关 doze"
- 中文输入报"桥不可用，input text 也失败: 255"，真相往往只是**当前没有输入焦点** → 区分"桥连不上"和"桥说这次没成"，中文不再去试 `input text`
- 小米系 App 把控件 id 混淆成 `0_resource_name_obfuscated`，清单里冒出一堆一模一样的条目，模型在「点 #1 → 返回 → 点 #1」振荡九步 → 过滤掉（宁可不给，也不能给假线索）
- `app.Foreground` 三级兜底：`mResumedActivity`（7-9）→ `topResumedActivity`（10+）→ `mCurrentFocus`，Android 14 上前两个字段已不存在；`launch_app` 改轮询确认消除冷启动假失败
- 经 adb-tcp 起的进程属于那次 adb 会话的进程组，会话一断整组被杀（"启动了几秒就没"）→ 补 `setsid`
- 试过 Fullscreen API 压制系统边缘手势，已撤回：抽屉 portal 到 body，全屏只渲染播放器子树，一进全屏抽屉就跑到视图外

## v0.3 · 识别管线与业务层（07-23）

**新增**

- **找图 / 找色管线**：串行、区域、模板缓存、找色全家；**PP-OCRv5**（libppocr）；YOLO（自研 libyolo.so，ncnn 后端）；识别命令统一接 query
- 服务端识别类 MCP 工具全接（64 → 72），OCR 实时叠框
- **biz 业务层**独立 module，只经 MCP 边界；编译期挡住业务污染框架
- **录制 → 回放**：LLM（或人）规划一次录成 `flow.json`，之后零 token 确定性回放；随机滑动录的是"语义"，回放时重新随机，每次手势不同
- `app.Open` 从 monkey 改为 `am start`

**修复**

- **OCR 时 agent 被静默杀死**（无 panic、日志停在某次 OCR 前）：shell uid 优先级低，重内存 App 前台叠加 OCR 内存峰值触发 LMK → 识别改互斥串行（同时只一个 OCR / 找图 / YOLO），用完 `FreeOSMemory` 把整帧 RGB（约 14MB）还系统；重前台 App 连做 6 次 OCR 全程存活
- arm64 编译漏 `-lppocr`、x86 没有 libppocr.so 时部署直接失败 → 脚本补齐 / 自动跳过；非 root 启动改 `nohup sh` 看护循环（被杀 2s 内拉起，sh 内存极小更难被杀）

## v0.2 · 对标 AutoGo 补设备能力层（07-22 下午 ~ 07-23）

**走过的弯路（有价值所以留着）**

- 先做了**无障碍注入**（agent → 本地 TCP 桥 → `dispatchGesture`）并验证可用，随后**整套删除**：会被 App / 游戏反外挂检测、锁屏受限；且发现"input 被封"是误判——agent 是 shell uid（在 input 组），InputManager 实测可用
- `persist.adb.tcp.port` 无 root 重启自启：端口确实能保住，但设它会触发 adbd 重启（一度把模拟器传输搞断），且 BootReceiver 被 ROM 自启限制拦住 → **撤回**

**新增**

- **utils.dex 框架桥**：`app_process` 常驻 Java 助手，`InputManager.injectInputEvent` 多指注入（Android 14 用 `InputManagerGlobal` 版本安全反射），取代慢且单点的 `input` 命令；无 root 真机验证
- **UiAutomation 控件树**：进程内毫秒级 dump + `performAction` + `waitForIdle`，取代 1-2s 的 `uiautomator dump`；Android 9 / 14 双验证
- 找色全家（`Pixel / CmpColor / FindColor / FindMultiColors …`，颜色串格式兼容）；中文输入走 `ACTION_SET_TEXT`（不依赖 IME / 剪贴板）
- **免电脑激活 activator**：内置 adb 客户端（libadb-android）+ libsu + BouncyCastle 自签证书，root / adb-tcp / 无线调试三路自激活；无线配对改成**通知栏 RemoteInput 内联填码**（系统配对框是最顶层窗口，独立 Activity 顶不上去）
- 无 root 保活：前台服务当锚点 + agent 每 5s 写心跳文件，服务端每 15s 读 mtime 判活、死了重拉（杀掉后 20s 内自动恢复）
- 桥传输从 stdio 管道改 **Unix 抽象 socket** 帧化一问一答，消除 64KB / 串味 / stdio 依赖；utils.dex 用 `//go:embed` 内嵌进 agent 启动自释放，dex 与二进制永远配套
- device / app / uiacc / motion / system 大批能力 + 约 20 个 MCP 工具；跨 ROM 写能力走 `FakeContext`（伪装 `com.android.shell`）+ 框架 API，破 MIUI 无 root 改音量被 AppOps 拦（实测 15 → 95）
- files / storages（KV）/ https 三个纯 Go 包 + 15 个 MCP 工具；uiacc 富选择器全家族；P2 能力（media.ScanFile、IME 列表 / 切换、CPU 占用、当前 Activity …）；区域截图
- 视频源抽象 `VideoSource` 接口 + 工厂，为以后换 MediaCodec + VirtualDisplay 留位
- 内置 adb 升 v41（与现代 IDE 一致，避免 v36 / v41 daemon 互杀）

**修复**

- 免电脑激活的 agent 随 adb 断连被杀：重定向写在内层 `sh -c`，agent stdout 仍挂着 adb 管道 → `setsid` + 重定向放最外层 + `exec`，fd 彻底脱离
- 无 root 状态检测误报"未运行"：`pgrep -x` 漏（setsid exec 后 comm 变了）→ 先改 `pgrep -f`，后改读心跳文件（免 adb、可靠）
- 桥修稳后**系统键反而失效**：`injectInputEvent` 对电源 / 音量 / HOME 等策略键"返回成功却不生效"，因"成功"不再回退到能用的 `input keyevent` → 系统键直接走 `input keyevent`；`Wake` 改 keyevent 224 真点亮
- `device_info` 串行约 20 次 shell 撞 8s 查询超时 → 并行采集 + IMEI 带超时
- `ui_result` FIFO 串味（动作类空结果被 dump 等待者消费成空树）→ 按请求 id 配对
- MIUI 剥离后台 Service 的 intent extras → 配置改走 Activity intent；每 3s 自动回填会把用户填的公网地址冲成回环 → 删
- 重拉 agent 撞单例锁 `EADDRINUSE`、新配置不生效 → pkill 后轮询等旧进程退出再重拉
- `file_info` 对不存在的文件返回错误 → 返回 `{exists:false}`，上层 / LLM 才好判断
- utils 桥孤儿进程占住 UiAutomation → 桥随 agent 生死（EOF 自退 + 启动脚本 pkill）
- 单例锁只对 `EADDRINUSE` 判重复退出，其它绑定错 fail-open（某些 ROM 禁抽象 socket 时不 brick）

## v0.1 · 起步与骨架（07-21 ~ 07-22 上午）

**新增**

- 根仓库初始化：源码 / 设计文档 / 记忆入库；`.so`、apk、密钥、大二进制全部 gitignore，附 `BUILD-ARTIFACTS.md` 说明如何重建
- **AutoAgent APK 壳**：配置 / 启停 / 状态 UI，root 部署 agent 到 `/data/local/tmp`，前台服务看护（死了重拉），开机自启，悬浮球 + 日志窗（长按循环三档尺寸并持久化）
- **免写死 IP 的动态连接**：服务端注册后下发本机私网 IPv4，agent 学到后持久化到二进制同目录；重连先试 adb 回环，拔 USB 自动用学到的 LAN 地址；PC 换 IP 下次注册自动重报 → APK 里零 IP 配置
- **控制台改 Tauri v2 客户端**：一套 React 出 Windows exe（8.3MB）+ Android apk，系统 WebView 包小；本地源天然是安全上下文，顺手解决手机端 WebCodecs 黑屏
- `aa.bat` 三合一（build / run / all），run 按设备有无 root 自动分流：有 root 装 APK 起前台服务，无 root adb 直推 agent + 库 + 模型
- 部署脚手架：`deploy.bat`、frp / nginx WS 反代配置

**修复**

- `pkill -f agent.bin` 会匹配到自身的 su 命令，导致"自杀 / 存活误报" → 改 `-x` 按进程名精确匹配
- 每条 su 命令刷一次 Magisk 授权 toast → 常驻 su 会话，只授权一次
- 免 root 机点屏静默失败：`/dev/input` 被 SELinux 封、原逻辑空操作无回退 → 累积 down → up，没位移合成 `input tap`、有位移合成 `input swipe`
- "切到 WiFi"后仍连回 adb：重排端点跑在合并学到的端点**之前**，LAN 端点还没进列表 → 调整顺序
- 公网连接被误标为 adb：经 nginx 反代后服务端看到的是回环地址 → 优先读 `X-Forwarded-For` / `X-Real-IP`
- `aa.bat` 里 `echo -> path` 的 `>` 被 cmd 当成重定向、误建垃圾文件 → 改用冒号
- 悬浮日志窗挡点击 / 注入 → `FLAG_NOT_TOUCHABLE` 穿透

## 反复出现的三类根因

1. **假成功**：丢弃的 error、无 root 时静默返回空串、无条件 toast、未回读就报成功、`performAction` 返回 true 但界面不动——排查手册开篇专讲这一类
2. **同步阻塞写**：投屏、日志、回执三条通道先后栽在同一个病根上
3. **抄了参数没抄到物理 / 信文档不信源码**：滑动时长、`max_tokens`、prompt 改写，三次都能编译、日志正常，只有真机才暴露
