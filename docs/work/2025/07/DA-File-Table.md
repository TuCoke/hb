# 服务端部署说明 - 文件上传工具文档

本文档描述了基于.NET 8开发的文件上传工具的实现方案和使用说明。

## 1. 开发文档

### 1.1 技术栈

| 组件 | 技术选型 |
|------|----------|
| 后端 | .NET 8 Web API, Redis, Hangfire定时器, Autofac, SqlSugar |

### 1.2 API接口设计

#### 1.2.1 请求格式

| 类型 | 说明 |
|------|------|
| Request | 统一使用实体类 |
| Response | 统一返回值 |

![Response格式](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/262d997d-a7cd-4cf4-ad3c-034baeccd7ed.png)

#### 1.2.2 中间件

##### JWT认证

| 配置项 | 说明 |
|--------|------|
| ValidateLifetime | 设置为false（客户端需求不能token过期） |
| 特殊说明 | 如需过期,可在ApiAuthorizeFilter上下文鉴权,根据jwt颁发的token判断来源是否为客户端,是则续签(会影响性能) |

![JWT配置](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/7a820ce4-1007-424b-8e1d-07394b9fe585.png)

##### 日志中间件

| 中间件 | 功能 |
|--------|------|
| ExceptionHandlerMiddleWare | 记录request和response请求日志 |

![日志配置](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/71962ead-d30d-41bf-ab79-6538aae1025a.png)

### 1.3 扩展功能

#### Hangfire访问配置

| 配置项 | 值 |
|--------|-----|
| 访问地址 | 域名或IP + /hangfire |
| 用户名 | DA |
| 密码 | DAADMIN! |

#### Hangfire页面说明

| 作业名称 | 说明 |
|----------|------|
| AlertJob | 预警规则配置页面，自动加载无需其他操作 |
| FileUploadJob | 文件关联iris状态任务 |
| UserSyncJob | 定时同步机构和大小组关系到数据库 |

注：Cron为执行周期，可参考在线cron表达式

![Hangfire配置](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/640b0508-2ddd-4298-afd0-0d295170dac6.png)

## 2. 部署文档

### 2.1 环境要求

| 组件 | 要求 |
|------|------|
| .NET Runtime | .NET 8运行时 |
| 验证安装 | 使用shell命令：`whereis dotnet`查看路径 |

### 2.2 Jenkins部署配置

```shell
mkdir -p dotnet
rm -rf dotnet/
tar xf /root/filecloudsync.tgz -C dotnet
cd dotnet
dotnet publish --configuration Release
cp -rf /root/dotnet/DA.FileCloudSync.ApiServer/bin/Release/net8.0/publish/ /home/maoyf/hongbodev/dotnetFileServer/publish/
systemctl restart DA.ApiServer.service
systemctl status DA.ApiServer.service
```

### 2.3 服务配置

| 配置项 | 说明 |
|--------|------|
| DA.ApiServer.service | 无需更改，在项目根目录下Systemctl |
| Nginx配置 | 需要开启 client_max_body_size 100m 来传输fromdata表单文件 |

### 2.4 程序项目编译

使用Jenkins CICD自动化部署：

1. DA.FileCloudSync.ApiServer推送到分支
2. 查看构建状态（绿色代表构建成功）

![Jenkins配置1](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/14625f5c-2c48-4048-9c7e-31ea98bbfc61.png)
![Jenkins配置2](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/ff6ddb0e-8fc0-4287-8b9c-90c3ce2cecfb.png)
![构建状态](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/0b5286f4-ed95-42b4-a8da-e7f89253359f.png) 