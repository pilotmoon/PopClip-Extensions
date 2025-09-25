# MD5 Python Extension for PopClip

## 功能描述

这个PopClip扩展使用Python计算选中文本的MD5哈希值，并将结果复制到粘贴板。

## 使用方法

1. 选中任意文本
2. 在PopClip菜单中点击"MD5 (Python)"
3. MD5哈希值将自动复制到粘贴板

## 特性

- 使用Python的hashlib库计算MD5哈希值
- 支持UTF-8编码的文本
- 自动处理字符串和字节类型的输入
- 错误处理和异常捕获

## 技术实现

- 使用Python 3
- 基于hashlib.md5()函数
- 通过POPCLIP_TEXT环境变量获取选中文本
- 输出结果自动复制到粘贴板

## 版本

- 版本：1.0
- 作者：AI Assistant
- 标识符：com.custom.popclip.extension.md5python
