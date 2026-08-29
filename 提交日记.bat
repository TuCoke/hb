@echo off
chcp 65001 >nul
cd /d "%~dp0"
rem 双击：加密有改动的日记 -> 提交 -> 推送
node scripts/diary-push.mjs %*
echo.
pause
