# derived from translate.py by terry yin zhe, which is a similar script based on google translate.

import datetime
import json
import urllib
import urllib2

SCOPE_URL = 'http://api.microsofttranslator.com'
OAUTH_URL = 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13'
AZURE_TRANSLATE_API_URL = 'http://api.microsofttranslator.com/V2/Ajax.svc/Translate?%s'
GRANT_CLIENT_CREDENTIALS_ONLY = 'client_credentials'

class TranslatorClient(object):

    def __init__(self, client_id = 'popclip-instant-translate', client_secret = '5wHLpMlqxozY953E1qfwFFSWvi0vJyhsmdTbiq62Xw4='):
        self.client_id = client_id
        self.client_secret = client_secret
        self.last_auth_token_refresh = None
        self.auth_token = self.__GetAuthenticationToken()

    def __GetAuthenticationToken(self):
        """Gets the authentication token for your app from azure marketplace."""
        auth_args = {
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'scope': SCOPE_URL,
            'grant_type': GRANT_CLIENT_CREDENTIALS_ONLY
        }
        self.auth_token = json.loads(urllib2.urlopen(OAUTH_URL, data=urllib.urlencode(auth_args)).read())
        if self.auth_token:
            self.last_auth_token_refresh = datetime.datetime.now()
            return self.auth_token
        else:
            return None

    def translate_text(self, unicode_string, from_lang_code, to_lang_code):
        translate_packet = {
            'text': unicode_string,
            'to': to_lang_code,
            'from': from_lang_code
        }
        headers = {
            'Authorization': 'Bearer ' + self.auth_token['access_token']
        }
        translate_req = urllib2.Request(AZURE_TRANSLATE_API_URL % urllib.urlencode(translate_packet),
                                        headers=headers)
        response = urllib2.urlopen(translate_req).read()
        return json.loads(response.decode("utf-8-sig")) # remove BOM and interpret json encoding

def main():
    import argparse
    import sys
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('-s', dest='text', type=str,
                        help='a string to translate(use "" when it\'s a sentence)')
    parser.add_argument('-t', '--to', dest='to_lang', type=str, default='zh-CHS',
                        help='To language (e.g. zh-CHS, zh-CHT, en, ja, ko). Default is zh-CHS.')
    parser.add_argument('-f', '--from', dest='from_lang', type=str, default='',
                        help='From language (e.g. zh-CHS, zh-CHT, en, ja, ko). Default is auto.')
    args = parser.parse_args()

    translator = TranslatorClient()
    translation = translator.translate_text(unicode_string=args.text,
                                            from_lang_code=args.from_lang,
                                            to_lang_code=args.to_lang)
    sys.stdout.write(translation)
    sys.stdout.write("\n")

if __name__ == "__main__":
    main()