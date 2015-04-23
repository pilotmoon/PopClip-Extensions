# extension identifier and name
EXTENSION_ID='com.pilotmoon.popclip.extension.trello'
EXTENSION_NAME='Trello';

# app name for display to user
APP_NAME='PopClip Extension "' + EXTENSION_NAME + '"';

# our callback url
CALLBACK = 'http://reqr.net/callback/popclip?callback_ext_id=' + EXTENSION_ID + '&callback_ext_name=' + EXTENSION_NAME

# data for authorization redirect
AUTHORIZE_DATA = {    
    'oauth_callback': CALLBACK,
    'name': APP_NAME,
    'expiration': 'never',
    'scope': 'read,write'
}

# trello endpoints
ENDPOINT_REQUEST = 'https://trello.com/1/OAuthGetRequestToken'
ENDPOINT_AUTHORIZE = 'https://trello.com/1/OAuthAuthorizeToken'
ENDPOINT_ACCESS = 'https://trello.com/1/OAuthGetAccessToken'
ENDPOINT_BASE = 'https://trello.com/'

# trello access
CONSUMER_DATA = 'WyI5NzY1NDgzYzI1MzIwYTQ0YjRmMDQyZjIzNjViOGYzOSIsICJmZGJlYWQ1MTI2NWJkZDIxNDk0ZmQwYTEyN2ZiZWJjNzI5ZGNmYzgyMzA2MzQ0YzJmZTg1YzI4N2E4MTBlZTM3Il0='
