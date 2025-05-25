# Golang 安装指南

本文档将指导您完成 Golang 的安装过程。

## 系统要求

Go 可以在以下操作系统上运行：
- Windows 7 或更高版本
- macOS 10.11 或更高版本
- Linux 系统，如 Ubuntu、CentOS、Debian 等

## Windows 安装步骤

1. 访问 [Go 官方下载页面](https://golang.org/dl/)
2. 下载 Windows 安装包（.msi 文件）
3. 运行下载的安装包并按照提示进行操作
4. 完成安装后，打开命令提示符并运行 `go version` 验证安装

## macOS 安装步骤

### 使用 Homebrew 安装

如果您已安装 Homebrew，可以使用以下命令：

```bash
brew install go
```

### 使用安装包安装

1. 访问 [Go 官方下载页面](https://golang.org/dl/)
2. 下载 macOS 安装包（.pkg 文件）
3. 运行安装包并按照提示进行操作
4. 完成安装后，打开终端并运行 `go version` 验证安装

## Linux 安装步骤

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install golang-go
```

### CentOS/RHEL

```bash
sudo yum install epel-release
sudo yum install golang
```

## 设置 GOPATH

安装 Go 后，还需要设置 GOPATH 环境变量，它指定了您的 Go 工作区位置：

```bash
# Linux/macOS (添加到 ~/.bashrc 或 ~/.zshrc)
export GOPATH=$HOME/go
export PATH=$PATH:$GOPATH/bin

# Windows (系统环境变量)
# GOPATH = C:\Users\YourName\go
# 将 %GOPATH%\bin 添加到 PATH
``` 