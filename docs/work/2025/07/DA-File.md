# 服务端部署说明

# 文件上传工具文档

本文档描述了基于.NET 8开发的文件上传工具的实现方案和使用说明。

## 开发文档

### 技术栈

*   后端：.NET 8 Web API , Redis, Hangfire定时器, Autofac , SqlSugar
    

### 2. API接口设计

#### 2.1 请求格式

> 2.1.1   请求格式

> **Request** 统一使用实体类

> Reponse 统一返回值

> ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/262d997d-a7cd-4cf4-ad3c-034baeccd7ed.png)

#### 2.2 中间件

##### 2.2.1 JWT 

> 需要注意的点为 ValidateLifetime = false 客户端需求不能token 过期

> 如需过期,可在ApiAuthorizeFilter上下文鉴权,根据jwt 颁发的token 判断来源是否为客户端,是则续签 -(会影响性能)

![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/7a820ce4-1007-424b-8e1d-07394b9fe585.png)

##### 2.2.2 日志

> ExceptionHandlerMiddleWare 

> 记录request 和 reponse 请求日志

> ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/71962ead-d30d-41bf-ab79-6538aae1025a.png)

### 3. 扩展功能

#### 3.1 Hangfire 访问

> url地址为 域名或者ip  路由 ->  /hangfire

> 用户名 :DA            密码 : DAADMIN!

#### 3.2 Hangfire 页面介绍

*   3.2.1 周期作业
    

> AlertJob 为预警规则配置页面 , 自动加载 无需其他操作

> FileUploadJob 文件关联iris 状态 任务

> UserSyncJob 为定时同步机构和大小组关系到数据库

> Cron 为执行周期, 可参考在线cron表达式 

> 作业为 具体执行方法 例如 FileUploadJob.ExecuteAsync -- FileUploadJob类下的 ExecuteAsync 方法

*   ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/640b0508-2ddd-4298-afd0-0d295170dac6.png)
    
*   3.2.2  周期作业任务作业状态
    

> 可查看已经完成的任务

*   ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/dfe2b965-3a8a-4a32-9e3a-c0aa72153485.png)
    

#### 3.3其他可参考页面配置

### 4. 配置说明

> _暂无_

## 部署文档

### 环境要求

*   .NET 8 Runtime dotnet 8运行时
    

> _安装完成后,输入shell 命令 - whereis dotnet 查看路径_

*   jenkins 配置部署命令  
    \`\`\` shell  
    mkdir -p dotnet  
    rm -rf dotnet/  
    _tar xf /root/filecloudsync.tgz -C dotnet_  
    _cd dotnet_  
    _dotnet publish —configuration Release_  
    _cp -rf /root/dotnet/DA.FileCloudSync.ApiServer/bin/Release/net8.0/publish/ /home/maoyf/hongbodev/dotnetFileServer/publish/_  
    _systemctl restart DA.ApiServer.service_  
    _systemctl status DA.ApiServer.service_
    

_\`\`\`_

*   _DA.ApiServer.service 配置文件_
    

> _无需更改, 在项目根目录下 Systemctl_

*   _Nginx 配置_
    

> _需要开启 client\_max\_body\_size 100m; 来传输fromdata表单文件_

> _其他配置可按需添加_

### 程序项目编译

*   Jenkins CICD 自动化部署
    
*   DA.FileCloudSync.ApiServer 推送到分支
    
*   ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/14625f5c-2c48-4048-9c7e-31ea98bbfc61.png)
    
*   ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/ff6ddb0e-8fc0-4287-8b9c-90c3ce2cecfb.png)
    
*   构建状态 绿色代表构建成功
    
*   ![image.png](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3M0OzeZ86vmXAqze/img/0b5286f4-ed95-42b4-a8da-e7f89253359f.png)