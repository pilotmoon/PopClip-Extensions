#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Created by i@BlahGeek.com at 2014-04-17


import os
import requests

APIKEY = os.environ['POPCLIP_OPTION_APIKEY'].strip()
DEVICE = os.environ['POPCLIP_OPTION_DEVICE'].strip()


def get_devices():
    url = 'https://api.pushbullet.com/api/devices'
    ret = requests.get(url, auth=(APIKEY, '')).json()
    return ret.get('devices', list())


def pushit(typ, data):
    url = 'https://api.pushbullet.com/api/pushes'
    data.update({'device_iden': DEVICE, 'type': typ})
    req = requests.post(url, data=data, auth=(APIKEY, ''))
    if req.status_code != 200:
        raise RuntimeError('Error %d. Check your API Key and Device ID.' % req.status_code)


def get_lines(key):
    if key not in os.environ:
        return list()
    ret = os.environ[key].strip()
    ret = map(lambda x: x.strip(), ret.split('\n'))
    return filter(lambda x: len(x) > 0, ret)


def main(is_link):
    text = os.environ['POPCLIP_TEXT']
    urls = get_lines('POPCLIP_URLS')
    url_titles = get_lines('POPCLIP_URL_TITLES')
    if is_link:
        title = url_titles[0] if url_titles else text
        data = {'url':  urls[0] if urls else '', 'title': title}
        typ = 'link'
    else:
        data = {'title': '', 'body': text}
        typ = 'note'
    try:
        pushit(typ, data)
    except RuntimeError as e:
        print e.message
    except:
        print 'Unknow error.'
    else:
        print 'Push OK.'
