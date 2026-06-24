@echo off
chcp 65001 >nul
echo ============================================
echo   智谱AI ChatGLM API 测试工具
echo ============================================
echo.

set API_KEY=d1b6ae57c38448dc9516b1d3cbea77e2.Maz0UzImBetYkX3I
set MODEL=glm-4-flash

echo [1/3] 检查网络连接...
ping -n 1 open.bigmodel.cn >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 无法连接到智谱AI服务器！请检查网络。
    pause
    exit /b 1
)
echo ✅ 网络连接正常
echo.

echo [2/3] 测试API Key有效性...
echo 正在调用智谱AI接口...

curl -s -X POST "https://open.bigmodel.cn/api/paas/v4/chat/completions" ^
  -H "Authorization: Bearer %API_KEY%" ^
  -H "Content-Type: application/json" ^
  -d "{\"model\":\"%MODEL%\",\"messages\":[{\"role\":\"user\",\"content\":\"你好\"}],\"max_tokens\":100}" ^
  -o response.json

if exist response.json (
    echo ✅ API响应已接收
    echo.
    echo [3/3] AI回复内容：
    type response.json | findstr /C:"content"
    echo.
    echo ============================================
    echo   ✅ 测试成功！API可以正常使用
    echo ============================================
    del response.json
) else (
    echo ❌ 未收到API响应
    echo 可能原因：
    echo   1. API Key无效或过期
    echo   2. 网络连接问题
    echo   3. 账户余额不足
)

pause