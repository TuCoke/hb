@echo off
chcp 65001 >nul
cd /d "%~dp0"
rem 换电脑后双击一次：安装依赖、输入密码、解密全部日记、启用 git 钩子
if not exist node_modules (
  echo Installing dependencies, first time may take a while...
  call npm install
)
node scripts/diary-init.mjs
echo.
pause
