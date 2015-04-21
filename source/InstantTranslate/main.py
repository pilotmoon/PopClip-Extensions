# coding=utf-8
import re
import os
from ms_translate import TranslatorClient

LANG_CODES = {
    "Arabic": "ar",
    "Bosnian (Latin)": "bs-Latn",
    "Bulgarian": "bg",
    "Catalan": "ca",
    "Chinese Simplified": "zh-CHS",
    "Chinese Traditional": "zh-CHT",
    "Croatian": "hr",
    "Czech": "cs",
    "Danish": "da",
    "Dutch": "nl",
    "English": "en",
    "Estonian": "et",
    "Finnish": "fi",
    "French": "fr",
    "German": "de",
    "Greek": "el",
    "Haitian Creole": "ht",
    "Hebrew": "he",
    "Hindi": "hi",
    "Hmong Daw": "mww",
    "Hungarian": "hu",
    "Indonesian": "id",
    "Italian": "it",
    "Japanese": "ja",
    "Klingon": "tlh",
    "Klingon (pIqaD)": "tlh-Qaak",
    "Korean": "ko",
    "Latvian": "lv",
    "Lithuanian": "lt",
    "Malay": "ms",
    "Maltese": "mt",
    "Norwegian": "no",
    "Persian": "fa",
    "Polish": "pl",
    "Portuguese": "pt",
    "Querétaro Otomi": "otq",
    "Romanian": "ro",
    "Russian": "ru",
    "Serbian (Cyrillic)": "sr-Cyrl",
    "Serbian (Latin)": "sr-Latn",
    "Slovak": "sk",
    "Slovenian": "sl",
    "Spanish": "es",
    "Swedish": "sv",
    "Thai": "th",
    "Turkish": "tr",
    "Ukrainian": "uk",
    "Urdu": "ur",
    "Vietnamese": "vi",
    "Welsh": "cy",
    "Yucatec Maya": "yua"
}

selectedText = os.environ['POPCLIP_TEXT']
destLang = os.environ['POPCLIP_OPTION_DESTLANG']

from ms_translate import TranslatorClient

translator = TranslatorClient()
translation = translator.translate_text(unicode_string=selectedText,
                                        from_lang_code='',
                                        to_lang_code=LANG_CODES[destLang])

print translation.encode('utf-8')