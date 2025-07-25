#!/bin/bash

# 定义要拉取的 Git 仓库和目标目录
REPO_URL="https://github.com/TuCoke/hb.git"
TARGET_DIR="/www/wwwroot/myblog"
BRANCH_NAME="md_pages"  # 指定要拉取的分支名称

# 如果目标目录不存在，则创建该目录
if [ ! -d "$TARGET_DIR" ]; then
    mkdir -p "$TARGET_DIR"
    echo "创建目录: $TARGET_DIR"
fi

# 进入目标目录
cd "$TARGET_DIR" || exit

# 检查 .git 目录是否存在，判断是否为 Git 仓库
if [ ! -d ".git" ]; then
    # 如果不是 Git 仓库，则先清空目录内容，然后克隆指定分支
    echo "目标目录不是Git仓库，正在清空目录并克隆..."
    rm -rf * .[^.]* 2>/dev/null || true  # 删除所有文件和隐藏文件（除了.和..）
    git clone -b "$BRANCH_NAME" "$REPO_URL" .
    if [ $? -eq 0 ]; then
        echo "成功克隆仓库到: $TARGET_DIR"
    else
        echo "克隆失败，请检查网络连接和仓库地址"
        exit 1
    fi
else
    # 如果已经是 Git 仓库，则切换到指定分支并拉取最新代码
    echo "目标目录已经是Git仓库，正在更新代码..."
    git fetch origin
    git checkout "$BRANCH_NAME"
    git pull origin "$BRANCH_NAME"
    if [ $? -eq 0 ]; then
        echo "成功更新代码"
    else
        echo "更新失败，请检查网络连接"
        exit 1
    fi
fi

echo "部署完成！" 