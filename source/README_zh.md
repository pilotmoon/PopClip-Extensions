# OpenAI TTS PopClip Extension

这是一个PopClip扩展，可以将选中的文本转换为语音，使用OpenAI的文本转语音API。

## 功能特点

- 支持自定义TTS模型（如 `tts-1`、`tts-1-hd` 或任何自定义模型）
- 支持自定义语音选择（如 alloy、echo、fable、onyx、nova、shimmer 或自定义语音名称）
- 支持自定义API端点（官方API、代理服务器、自部署服务等）
- 多种音频格式：mp3、opus、aac、flac
- 可调节语音速度（0.25 - 4.0倍）
- 安全的API密钥存储（保存在系统钥匙串中）
- 自动播放生成的音频

## 安装方法

1. 双击 `OpenAI TTS.popclipext` 文件夹
2. PopClip会自动识别并询问是否安装
3. 点击"Install Extension"确认安装

## 配置

安装后需要配置以下选项：

### 必需配置
- **OpenAI API Key**: 你的OpenAI API密钥（安全存储在钥匙串中）

### 可选配置
- **Base URL**: API基础URL (默认: `https://api.openai.com/v1`)
  - 官方API: `https://api.openai.com/v1`
  - 代理服务: `https://proxy.example.com/v1`
  - 自部署服务: `http://localhost:8000/v1`
- **Model**: TTS模型 (默认: `tts-1`)
  - `tts-1`: 标准质量，速度快
  - `tts-1-hd`: 高清质量，速度较慢
  - 支持任何自定义模型名称
- **Voice**: 语音名称 (默认: `alloy`)
  - `alloy`: 中性
  - `echo`: 男性
  - `fable`: 英式男性
  - `onyx`: 深沉男性
  - `nova`: 年轻女性
  - `shimmer`: 女性
  - 支持自定义语音名称
- **Audio Format**: 音频格式 (默认: `mp3`)
- **Speed**: 语音速度 (默认: `1.0`)

## 使用方法

1. 选中任意文本
2. 点击PopClip中的"OpenAI TTS"按钮
3. 系统会自动播放生成的语音

## 支持的服务

### OpenAI 官方API
- URL: `https://api.openai.com/v1`
- 需要OpenAI API密钥

### 代理服务
- 支持任何OpenAI兼容的代理服务
- 配置相应的base_url即可

### 自部署服务
- 支持本地或私有部署的OpenAI兼容服务
- 如 LocalAI、FastChat、vLLM 等

## 获取OpenAI API Key

1. 访问 [OpenAI Platform](https://platform.openai.com/)
2. 登录或注册账户
3. 前往 API Keys 页面
4. 创建新的API密钥
5. 复制密钥并在PopClip扩展设置中配置

## 注意事项

- 需要有效的API密钥和余额
- 文本长度有限制（具体参考所使用API的文档）
- 生成的音频文件会自动清理，不会占用磁盘空间
- 使用代理服务时，请确保网络连接稳定

## 故障排除

如果遇到问题：
1. 检查API密钥是否正确
2. 确认API服务有足够余额（如适用）
3. 检查Base URL是否正确
4. 验证模型和语音名称是否支持
5. 检查网络连接
6. 查看PopClip的调试日志

## 更新日志

### 最新版本
- ✅ 添加自定义Base URL支持
- ✅ 支持自定义模型和语音名称
- ✅ 安全的API密钥存储
- ✅ 支持多种OpenAI兼容服务 