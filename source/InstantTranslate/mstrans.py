import requests

class Translator(object):

    def __init__(self, client_id, client_secret):
        self.auth_token = self.__get_authentication_token(client_id=client_id, client_secret=client_secret)

    def __get_authentication_token(self, client_id, client_secret):
        auth_args = {
            'client_id': client_id,
            'client_secret': client_secret,
            'scope': 'http://api.microsofttranslator.com',
            'grant_type': 'client_credentials'
        }        
        return requests.post('https://datamarket.accesscontrol.windows.net/v2/OAuth2-13', data=auth_args).json()        

    def translate_text(self, text, from_lang, to_lang):
        translate_args = {
            'text': text,            
            'from': from_lang,
            'to': to_lang
        }
        auth_headers = {
            'Authorization': 'Bearer ' + self.auth_token['access_token']
        }
        r = requests.get('http://api.microsofttranslator.com/V2/Ajax.svc/Translate', params=translate_args, headers=auth_headers)    
        r.encoding = 'utf-8-sig'
        return r.json()