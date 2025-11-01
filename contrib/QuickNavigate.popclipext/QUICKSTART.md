# Quick Navigate - 快速开始指南

## 30秒快速配置

### 1️⃣ 创建配置文件

创建文件 `~/Documents/quicknavigate-config.json`：

```json
[
  {
    "name": "谷歌搜索",
    "url": "https://www.google.com/search?q={text}",
    "description": "在 Google 搜索"
  },
  {
    "name": "Grafana日志",
    "url": "https://plan-dev-grafana.api.brain.ai/explore?schemaVersion=1&panes={\"97l\":{\"datasource\":\"P8E80F9AEF21F6940\",\"queries\":[{\"refId\":\"A\",\"expr\":\"{app=\\\"planning-api\\\"} |= `{text}`\",\"queryType\":\"range\",\"datasource\":{\"type\":\"loki\",\"uid\":\"P8E80F9AEF21F6940\"},\"editorMode\":\"builder\",\"direction\":\"backward\"}],\"range\":{\"from\":\"now-7d\",\"to\":\"now\"}}}}&orgId=1",
    "description": "搜索 planning-api 日志（最近7天）"
  }
]
```

💡 **提示**：URL 现在使用**人类可读格式**，无需手动编码！你可以直接从浏览器复制 URL，只需将搜索文本替换为 `{text}` 即可。

### 2️⃣ 配置插件

1. 打开 PopClip 偏好设置
2. 找到 Quick Navigate 扩展
3. 设置 **Configuration File Path**: `~/Documents/quicknavigate-config.json`
4. 选择你喜欢的浏览器（如 Safari、Chrome 等）

### 3️⃣ 开始使用

**标准使用（显示选择对话框）**
- 选择文本 "LINEでFraserに3時間前に送信したメッセージを探して"
- 点击 PopClip 中的 Quick Navigate 图标
- 从弹出的对话框中选择 "Grafana日志" 或 "谷歌搜索"
- 自动在选择的网站中搜索这段文本！

**快速模式（跳过对话框）**
- 在 PopClip 设置中启用 **Skip Selection Dialog**
- 选择任意文本
- 点击 Quick Navigate 图标
- 自动使用第一个配置打开网站（无需选择）

## iCloud 同步配置

### 为什么要用 iCloud 同步？

如果你有多台 Mac，使用 iCloud 同步配置文件可以：
- ✅ 在所有设备上使用相同的配置
- ✅ 修改一次，所有设备自动更新
- ✅ 不用手动复制配置文件

### 如何设置 iCloud 同步？

**步骤 1：创建配置文件在 iCloud**

```bash
# 在终端执行
touch ~/Library/Mobile\ Documents/com~apple~CloudDocs/quicknavigate-config.json
```

**步骤 2：编辑配置文件**

用文本编辑器打开上面创建的文件，粘贴你的配置：

```json
[
  {
    "name": "Grafana日志",
    "url": "https://your-grafana-url.com/explore?query={text}"
  }
]
```

**步骤 3：在 PopClip 中设置路径**

在 PopClip 的 Quick Navigate 设置中，将 **Configuration File Path** 设置为：

```
~/Library/Mobile Documents/com~apple~CloudDocs/quicknavigate-config.json
```

**步骤 4：完成！**

现在你的配置会自动同步到所有启用了 iCloud Drive 的 Mac 上。

## 实用配置示例

### 示例 1：Grafana 日志搜索（人类可读！）

```json
{
  "name": "Grafana - Planning API",
  "url": "https://plan-dev-grafana.api.brain.ai/explore?schemaVersion=1&panes={\"97l\":{\"datasource\":\"P8E80F9AEF21F6940\",\"queries\":[{\"refId\":\"A\",\"expr\":\"{app=\\\"planning-api\\\"} |= `{text}`\",\"queryType\":\"range\",\"datasource\":{\"type\":\"loki\",\"uid\":\"P8E80F9AEF21F6940\"},\"editorMode\":\"builder\",\"direction\":\"backward\"}],\"range\":{\"from\":\"now-7d\",\"to\":\"now\"}}}}&orgId=1",
  "description": "搜索 planning-api 应用日志（最近7天）"
}
```

**参数说明**：
- `datasource`: Loki 数据源 ID
- `expr`: 查询表达式 `{app="planning-api"} |= `{text}`` 
- `range`: 时间范围 `now-7d` = 最近7天
- `{text}`: 自动替换为你选中的文本

### 示例 2：多语言搜索

```json
{
  "name": "DeepL 翻译",
  "url": "https://www.deepl.com/translator#en/zh/{text}",
  "description": "英译中自动翻译"
}
```

### 示例 3：代码搜索

```json
{
  "name": "GitHub 代码搜索",
  "url": "https://github.com/search?q={text}&type=code",
  "description": "在 GitHub 仓库中搜索代码"
}
```

### 示例 4：内部文档

```json
{
  "name": "公司 Wiki",
  "url": "https://wiki.yourcompany.com/search?q={text}",
  "description": "在公司内部文档中搜索"
}
```

### 配置字段说明

- **name** (必需): 配置的名称
- **url** (必需): URL 模板，使用 `{text}` 作为占位符
- **description** (可选): 描述信息，会显示在选择对话框中

## 常见问题

### Q: 文件路径要用什么格式？
A: 使用以下任意格式：
- `~/Documents/file.json` （本地文档）
- `~/Library/Mobile Documents/com~apple~CloudDocs/file.json` （iCloud）
- `/Users/username/path/to/file.json` （绝对路径）

### Q: 如何在 URL 中使用选中的文本？
A: 在 URL 模板中使用 `{text}` 或 `***` 作为占位符，例如：
- `https://example.com/search?q={text}`
- `https://example.com/query=***`

选中的文本会自动进行 URL 编码后替换占位符。

### Q: 如何跳过选择对话框直接打开？
A: 在 PopClip 设置中，勾选 **Skip Selection Dialog**。启用后会自动使用配置文件中的第一个配置，不显示选择对话框。如果你主要使用一个配置，把它放在 JSON 数组的第一个位置即可。

### Q: 配置文件找不到？
A: 检查以下几点：
1. 文件路径是否正确
2. 文件是否真的存在（使用 Finder 或终端查看）
3. iCloud Drive 是否已启用
4. 路径中的 `~` 会自动扩展为你的用户目录

### Q: JSON 格式错误？
A: 使用在线工具验证 JSON：
- [jsonlint.com](https://jsonlint.com/)
- 检查是否缺少逗号、括号、引号
- 确保每个配置都有 `name` 和 `url` 字段

## 终端命令快速参考

```bash
# 创建本地配置文件
touch ~/Documents/quicknavigate-config.json
open -a TextEdit ~/Documents/quicknavigate-config.json

# 创建 iCloud 配置文件
touch ~/Library/Mobile\ Documents/com~apple~CloudDocs/quicknavigate-config.json
open -a TextEdit ~/Library/Mobile\ Documents/com~apple~CloudDocs/quicknavigate-config.json

# 验证 JSON 格式（需要安装 jq）
cat ~/Documents/quicknavigate-config.json | jq .

# 查看文件是否存在
ls -la ~/Documents/quicknavigate-config.json
```

## 下一步

- 📖 查看完整文档：[README.md](README.md)
- 💡 查看更多配置示例：[example-config.json](example-config.json)
- 🐛 遇到问题？检查 PopClip 的通知消息获取详细错误信息

祝使用愉快！🎉

