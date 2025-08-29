#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
import json

def is_valid_json(json_str):
    try:
        json.loads(json_str)
        return True
    except ValueError:
        return False

selected_text = sys.argv[1].strip()

if is_valid_json(selected_text):
    try:
        parsed = json.loads(selected_text)
        formatted_json = json.dumps(parsed, indent=2, ensure_ascii=False)
        print(formatted_json)
    except Exception as e:
        print(f"Error formatting JSON: {e}")
else:
    print(f"Input is not valid JSON. Original text:\n{selected_text}")

