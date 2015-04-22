import constants

def get_credentials():
    import urlparse, base64
    """ returns tuple of (consumer key, consumer secret) """
    c = urlparse.parse_qs(base64.b64decode(constants.ACCESS_DATA))    
    return (c['ck'][0], c['cs'][0])

def get_oauth_service():
    import rauth
    
    # get consumer credentials
    consumer_key, consumer_secret = get_credentials()    

    # set up oauth service
    return rauth.OAuth1Service(
        consumer_key=consumer_key,
        consumer_secret=consumer_secret,
        request_token_url=constants.ENDPOINT_REQUEST,
        access_token_url=constants.ENDPOINT_ACCESS,
        authorize_url=constants.ENDPOINT_AUTHORIZE,
        base_url=constants.ENDPOINT_BASE)
