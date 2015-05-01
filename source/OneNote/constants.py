# encoding: utf8

import base64, json, urllib

# extension identifier and name
EXTENSION_ID = 'com.pilotmoon.popclip.extension.onenote'
EXTENSION_NAME = 'OneNote';

# app name for display to user
APP_NAME = 'PopClip Extension “' + EXTENSION_NAME + '”';

# our callback url & params
EXPECT_PARAMS = base64.urlsafe_b64encode(json.dumps({
    'q': ['code']
}))
CALLBACK_DATA = {
    'callback_ext_id': EXTENSION_ID,
    'callback_ext_name': EXTENSION_NAME,
    'callback_expect': EXPECT_PARAMS
}
CALLBACK = 'https://pilotmoon.com/popclip_extension_callback?' + urllib.urlencode(CALLBACK_DATA)

# data for authorization redirect
AUTHORIZE_DATA = {    
    'redirect_uri': CALLBACK,
    'response_type': 'code',
    'scope': 'office.onenote_create wl.offline_access'
}

# endpoints
ENDPOINT_ACCESS = 'https://login.live.com/oauth20_token.srf'
ENDPOINT_AUTHORIZE = 'https://login.live.com/oauth20_authorize.srf'
ENDPOINT_BASE = 'https://www.onenote.com/api/v1.0/'

# client
CLIENT_DATA = 'WyIwMDAwMDAwMDQ4MTU0OEJGIiwgIlVETWlud0hiUWpBRDAtTzk4Rmc5U3lLQi10MWJUa2FpIl0='