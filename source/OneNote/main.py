from __future__ import print_function
import sys, tidylib, os, json
import auth, requests

try:    
    session = auth.get_session(json.loads(os.getenv('POPCLIP_OPTION_AUTHSECRET')))
except requests.exceptions.ConnectionError:
    exit(1)
except:
    exit(2)

# use html in preference to plain text
body = os.getenv('POPCLIP_HTML') or os.getenv('POPCLIP_TEXT')

# add page title if we know it
title = os.getenv('POPCLIP_BROWSER_TITLE')
if title:
    body = '<title>%s</title' % title + body

# add source link if we know it
source = os.getenv('POPCLIP_BROWSER_URL')
if source:
    body += '<p>Clipped from: <a href="%s">%s</a></p>' % (source, source)

# run the html through tidy
html, errors = tidylib.tidy_document(body, {'char-encoding': 'utf8'})

# do the job
r = session.post('pages', files={'Presentation': ('Clipping', html, 'text/html')})
if r.status_code != 201:    
    exit(1)