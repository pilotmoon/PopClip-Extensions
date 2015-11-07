import urllib
import urllib2
import json
import os
import sys

url = os.environ['POPCLIP_TEXT']
serviceDomain = os.environ['POPCLIP_OPTION_DOMAIN']

api = {
	'is.gd' : 'http://is.gd/create.php?format=json&logstats=1&url=',  
	'v.gd' : 'http://v.gd/create.php?format=json&logstats=1&url='
}

def getLink(service,url):
    terms = urllib.quote_plus(url.strip())
    url = service + terms
    data = urllib2.urlopen(url).read()
    return data

if (('http' in url) == False):
    url = 'http://'+url

service = api[serviceDomain]
if serviceDomain == 'is.gd':
    output = json.loads(getLink(service,url))["shorturl"]
elif serviceDomain == 'v.gd':
    output = json.loads(getLink(service,url))["shorturl"]

if (output != ''):
    sys.stdout.write(output) 
    sys.exit(0)
else:
    sys.exit(1)