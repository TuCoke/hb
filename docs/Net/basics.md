# .NET 基础知识

本文档介绍 .NET 的基础概念和使用方法。

## .NET 框架组成

.NET 框架由以下主要组件组成：

- **CLR（公共语言运行时）**：执行托管代码的运行时环境
- **FCL（框架类库）**：提供标准化的 API 集合
- **开发工具**：包括编译器、调试器等

## C# 语言基础

C# 是 .NET 平台上最常用的编程语言之一。以下是 C# 的一些基本语法：

```csharp
// 基本 Hello World 程序
using System;

namespace HelloWorldApp
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}
```

## 常用数据类型

C# 支持多种数据类型：

| 类型 | 范围 | 描述 |
| --- | --- | --- |
| int | -2,147,483,648 到 2,147,483,647 | 整数 |
| long | -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807 | 长整数 |
| float | ±1.5 × 10^−45 到 ±3.4 × 10^38 | 单精度浮点数 |
| double | ±5.0 × 10^−324 到 ±1.7 × 10^308 | 双精度浮点数 |
| string | 不适用 | 字符串 |
| bool | true 或 false | 布尔值 |

## 控制流语句

C# 提供多种控制流语句：

```csharp
// if-else 语句
if (condition)
{
    // 代码块
}
else
{
    // 代码块
}

// for 循环
for (int i = 0; i < 10; i++)
{
    // 代码块
}

// while 循环
while (condition)
{
    // 代码块
}

// switch 语句
switch (expression)
{
    case value1:
        // 代码块
        break;
    case value2:
        // 代码块
        break;
    default:
        // 默认代码块
        break;
}
``` 