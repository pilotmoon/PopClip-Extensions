<?php
mb_internal_encoding("UTF-8");

// updated 2015-04-20
$lang_codes = array(
  "Afrikaans"=>"af",
  "Albanian"=>"sq",
  "Arabic"=>"ar",
  "Armenian"=>"hy",
  "Azerbaijani"=>"az",
  "Basque"=>"eu",
  "Belarusian"=>"be",
  "Bengali"=>"bn",
  "Bosnian"=>"bs",
  "Bulgarian"=>"bg",
  "Catalan"=>"ca",
  "Cebuano"=>"ceb",
  "Chichewa"=>"ny",
  "Chinese (Simplified)"=>"zh",
  "Chinese (Traditional)"=>"zh-TW",
  "Croatian"=>"hr",
  "Czech"=>"cs",
  "Danish"=>"da",
  "Dutch"=>"nl",
  "English"=>"en",
  "Esperanto"=>"eo",
  "Estonian"=>"et",
  "Filipino"=>"tl",
  "Finnish"=>"fi",
  "French"=>"fr",
  "Galician"=>"gl",
  "Georgian"=>"ka",
  "German"=>"de",
  "Greek"=>"el",
  "Gujarati"=>"gu",
  "Haitian Creole"=>"ht",
  "Hausa"=>"ha",
  "Hebrew"=>"iw",
  "Hindi"=>"hi",
  "Hmong"=>"hmn",
  "Hungarian"=>"hu",
  "Icelandic"=>"is",
  "Igbo"=>"ig",
  "Indonesian"=>"id",
  "Irish"=>"ga",
  "Italian"=>"it",
  "Japanese"=>"ja",
  "Javanese"=>"jw",
  "Kannada"=>"kn",
  "Kazakh"=>"kk",
  "Khmer"=>"km",
  "Korean"=>"ko",
  "Lao"=>"lo",
  "Latin"=>"la",
  "Latvian"=>"lv",
  "Lithuanian"=>"lt",
  "Macedonian"=>"mk",
  "Malagasy"=>"mg",
  "Malay"=>"ms",
  "Malayalam"=>"ml",
  "Maltese"=>"mt",
  "Maori"=>"mi",
  "Marathi"=>"mr",
  "Mongolian"=>"mn",
  "Myanmar (Burmese)"=>"my",
  "Nepali"=>"ne",
  "Norwegian"=>"no",
  "Persian"=>"fa",
  "Polish"=>"pl",
  "Portuguese"=>"pt",
  "Punjabi"=>"pa",
  "Romanian"=>"ro",
  "Russian"=>"ru",
  "Serbian"=>"sr",
  "Sesotho"=>"st",
  "Sinhala"=>"si",
  "Slovak"=>"sk",
  "Slovenian"=>"sl",
  "Somali"=>"so",
  "Spanish"=>"es",
  "Sundanese"=>"su",
  "Swahili"=>"sw",
  "Swedish"=>"sv",
  "Tajik"=>"tg",
  "Tamil"=>"ta",
  "Telugu"=>"te",
  "Thai"=>"th",
  "Turkish"=>"tr",
  "Ukrainian"=>"uk",
  "Urdu"=>"ur",
  "Uzbek"=>"uz",
  "Vietnamese"=>"vi",
  "Welsh"=>"cy",
  "Yiddish"=>"yi",
  "Yoruba"=>"yo",
  "Zulu"=>"zu",
);

// the text to translate
$text=getenv('POPCLIP_TEXT');
$text=$text?$text:"le chat";

// the destination language
$destlang=getenv('POPCLIP_OPTION_DESTLANG');
$destlang=$destlang?$destlang:"German";
$target=$lang_codes[$destlang];

// build call url
$query=http_build_query(array(
  'text'=>$text,
  'target'=>$target,
  'sig'=>hash('sha256', "$text+$target+please_do_not_steal_my_api_credits")
  ));
$url='https://api.pilotmoon.dev/for_popclip_extensions_only/translate/v1?'.$query;

// get translation
$response=json_decode(file_get_contents($url), TRUE);

// hooray
if (array_key_exists('result', $response)) {
	echo $response['result'];
	exit(0);
}

// show error to user to help in support requests
if (array_key_exists('error', $response)) {
	echo 'Error: ' . $response['error'];	
  exit(0);  
}

// other error
exit(1);




