import urllib
import urllib2
import json
import os

inputphrase = os.environ['POPCLIP_TEXT']
terms = urllib.quote_plus(inputphrase.strip())
url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&filter=1&rsz=small&q=" + terms
data = urllib2.urlopen(url).read()
output =  "[" + inputphrase + "](" + json.loads(data)["responseData"]["results"][0]["unescapedUrl"] + ")"
print output

# Clover designed by [Pavel Nikandrov from The Noun Project](http://thenounproject.com/pavel.nikandrov/#)