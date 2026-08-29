@echo off
chcp 65001 >nul
cd /d "%~dp0"
rem 双击：创建今天的日记条目（自带骨架）并在 VS Code 打开；已存在的条目不会被改动
rem 也可以带参数：写日记.bat 今天的主题
node scripts/new-diary.mjs %*
if errorlevel 1 pause
