#!/usr/bin/env python3
"""
PopClip Extension: MD5 Hash Calculator
计算选中文本的MD5哈希值并输出到粘贴板
"""

import hashlib
import sys
import os
from typing import Union


def gen_md5(content: Union[str, bytes]) -> str:
    """
    计算字符串或字节内容的 MD5 哈希值

    Args:
        content: 要计算哈希值的内容，可以是字符串或字节

    Returns:
        str: MD5 哈希值的十六进制字符串表示
    """
    if isinstance(content, str):
        content = content.encode("utf-8")

    return hashlib.md5(content).hexdigest()


def main():
    """主函数：从PopClip获取选中的文本并计算MD5哈希值"""
    try:
        # 从环境变量获取PopClip选中的文本
        selected_text = os.environ.get('POPCLIP_TEXT', '')
        
        if not selected_text:
            print("Error: No text selected", file=sys.stderr)
            sys.exit(1)
        
        # 计算MD5哈希值
        md5_hash = gen_md5(selected_text)
        
        # 输出结果（PopClip会自动将输出复制到粘贴板）
        print(md5_hash, end='')
        
    except Exception as e:
        print(f"Error calculating MD5: {str(e)}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
