# Golang 基础知识

本文档介绍 Golang 的基础概念和使用方法。

## Go 语言特性

Go 语言是一种静态类型、编译型语言，具有以下特点：

- 垃圾回收
- 内存安全
- 并发编程支持
- 快速编译
- 静态类型
- 简洁的语法

## Hello World

以下是 Go 语言中最基本的 Hello World 程序：

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## 变量和数据类型

Go 语言支持多种数据类型：

```go
// 变量声明
var name string = "John"
var age int = 30
var isValid bool = true

// 简短变量声明
shortName := "John"
shortAge := 30
shortIsValid := true

// 基本数据类型
// 整数类型：int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64
// 浮点类型：float32, float64
// 复数类型：complex64, complex128
// 布尔类型：bool
// 字符串类型：string
// 字符类型：rune (等同于 int32)
// 字节类型：byte (等同于 uint8)
```

## 控制流

Go 语言提供了多种控制流语句：

```go
// if-else 语句
if condition {
    // 代码块
} else if anotherCondition {
    // 代码块
} else {
    // 代码块
}

// for 循环
for i := 0; i < 10; i++ {
    // 代码块
}

// while 风格的 for 循环
for condition {
    // 代码块
}

// 无限循环
for {
    // 代码块
    if exitCondition {
        break
    }
}

// switch 语句
switch expression {
case value1:
    // 代码块
case value2, value3:
    // 代码块
default:
    // 代码块
}
```

## 函数

Go 语言中的函数定义和使用：

```go
// 基本函数
func add(a int, b int) int {
    return a + b
}

// 多返回值
func divAndMod(a, b int) (int, int) {
    return a / b, a % b
}

// 命名返回值
func divide(a, b float64) (result float64, err error) {
    if b == 0 {
        err = errors.New("cannot divide by zero")
        return
    }
    result = a / b
    return
}
``` 