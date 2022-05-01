#!/usr/bin/python
# -*- coding: utf-8 -*-
import os

POPCLIP_TEXT = os.getenv('POPCLIP_TEXT')
if POPCLIP_TEXT.startswith('#'):
	POPCLIP_TEXT = POPCLIP_TEXT.lstrip('#')
print('0x' + POPCLIP_TEXT)