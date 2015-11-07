# coding=utf-8

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

import os, access, mstrans

c = access.get_credentials()
translator = mstrans.Translator(client_id=c[0], client_secret=c[1])
translation = translator.translate_text(text=os.environ['POPCLIP_TEXT'],
                                        from_lang='',
                                        to_lang=LANG_CODES[os.environ['POPCLIP_OPTION_DESTLANG']])

print translation.encode('utf-8')