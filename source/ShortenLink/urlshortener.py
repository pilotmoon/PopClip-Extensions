import urllib
import urllib2
import json
import os
import sys

url = os.environ['POPCLIP_TEXT']
serviceDomain = os.environ['POPCLIP_OPTION_DOMAIN']

api = {
    # Removed the services needing authentication, due to possible privacy issues.
    # Eventuall I would like to enable users to log into their own shortener accounts.
	#'bit.ly' : 'https://api-ssl.bitly.com/v3/shorten?format=json&login=xxx&apiKey=yyy&longUrl=',
	#'j.mp' : 'http://api.j.mp/v3//shorten?format=json&login=xxx&apiKey=yyy&longUrl=',
	#'t.cn' : 'https://api.weibo.com/2/short_url/shorten.json?access_token=yyy&url_long=',
	'goo.gl' : 'https://www.googleapis.com/urlshortener/v1/url',
	'is.gd' : 'http://is.gd/create.php?format=json&logstats=1&url=',  
	'v.gd' : 'http://v.gd/create.php?format=json&logstats=1&url='
#	'tiny.cc' : 'http://tiny.cc/?c=rest_api&m=shorten&version=2.0.3&format=json&shortUrl=&login=xxx&apiKey=yyy&longUrl='
}

def getLink(service,url):
    terms = urllib.quote_plus(url.strip())
    url = service + terms
    data = urllib2.urlopen(url).read()
    return data

if (('http' in url) == False):
    url = 'http://'+url

service = api[serviceDomain]
#if serviceDomain == 'bit.ly':
#    output = json.loads(getLink(service,url))["data"]["url"]
#elif serviceDomain == 'j.mp':
#    output = json.loads(getLink(service,url))["data"]["url"]
#elif serviceDomain == 't.cn':    
#    output = json.loads(getLink(service,url))["urls"][0]["url_short"]
if serviceDomain == 'goo.gl':
    terms = urllib.quote_plus(url.strip())
    data = json.dumps({"longUrl": url})
    clen = len(data)
    req = urllib2.Request(service,data,{'Content-Type': 'application/json', 'Content-Length': clen})
    f = urllib2.urlopen(req)
    data = f.read()
    output = json.loads(data)["id"]
elif serviceDomain == 'is.gd':
    output = json.loads(getLink(service,url))["shorturl"]
elif serviceDomain == 'v.gd':
    output = json.loads(getLink(service,url))["shorturl"]
#elif serviceDomain == 'tiny.cc':
#    output = json.loads(getLink(service,url))["results"]["short_url"]

if (output != ''):
    sys.stdout.write(output) 
    sys.exit(0)
else:
    sys.exit(1)