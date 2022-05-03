# coding: utf8
# MIT License

import json
import uuid
import os
import subprocess
from time import time

title = os.environ['POPCLIP_BROWSER_TITLE']
html = os.environ['POPCLIP_HTML']
url = os.environ['POPCLIP_BROWSER_URL']
path = os.environ['POPCLIP_OPTION_LIBRARY']
name = str(uuid.uuid1()).upper()

path = os.path.expanduser(path)

if not os.path.exists(path):
    raise SystemExit(2)

cells = []

if not title:
    title = html.replace("\n", " ")[:html.find(' ', 35)] + "..."

cells.append({
    "type": "text",
    "data": html
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

with open(newpath + "/content.json", 'w') as f:
    json.dump(content, f, sort_keys=True, indent=2)

with open(newpath + "/meta.json", 'w') as f:
    json.dump(meta, f, sort_keys=True, indent=2)