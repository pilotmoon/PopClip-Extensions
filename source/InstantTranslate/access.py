import requests, random, base64, json

"""
Get access credentials from pilotmoon server. This allows replacing the access key in future if needed,
without users having to release an update to the extension. 

Returns tuple of (id, secret).
"""
def get_credentials():    
    try:        
        return _extract(requests.get('http://api.pilotmoon.com/pcx/instant-translate/access').text)        
    except:
        return _extract(open('fallback', 'r').read())

def _extract(raw):
    c = random.choice(json.loads(base64.b64decode(raw))['msft'])
    return (c['key'], c['secret'])

