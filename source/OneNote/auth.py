from __future__ import print_function
import constants, rauth, subprocess, os, json, base64, urlparse

""" 
Auth module for OneNote.
Our strategy is to store only the refresh token and use it every time to get a new access token.
"""

def get_oauth_service():
    client_id, client_secret = json.loads(base64.b64decode(constants.CLIENT_DATA)) 
    return rauth.OAuth2Service(
        client_id=client_id,
        client_secret=client_secret,        
        access_token_url=constants.ENDPOINT_ACCESS,
        authorize_url=constants.ENDPOINT_AUTHORIZE,
        base_url=constants.ENDPOINT_BASE)

def get_session(stored_refresh_token):    
    """ called in main extension script to actually get a usable session """
    service = get_oauth_service()
    r = service.get_raw_access_token(data={
        'refresh_token': stored_refresh_token,
        'grant_type': 'refresh_token'
        })
    return service.get_session(r.json()['access_token'])         

def access(authorization_code):
    """ obtain the refresh token """
    return get_oauth_service().get_raw_access_token(data={
        'code': authorization_code,
        'grant_type': 'authorization_code',
        'redirect_uri': constants.CALLBACK
        }).json()['refresh_token']

def authorize():
    """ send user to the oauth autorization url in their browser """
    subprocess.call(['open', get_oauth_service().get_authorize_url(**constants.AUTHORIZE_DATA)])

def main(callback_final=None):
    """ this is called once (with no params) when the user clicks 'log in',
    and again (with params) when they click though the callback landing url """
    if (callback_final):        
        print(json.dumps(access(urlparse.parse_qs(callback_final)['code'])), end='')
    else:
        print(json.dumps(authorize()), end='')
        exit(4) # indicates to PopClip that a callback will follow

if __name__ == '__main__':
    main(os.getenv('POPCLIP_AUTH_CALLBACK_FINAL'))
