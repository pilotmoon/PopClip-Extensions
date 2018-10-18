import requests

class Translator(object):

    def __init__(self, key):
        self.auth_token = self.__get_authentication_token(key=key)

    def __get_authentication_token(self, key):
        params = {
            'Subscription-Key': key,
        }   
        r = requests.post('https://api.cognitive.microsoft.com/sts/v1.0/issueToken', params=params)
        if r.status_code == requests.codes.ok:
            return r.text
        else:
            raise Exception('Failed to obtain token')

    def translate_text(self, text, from_lang, to_lang):
        translate_args = {
           'text': text,            
           'from': from_lang,
           'to': to_lang
        }
        auth_headers = {
           'Authorization': 'Bearer ' + self.auth_token
        }
        r = requests.get('http://api.microsofttranslator.com/V2/Ajax.svc/Translate', params=translate_args, headers=auth_headers)

        if r.status_code == requests.codes.ok:
            r.encoding = 'utf-8-sig'
            return r.json()
        else:
            raise Exception('Failed to obtain translation')