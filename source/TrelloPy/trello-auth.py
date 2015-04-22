import common, constants, rauth, subprocess, os, json, base64, urlparse

def authorize():
    trello = common.get_oauth_service()        
    request_token, request_token_secret = trello.get_request_token()
    subprocess.call(['open', trello.get_authorize_url(request_token, **constants.AUTHORIZE_DATA)])
    return (request_token, request_token_secret)

def access(request_token, request_token_secret, verifier):
    return common.get_oauth_service().get_access_token(request_token, request_token_secret, data={'oauth_verifier': verifier})

def main(callback_inter=None, callback_final=None):
    if (callback_inter and callback_final):        
        request_token, request_token_secret = json.loads(callback_inter)
        verifier = urlparse.parse_qs(callback_final)['oauth_verifier']
        print json.dumps(access(request_token, request_token_secret, verifier))
    else:
        print json.dumps(authorize())

main(os.getenv('POPCLIP_AUTH_CALLBACK_INTERMEDIATE'), os.getenv('POPCLIP_AUTH_CALLBACK_FINAL'))
