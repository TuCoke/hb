## Net Core 3.1 框架本质

> 本文参考 书籍 ASP.NET Core 3 框架揭秘（上下册）

### 1. 基础

#### 1.1.1. 依赖注入

- **依赖注入**：控制反转（Inversion of Control，缩写为IoC）是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。其中最常见的方式叫做依赖注入（Dependency Injection，简称DI）。

- **依赖注入容器**：依赖注入容器（Dependency Injection Container）是依赖注入的实现，它负责依赖关系的配置、对象的创建和生命周期的管理。

- **依赖注入框架**：依赖注入框架（Dependency Injection Framework）是依赖注入容器的实现，它提供了一系列的API，使得开发者可以方便地配置和管理依赖关系。

#### 1.1.2. 中间件

- **中间件**：中间件（Middleware）是ASP.NET Core框架中的一种组件，它可以在请求处理管道中插入自定义的处理逻辑，对请求和响应进行处理。

- **请求处理管道**：请求处理管道（Request Processing Pipeline）是ASP.NET Core框架中的一种机制，它负责处理HTTP请求，并将请求传递给中间件进行处理。
- **中间件管道**：中间件管道（Middleware Pipeline）是ASP.NET Core框架中的一种机制，它负责将请求传递给中间件进行处理，并将中间件的处理结果返回给客户端。

#### 1.1.3. 配置

- **配置**：配置（Configuration）是ASP.NET Core框架中的一种机制，它负责管理应用程序的配置信息，包括应用程序的设置、连接字符串、密钥等。
- **配置提供程序**：配置提供程序（Configuration Provider）是ASP.NET Core框架中的一种组件，它负责读取配置信息，并将配置信息提供给应用程序使用。

#### 1.1.4. 日志

- **日志**：日志（Logging）是ASP.NET Core框架中的一种机制，它负责记录应用程序的运行信息，包括错误信息、调试信息等。
- **日志提供程序**：日志提供程序（Logging Provider）是ASP.NET Core框架中的一种组件，它负责将日志信息写入到日志文件中。

### 2. 框架结构