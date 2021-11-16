# coding: utf8
# MIT License

import json
import uuid
import os
import subprocess
from time import time

def tidy(text):
    return subprocess.check_output(['/usr/bin/php', 'tidy.php', text])

title = os.environ['POPCLIP_BROWSER_TITLE']
html = os.environ['POPCLIP_HTML']
text = os.environ['POPCLIP_TEXT']
url = os.environ['POPCLIP_BROWSER_URL']
path = os.environ['POPCLIP_OPTION_LIBRARY']
style = os.environ['POPCLIP_OPTION_STYLE']
name = str(uuid.uuid1()).upper()

path = os.path.expanduser(path)

if not os.path.exists(path):
    raise SystemExit(2)

body = text.replace("\n", "<br />")\
           .replace("\t", "    ")\
           .replace("  ", "&nbsp;&nbsp;")

if style == "Clean":
    note = tidy(html or body)
elif style == "Original":
    note = html or body
else:
    note = text

cells = []

if not title:
    title = text.replace("\n", " ")[:text.find(' ', 35)] + "..."

cells.append({
    "type": "text",
    "data": note
})

if url:
    cells.append({
        "type": "text",
        "data": "<p>Clipped from: <a href=\"{0}\">{0}</a></p>".format(url)
    })

content = {
    "title": title,
    "cells": cells
}

meta = {
    "created_at": int(time()),
    "tags": [],
    "title": title,
    "updated_at": int(time()),
    "uuid": name
}

newpath = path + '/Inbox.qvnotebook/' + name + '.qvnote'

if not os.path.exists(newpath): os.makedirs(newpath)

with open(newpath + "/content.json", 'wb') as f:
    json.dump(content, f, sort_keys=True, indent=2)

with open(newpath + "/meta.json", 'wb') as f:
    json.dump(meta, f, sort_keys=True, indent=2)