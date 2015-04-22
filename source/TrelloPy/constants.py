# extension identifier and name
EXTENSION_ID='com.pilotmoon.popclip.extension.trello'
EXTENSION_NAME='Trello';

# app name for display to user
APP_NAME='PopClip Extension "' + EXTENSION_NAME + '"';

# callback url
CALLBACK = 'http://reqr.net/callback/popclip?callback_ext_id=' + EXTENSION_ID + '&callback_ext_name=' + EXTENSION_NAME

# data for authorization redirect
AUTHORIZE_DATA = {    
    'oauth_callback': CALLBACK,
    'name': APP_NAME,
    'expiration': 'never',
    'scope': 'read,write'
}

# trell endpoints
ENDPOINT_REQUEST = 'https://trello.com/1/OAuthGetRequestToken'
ENDPOINT_AUTHORIZE = 'https://trello.com/1/OAuthAuthorizeToken'
ENDPOINT_ACCESS = 'https://trello.com/1/OAuthGetAccessToken'
ENDPOINT_BASE = 'https://trello.com/1/'

# access keys
ACCESS_DATA = 'Y2s9OTc2NTQ4M2MyNTMyMGE0NGI0ZjA0MmYyMzY1YjhmMzkmY3M9ZmRiZWFkNTEyNjViZGQyMTQ5NGZkMGExMjdmYmViYzcyOWRjZmM4MjMwNjM0NGMyZmU4NWMyODdhODEwZWUzNw=='
