#!/usr/bin/env python
# ----------------------------------------------------------------------------
# "THE BEER-WARE LICENSE" (Revision 42):
# <terry.yinzhe@gmail.com> wrote this file. As long as you retain this notice you
# can do whatever you want with this stuff. If we meet some day, and you think
# this stuff is worth it, you can buy me a beer in return to Terry Yin.
#
# The idea of this is borrowed from <mort.yao@gmail.com>'s brilliant work
#    https://github.com/soimort/google-translate-cli
# He uses "THE BEER-WARE LICENSE". That's why I use it too. So you can buy him a 
# beer too.
# ----------------------------------------------------------------------------
'''
This is a simple, yet powerful command line translator with google translate
behind it. You can also use it as a Python module in your code.
'''
import re
try:
    import urllib2 as request
    from urllib import quote
except:
    from urllib import request
    from urllib.parse import quote

class Translator:
    string_pattern = r"\"(([^\"\\]|\\.)*)\""
    match_string =re.compile(
                        r"\,?\[" 
                           + string_pattern + r"\," 
                           + string_pattern + r"\," 
                           + string_pattern + r"\," 
                           + string_pattern
                        +r"\]")

    def __init__(self, to_lang, from_lang='auto'):
        self.from_lang = from_lang
        self.to_lang = to_lang
   
    def translate(self, source):
        json5 = self._get_json5_from_google(source)
        return self._unescape(self._get_translation_from_json5(json5))

    def _get_translation_from_json5(self, content):
        result = ""
        pos = 2
        while True:
            m = self.match_string.match(content, pos)
            if not m:
                break
            result += m.group(1)
            pos = m.end()
        return result 

    def _get_json5_from_google(self, source):
        escaped_source = quote(source, '')
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.168 Safari/535.19'}
        req = request.Request(
             url="http://translate.google.com/translate_a/t?client=t&ie=UTF-8&oe=UTF-8"
                 +"&sl=%s&tl=%s&text=%s" % (self.from_lang, self.to_lang, escaped_source)
                 , headers = headers)
        r = request.urlopen(req)
        return r.read().decode('utf-8')

    def _unescape(self, text):
        return re.sub(r"\\.?", lambda x:eval('"%s"'%x.group(0)), text)

def main():
    import argparse
    import sys
    import locale
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('texts', metavar='text', nargs='+',
                   help='a string to translate(use "" when it\'s a sentence)')
    parser.add_argument('-t', '--to', dest='to_lang', type=str, default='zh',
                   help='To language (e.g. zh, zh-TW, en, ja, ko). Default is zh.')
    parser.add_argument('-f', '--from', dest='from_lang', type=str, default='auto',
                   help='From language (e.g. zh, zh-TW, en, ja, ko). Default is auto.')
    args = parser.parse_args()
    translator= Translator(from_lang=args.from_lang, to_lang=args.to_lang)
    for text in args.texts:
        translation = translator.translate(text)
        if sys.version_info.major == 2:
            translation =translation.encode(locale.getpreferredencoding())
        sys.stdout.write(translation)
        sys.stdout.write("\n")

if __name__ == "__main__":
    main()
