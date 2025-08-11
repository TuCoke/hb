# .Net Core 中使用 mediator 中介者
## mediator
.NET中的简单中介者模式实现，一种进程内消息传递机制（无其他外部依赖）。
支持以同步或异步的形式进行请求/响应，命令，查询，通知和事件的消息传递，并通过C#泛型支持消息的智能调度。

## 为什么要用mediator (解耦)
MediatR 是 .NET 中的一种实现 中介者模式（Mediator Pattern） 的库。
它允许您将应用程序中的请求和响应解耦，使各个组件通过一个中介者进行通信，避免了直接依赖，从而使得代码更加松耦合，易于扩展和维护。

> 参考[https://www.cnblogs.com/wudequn/p/13063254.html](https://www.cnblogs.com/wudequn/p/13063254.html)



## 1. 处理请求和返回基本用法
MediatR 使用 请求/响应模式，即客户端通过请求发送数据，并由处理程序处理后返回响应。请求通常是实现 IRequest&lt;TResponse&gt; 接口的类，
TResponse 是请求的响应类型。处理程序需要实现 IRequestHandler&lt;TRequest, TResponse&gt; 接口来处理请求。

### 定义请求
```csharp
    
	// 定义Rquest 请求 继承 IRequest&lt;T&gt;   注意这里 T 为返回值 例如 
	// return "11";
    public class MyRequest : IRequest&lt;string&gt;
    {
        public string Name { get; set; }
    }
```
### 定义handler

```csharp
using MediatR;
using System.Threading;
using System.Threading.Tasks;

// MyRequest 是我们上方定义的 请求体, 返回类型 string类型
public class MyRequestHandler : IRequestHandler&lt;MyRequest, string&gt;
{
    public Task&lt;string&gt; Handle(MyRequest request, CancellationToken cancellationToken)
    {
        // 在这里处理请求的业务逻辑
        return Task.FromResult($"Hello, {request.Name}!");
    }
}


```
> MyRequestHandler 处理 MyRequest 请求，并返回一个字符串响应，格式为 "Hello, !"。


    
