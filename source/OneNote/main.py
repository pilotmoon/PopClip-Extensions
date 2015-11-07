from __future__ import print_function
import sys, os, json, subprocess
import auth, requests

def tidy(text):
    #html, errors = tidylib.tidy_document(body, {'char-encoding': 'utf8'}) #  libtidy exception on elcap
    return subprocess.check_output(['/usr/bin/php', 'tidy.php', text])

def get_config(key):
    res = os.getenv(key)
    # if not res:
    #     testdata = {
    #         'POPCLIP_OPTION_AUTHSECRET': '""',
    #         'POPCLIP_TEXT': "<p>test text abc fdf"
    #         }
    #     if key in testdata:
    #         res = testdata[key]
    return res;

try:    
    session = auth.get_session(json.loads(get_config('POPCLIP_OPTION_AUTHSECRET')))
except requests.exceptions.ConnectionError:
    exit(1)
except:
    exit(2)

# use html in preference to plain text
body = get_config('POPCLIP_HTML') or get_config('POPCLIP_TEXT')

# add page title if we know it
title = get_config('POPCLIP_BROWSER_TITLE')
if title:
    body = '<title>%s</title' % title + body

# add source link if we know it
source = get_config('POPCLIP_BROWSER_URL')
if source:
    body += '<p>Clipped from: <a href="%s">%s</a></p>' % (source, source)

# run the html through tidy
html = tidy(body)

# do the job
r = session.post('pages', files={'Presentation': ('Clipping', html, 'text/html')})
if r.status_code != 201:    
    exit(1)