import urllib
import urllib2
import json
import os
import sys

inputphrase = os.environ['POPCLIP_TEXT']
markdown=os.environ['POPCLIP_OPTION_STYLE'][:1]=='M'

terms = urllib.quote_plus(inputphrase.strip())
url = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&filter=1&rsz=small&q=" + terms
data = urllib2.urlopen(url).read()
link = json.loads(data)["responseData"]["results"][0]["unescapedUrl"];
if markdown:
	output =  "[" + inputphrase + "](" + link + ")"
else:
	output =  link
sys.stdout.write(output)

# Clover designed by [Pavel Nikandrov from The Noun Project](http://thenounproject.com/pavel.nikandrov/#)