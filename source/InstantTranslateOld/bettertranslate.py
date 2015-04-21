#coding=utf-8
import os
import re
import time
import urllib, urllib2
from tempfile import NamedTemporaryFile
from translate import Translator

LANG_CODES = {
        "Afrikaans":"af",
        "Albanian":"sq",
        "Arabic":"ar",
        "Armenian":"hy",
        "Azerbaijani":"az",
        "Basque":"eu",
        "Belarusian":"be",
        "Bengali":"bn",
        "Bosnian":"bs",
        "Bulgarian":"bg",
        "Catalan":"ca",
        "Cebuano":"ceb",
        "Chinese (Simplified)":"zh-CN",
        "Chinese (Traditional)":"zh-TW",
        "Croatian":"hr",
        "Czech":"cs",
        "Danish":"da",
        "Dutch":"nl",
        "English":"en",
        "Esperanto":"eo",
        "Estonian":"et",
        "Filipino":"tl",
        "Finnish":"fi",
        "French":"fr",
        "Galician":"gl",
        "Georgian":"ka",
        "German":"de",
        "Greek":"el",
        "Gujarati":"gu",
        "Haitian Creole":"ht",
        "Hausa":"ha",
        "Hebrew":"iw",
        "Hindi":"hi",
        "Hmong":"hmn",
        "Hungarian":"hu",
        "Icelandic":"is",
        "Igbo":"ig",
        "Indonesian":"id",
        "Irish":"ga",
        "Italian":"it",
        "Japanese":"ja",
        "Javanese":"jw",
        "Kannada":"kn",
        "Khmer":"km",
        "Korean":"ko",
        "Lao":"lo",
        "Latin":"la",
        "Latvian":"lv",
        "Lithuanian":"lt",
        "Macedonian":"mk",
        "Malay":"ms",
        "Maltese":"mt",
        "Maori":"mi",
        "Marathi":"mr",
        "Mongolian":"mn",
        "Nepali":"ne",
        "Norwegian":"no",
        "Persian":"fa",
        "Polish":"pl",
        "Portuguese":"pt",
        "Punjabi":"pa",
        "Romanian":"ro",
        "Russian":"ru",
        "Serbian":"sr",
        "Slovak":"sk",
        "Slovenian":"sl",
        "Somali":"so",
        "Spanish":"es",
        "Swahili":"sw",
        "Swedish":"sv",
        "Tamil":"ta",
        "Telugu":"te",
        "Thai":"th",
        "Turkish":"tr",
        "Ukrainian":"uk",
        "Urdu":"ur",
        "Vietnamese":"vi",
        "Welsh":"cy",
        "Yiddish":"yi",
        "Yoruba":"yo",
        "Zulu":"zu"
        }

selectedText= os.environ['POPCLIP_TEXT']
destLang = os.environ['POPCLIP_OPTION_DESTLANG']

from translate import Translator
translator= Translator(to_lang=LANG_CODES[destLang])
translation = translator.translate(selectedText)

result = translation.encode('utf-8')

print result