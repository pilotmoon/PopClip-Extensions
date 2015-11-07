from __future__ import print_function
import constants, rauth, subprocess, os, json, base64, urlparse

def get_oauth_service():
    consumer_key, consumer_secret = json.loads(base64.b64decode(constants.CONSUMER_DATA)) 
    return rauth.OAuth1Service(
        consumer_key=consumer_key,
        consumer_secret=consumer_secret,
        request_token_url=constants.ENDPOINT_REQUEST,
        access_token_url=constants.ENDPOINT_ACCESS,
        authorize_url=constants.ENDPOINT_AUTHORIZE,
        base_url=constants.ENDPOINT_BASE)

def get_session(stored_access_token):    
    """ called in main extension script to actually get a usable session """
    return get_oauth_service().get_session(json.loads(stored_access_token))         

def authorize():
    """ obtain and return the request token, and send user to the oauth autorization url in their browser """
    service = get_oauth_service()        
    request_token, request_token_secret = service.get_request_token()
    subprocess.call(['open', service.get_authorize_url(request_token,**constants.AUTHORIZE_DATA)])
    return (request_token, request_token_secret)

def access(request_token, request_token_secret, verifier):
    """ obtain the access token """
    return get_oauth_service().get_access_token(request_token, request_token_secret, data={'oauth_verifier': verifier})

def main(callback_inter=None, callback_final=None):
    """ this is called once (with no params) when the user clicks 'log in',
    and again (with params) when they click though the callback landing url """
    if (callback_inter and callback_final):        
        request_token, request_token_secret = json.loads(callback_inter)
        verifier = urlparse.parse_qs(callback_final)['oauth_verifier']
        print(json.dumps(access(request_token, request_token_secret, verifier)), end='')
    else:
        print(json.dumps(authorize()), end='')
        exit(4) # indicates to PopClip that a callback will follow

if __name__ == '__main__':
    main(os.getenv('POPCLIP_AUTH_CALLBACK_INTERMEDIATE'), os.getenv('POPCLIP_AUTH_CALLBACK_FINAL'))    
