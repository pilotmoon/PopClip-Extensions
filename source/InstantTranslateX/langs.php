<?php
mb_internal_encoding('UTF-8');

// current languages list 2015-04-20
$dump= <<<END
{
 "data": {
  "languages": [
   {
    "language": "af",
    "name": "Afrikaans"
   },
   {
    "language": "sq",
    "name": "Albanian"
   },
   {
    "language": "ar",
    "name": "Arabic"
   },
   {
    "language": "hy",
    "name": "Armenian"
   },
   {
    "language": "az",
    "name": "Azerbaijani"
   },
   {
    "language": "eu",
    "name": "Basque"
   },
   {
    "language": "be",
    "name": "Belarusian"
   },
   {
    "language": "bn",
    "name": "Bengali"
   },
   {
    "language": "bs",
    "name": "Bosnian"
   },
   {
    "language": "bg",
    "name": "Bulgarian"
   },
   {
    "language": "ca",
    "name": "Catalan"
   },
   {
    "language": "ceb",
    "name": "Cebuano"
   },
   {
    "language": "ny",
    "name": "Chichewa"
   },
   {
    "language": "zh",
    "name": "Chinese (Simplified)"
   },
   {
    "language": "zh-TW",
    "name": "Chinese (Traditional)"
   },
   {
    "language": "hr",
    "name": "Croatian"
   },
   {
    "language": "cs",
    "name": "Czech"
   },
   {
    "language": "da",
    "name": "Danish"
   },
   {
    "language": "nl",
    "name": "Dutch"
   },
   {
    "language": "en",
    "name": "English"
   },
   {
    "language": "eo",
    "name": "Esperanto"
   },
   {
    "language": "et",
    "name": "Estonian"
   },
   {
    "language": "tl",
    "name": "Filipino"
   },
   {
    "language": "fi",
    "name": "Finnish"
   },
   {
    "language": "fr",
    "name": "French"
   },
   {
    "language": "gl",
    "name": "Galician"
   },
   {
    "language": "ka",
    "name": "Georgian"
   },
   {
    "language": "de",
    "name": "German"
   },
   {
    "language": "el",
    "name": "Greek"
   },
   {
    "language": "gu",
    "name": "Gujarati"
   },
   {
    "language": "ht",
    "name": "Haitian Creole"
   },
   {
    "language": "ha",
    "name": "Hausa"
   },
   {
    "language": "iw",
    "name": "Hebrew"
   },
   {
    "language": "hi",
    "name": "Hindi"
   },
   {
    "language": "hmn",
    "name": "Hmong"
   },
   {
    "language": "hu",
    "name": "Hungarian"
   },
   {
    "language": "is",
    "name": "Icelandic"
   },
   {
    "language": "ig",
    "name": "Igbo"
   },
   {
    "language": "id",
    "name": "Indonesian"
   },
   {
    "language": "ga",
    "name": "Irish"
   },
   {
    "language": "it",
    "name": "Italian"
   },
   {
    "language": "ja",
    "name": "Japanese"
   },
   {
    "language": "jw",
    "name": "Javanese"
   },
   {
    "language": "kn",
    "name": "Kannada"
   },
   {
    "language": "kk",
    "name": "Kazakh"
   },
   {
    "language": "km",
    "name": "Khmer"
   },
   {
    "language": "ko",
    "name": "Korean"
   },
   {
    "language": "lo",
    "name": "Lao"
   },
   {
    "language": "la",
    "name": "Latin"
   },
   {
    "language": "lv",
    "name": "Latvian"
   },
   {
    "language": "lt",
    "name": "Lithuanian"
   },
   {
    "language": "mk",
    "name": "Macedonian"
   },
   {
    "language": "mg",
    "name": "Malagasy"
   },
   {
    "language": "ms",
    "name": "Malay"
   },
   {
    "language": "ml",
    "name": "Malayalam"
   },
   {
    "language": "mt",
    "name": "Maltese"
   },
   {
    "language": "mi",
    "name": "Maori"
   },
   {
    "language": "mr",
    "name": "Marathi"
   },
   {
    "language": "mn",
    "name": "Mongolian"
   },
   {
    "language": "my",
    "name": "Myanmar (Burmese)"
   },
   {
    "language": "ne",
    "name": "Nepali"
   },
   {
    "language": "no",
    "name": "Norwegian"
   },
   {
    "language": "fa",
    "name": "Persian"
   },
   {
    "language": "pl",
    "name": "Polish"
   },
   {
    "language": "pt",
    "name": "Portuguese"
   },
   {
    "language": "pa",
    "name": "Punjabi"
   },
   {
    "language": "ro",
    "name": "Romanian"
   },
   {
    "language": "ru",
    "name": "Russian"
   },
   {
    "language": "sr",
    "name": "Serbian"
   },
   {
    "language": "st",
    "name": "Sesotho"
   },
   {
    "language": "si",
    "name": "Sinhala"
   },
   {
    "language": "sk",
    "name": "Slovak"
   },
   {
    "language": "sl",
    "name": "Slovenian"
   },
   {
    "language": "so",
    "name": "Somali"
   },
   {
    "language": "es",
    "name": "Spanish"
   },
   {
    "language": "su",
    "name": "Sundanese"
   },
   {
    "language": "sw",
    "name": "Swahili"
   },
   {
    "language": "sv",
    "name": "Swedish"
   },
   {
    "language": "tg",
    "name": "Tajik"
   },
   {
    "language": "ta",
    "name": "Tamil"
   },
   {
    "language": "te",
    "name": "Telugu"
   },
   {
    "language": "th",
    "name": "Thai"
   },
   {
    "language": "tr",
    "name": "Turkish"
   },
   {
    "language": "uk",
    "name": "Ukrainian"
   },
   {
    "language": "ur",
    "name": "Urdu"
   },
   {
    "language": "uz",
    "name": "Uzbek"
   },
   {
    "language": "vi",
    "name": "Vietnamese"
   },
   {
    "language": "cy",
    "name": "Welsh"
   },
   {
    "language": "yi",
    "name": "Yiddish"
   },
   {
    "language": "yo",
    "name": "Yoruba"
   },
   {
    "language": "zu",
    "name": "Zulu"
   }
  ]
 }
}
END;

foreach(json_decode($dump, TRUE)['data']['languages'] as $pair) {
  echo '  "' .$pair['name'].'"=>"'.$pair['language'].'",'."\n";
}

foreach(json_decode($dump, TRUE)['data']['languages'] as $pair) {
  echo '<string>'.$pair['name'].'</string>'."\n";
}