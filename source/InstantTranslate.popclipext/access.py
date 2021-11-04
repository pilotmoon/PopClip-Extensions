import requests, random, base64, json

"""
Get access credentials from pilotmoon server. This allows replacing the access key in future if needed,
without users having to release an update to the extension. 

Returns tuple of (id, secret).
"""
def get_credentials():    
    return _extract(requests.get('http://api.pilotmoon.com/pcx/instant-translate/access').text)        

def _extract(raw):
    c = random.choice(json.loads(base64.b64decode(raw))['azure'])
    return c['key'];

