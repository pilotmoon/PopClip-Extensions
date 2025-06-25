# Say

PopClip extension to speak the text aloud using the Mac's built-in
text-to-speech.

Under the hood, the extension uses the `say` command, which is included with
macOS

## Usage

Simply select the text and click the Say action in PopClip. To cancel speaking,
click the "spinner" in the PopClip bar.

## Settings

Both settings can be left blank to use the current selected default voice and
rate. The defaults are set in System Settings → Accessibility → Spoken Content.

### Voice

To override the system default voice, specify the name of the voice to use, for
example `Daniel`. (See voice list below.)

### Rate

To override the system default rate, specify the rate in words per minute, for
example `150`.

## Voice List

To get a list of voices installed on your macOS system, run the following
command in Terminal:

```
say -v '?'
```

This is the current list of voices on my macOS Sequoia system — yours may vary!

| Voice                                | Locale | Sample                                |
| ------------------------------------ | ------ | ------------------------------------- |
| `Albert`                             | en_US  | Hello! My name is Albert.             |
| `Alice`                              | it_IT  | Ciao! Mi chiamo Alice.                |
| `Alva`                               | sv_SE  | Hej! Jag heter Alva.                  |
| `Amélie`                             | fr_CA  | Bonjour! Je m'appelle Amélie.         |
| `Amira`                              | ms_MY  | Hi my name is Amira                   |
| `Anna`                               | de_DE  | Hallo! Ich heiße Anna.                |
| `Bad News`                           | en_US  | Hello! My name is Bad News.           |
| `Bahh`                               | en_US  | Hello! My name is Bahh.               |
| `Bells`                              | en_US  | Hello! My name is Bells.              |
| `Boing`                              | en_US  | Hello! My name is Boing.              |
| `Bubbles`                            | en_US  | Hello! My name is Bubbles.            |
| `Carmit`                             | he_IL  | שלום, שמי כרמית.                      |
| `Cellos`                             | en_US  | Hello! My name is Cellos.             |
| `Damayanti`                          | id_ID  | Halo! Nama saya Damayanti.            |
| `Daniel`                             | en_GB  | Hello! My name is Daniel.             |
| `Daniel (Enhanced)`                  | en_GB  | Hello! My name is Daniel.             |
| `Daria`                              | bg_BG  | Hello! My name is Daria.              |
| `Wobble`                             | en_US  | Hello! My name is Wobble.             |
| `Eddy (German (Germany))`            | de_DE  | Hallo! Ich heiße Eddy.                |
| `Eddy (English (UK))`                | en_GB  | Hello! My name is Eddy.               |
| `Eddy (English (US))`                | en_US  | Hello! My name is Eddy.               |
| `Eddy (Spanish (Spain))`             | es_ES  | ¡Hola! Me llamo Eddy.                 |
| `Eddy (Spanish (Mexico))`            | es_MX  | ¡Hola! Me llamo Eddy.                 |
| `Eddy (Finnish (Finland))`           | fi_FI  | Hei! Nimeni on Eddy.                  |
| `Eddy (French (Canada))`             | fr_CA  | Bonjour! Je m'appelle Eddy.           |
| `Eddy (French (France))`             | fr_FR  | Bonjour, je m'appelle Eddy.           |
| `Eddy (Italian (Italy))`             | it_IT  | Ciao! Mi chiamo Eddy.                 |
| `Eddy (Japanese (Japan))`            | ja_JP  | こんにちは! 私の名前はEddyです。      |
| `Eddy (Korean (South Korea))`        | ko_KR  | 안녕하세요. 제 이름은 Eddy입니다.     |
| `Eddy (Portuguese (Brazil))`         | pt_BR  | Olá, meu nome é Eddy.                 |
| `Eddy (Chinese (China mainland))`    | zh_CN  | 你好！我叫Eddy。                      |
| `Eddy (Chinese (Taiwan))`            | zh_TW  | 你好，我叫Eddy。                      |
| `Ellen`                              | nl_BE  | Hallo! Mijn naam is Ellen.            |
| `Flo (German (Germany))`             | de_DE  | Hallo! Ich heiße Flo.                 |
| `Flo (English (UK))`                 | en_GB  | Hello! My name is Flo.                |
| `Flo (English (US))`                 | en_US  | Hello! My name is Flo.                |
| `Flo (Spanish (Spain))`              | es_ES  | ¡Hola! Me llamo Flo.                  |
| `Flo (Spanish (Mexico))`             | es_MX  | ¡Hola! Me llamo Flo.                  |
| `Flo (Finnish (Finland))`            | fi_FI  | Hei! Nimeni on Flo.                   |
| `Flo (French (Canada))`              | fr_CA  | Bonjour! Je m'appelle Flo.            |
| `Flo (French (France))`              | fr_FR  | Bonjour, je m'appelle Flo.            |
| `Flo (Italian (Italy))`              | it_IT  | Ciao! Mi chiamo Flo.                  |
| `Flo (Japanese (Japan))`             | ja_JP  | こんにちは! 私の名前はFloです。       |
| `Flo (Korean (South Korea))`         | ko_KR  | 안녕하세요. 제 이름은 Flo입니다.      |
| `Flo (Portuguese (Brazil))`          | pt_BR  | Olá, meu nome é Flo.                  |
| `Flo (Chinese (China mainland))`     | zh_CN  | 你好！我叫Flo。                       |
| `Flo (Chinese (Taiwan))`             | zh_TW  | 你好，我叫Flo。                       |
| `Fred`                               | en_US  | Hello! My name is Fred.               |
| `Good News`                          | en_US  | Hello! My name is Good News.          |
| `Grandma (German (Germany))`         | de_DE  | Hallo! Ich heiße Grandma.             |
| `Grandma (English (UK))`             | en_GB  | Hello! My name is Grandma.            |
| `Grandma (English (US))`             | en_US  | Hello! My name is Grandma.            |
| `Grandma (Spanish (Spain))`          | es_ES  | ¡Hola! Me llamo Grandma.              |
| `Grandma (Spanish (Mexico))`         | es_MX  | ¡Hola! Me llamo Grandma.              |
| `Grandma (Finnish (Finland))`        | fi_FI  | Hei! Nimeni on Grandma.               |
| `Grandma (French (Canada))`          | fr_CA  | Bonjour! Je m'appelle Grandma.        |
| `Grandma (French (France))`          | fr_FR  | Bonjour, je m'appelle Grandma.        |
| `Grandma (Italian (Italy))`          | it_IT  | Ciao! Mi chiamo Grandma.              |
| `Grandma (Japanese (Japan))`         | ja_JP  | こんにちは! 私の名前はGrandmaです。   |
| `Grandma (Korean (South Korea))`     | ko_KR  | 안녕하세요. 제 이름은 Grandma입니다.  |
| `Grandma (Portuguese (Brazil))`      | pt_BR  | Olá, meu nome é Grandma.              |
| `Grandma (Chinese (China mainland))` | zh_CN  | 你好！我叫Grandma。                   |
| `Grandma (Chinese (Taiwan))`         | zh_TW  | 你好，我叫Grandma。                   |
| `Grandpa (German (Germany))`         | de_DE  | Hallo! Ich heiße Grandpa.             |
| `Grandpa (English (UK))`             | en_GB  | Hello! My name is Grandpa.            |
| `Grandpa (English (US))`             | en_US  | Hello! My name is Grandpa.            |
| `Grandpa (Spanish (Spain))`          | es_ES  | ¡Hola! Me llamo Grandpa.              |
| `Grandpa (Spanish (Mexico))`         | es_MX  | ¡Hola! Me llamo Grandpa.              |
| `Grandpa (Finnish (Finland))`        | fi_FI  | Hei! Nimeni on Grandpa.               |
| `Grandpa (French (Canada))`          | fr_CA  | Bonjour! Je m'appelle Grandpa.        |
| `Grandpa (French (France))`          | fr_FR  | Bonjour, je m'appelle Grandpa.        |
| `Grandpa (Italian (Italy))`          | it_IT  | Ciao! Mi chiamo Grandpa.              |
| `Grandpa (Japanese (Japan))`         | ja_JP  | こんにちは! 私の名前はGrandpaです。   |
| `Grandpa (Korean (South Korea))`     | ko_KR  | 안녕하세요. 제 이름은 Grandpa입니다.  |
| `Grandpa (Portuguese (Brazil))`      | pt_BR  | Olá, meu nome é Grandpa.              |
| `Grandpa (Chinese (China mainland))` | zh_CN  | 你好！我叫Grandpa。                   |
| `Grandpa (Chinese (Taiwan))`         | zh_TW  | 你好，我叫Grandpa。                   |
| `Jester`                             | en_US  | Hello! My name is Jester.             |
| `Ioana`                              | ro_RO  | Salut! Numele meu este Ioana.         |
| `Jacques`                            | fr_FR  | Bonjour, je m'appelle Jacques.        |
| `Joana`                              | pt_PT  | Olá! Chamo‑me Joana.                  |
| `Junior`                             | en_US  | Hello! My name is Junior.             |
| `Kanya`                              | th_TH  | สวัสดี! ฉันชื่อกันยา                  |
| `Karen`                              | en_AU  | Hi my name is Karen                   |
| `Kathy`                              | en_US  | Hello! My name is Kathy.              |
| `Kyoko`                              | ja_JP  | こんにちは! 私の名前はKyokoです。     |
| `Lana`                               | hr_HR  | Bok, zovem se Lana.                   |
| `Laura`                              | sk_SK  | Ahoj, volám sa Laura.                 |
| `Lekha`                              | hi_IN  | नमस्ते, मेरा नाम लेखा है।             |
| `Lesya`                              | uk_UA  | Привіт! Мене звуть Леся.              |
| `Linh`                               | vi_VN  | Xin chào! Tên tôi là Linh.            |
| `Luciana`                            | pt_BR  | Olá, meu nome é Luciana.              |
| `Majed`                              | ar_001 | مرحبًا! اسمي ماجد.                    |
| `Tünde`                              | hu_HU  | Üdvözlöm! A nevem Tünde.              |
| `Meijia`                             | zh_TW  | 你好，我叫美佳。                      |
| `Melina`                             | el_GR  | Χαίρετε! Το όνομά μου είναι «Μελίνα». |
| `Milena`                             | ru_RU  | Здравствуйте! Меня зовут Милена.      |
| `Moira`                              | en_IE  | Hello! My name is Moira.              |
| `Mónica`                             | es_ES  | ¡Hola! Me llamo Mónica.               |
| `Montse`                             | ca_ES  | Hola! Em dic Montse.                  |
| `Nora`                               | nb_NO  | Hei! Jeg heter Nora.                  |
| `Organ`                              | en_US  | Hello! My name is Organ.              |
| `Paulina`                            | es_MX  | ¡Hola! Me llamo Paulina.              |
| `Superstar`                          | en_US  | Hello! My name is Superstar.          |
| `Ralph`                              | en_US  | Hello! My name is Ralph.              |
| `Reed (German (Germany))`            | de_DE  | Hallo! Ich heiße Reed.                |
| `Reed (English (UK))`                | en_GB  | Hello! My name is Reed.               |
| `Reed (English (US))`                | en_US  | Hello! My name is Reed.               |
| `Reed (Spanish (Spain))`             | es_ES  | ¡Hola! Me llamo Reed.                 |
| `Reed (Spanish (Mexico))`            | es_MX  | ¡Hola! Me llamo Reed.                 |
| `Reed (Finnish (Finland))`           | fi_FI  | Hei! Nimeni on Reed.                  |
| `Reed (French (Canada))`             | fr_CA  | Bonjour! Je m'appelle Reed.           |
| `Reed (Italian (Italy))`             | it_IT  | Ciao! Mi chiamo Reed.                 |
| `Reed (Japanese (Japan))`            | ja_JP  | こんにちは! 私の名前はReedです。      |
| `Reed (Korean (South Korea))`        | ko_KR  | 안녕하세요. 제 이름은 Reed입니다.     |
| `Reed (Portuguese (Brazil))`         | pt_BR  | Olá, meu nome é Reed.                 |
| `Reed (Chinese (China mainland))`    | zh_CN  | 你好！我叫Reed。                      |
| `Reed (Chinese (Taiwan))`            | zh_TW  | 你好，我叫Reed。                      |
| `Rishi`                              | en_IN  | Hello! My name is Rishi.              |
| `Rocko (German (Germany))`           | de_DE  | Hallo! Ich heiße Rocko.               |
| `Rocko (English (UK))`               | en_GB  | Hello! My name is Rocko.              |
| `Rocko (English (US))`               | en_US  | Hello! My name is Rocko.              |
| `Rocko (Spanish (Spain))`            | es_ES  | ¡Hola! Me llamo Rocko.                |
| `Rocko (Spanish (Mexico))`           | es_MX  | ¡Hola! Me llamo Rocko.                |
| `Rocko (Finnish (Finland))`          | fi_FI  | Hei! Nimeni on Rocko.                 |
| `Rocko (French (Canada))`            | fr_CA  | Bonjour! Je m'appelle Rocko.          |
| `Rocko (French (France))`            | fr_FR  | Bonjour, je m'appelle Rocko.          |
| `Rocko (Italian (Italy))`            | it_IT  | Ciao! Mi chiamo Rocko.                |
| `Rocko (Japanese (Japan))`           | ja_JP  | こんにちは! 私の名前はRockoです。     |
| `Rocko (Korean (South Korea))`       | ko_KR  | 안녕하세요. 제 이름은 Rocko입니다.    |
| `Rocko (Portuguese (Brazil))`        | pt_BR  | Olá, meu nome é Rocko.                |
| `Rocko (Chinese (China mainland))`   | zh_CN  | 你好！我叫Rocko。                     |
| `Rocko (Chinese (Taiwan))`           | zh_TW  | 你好，我叫Rocko。                     |
| `Samantha`                           | en_US  | Hello! My name is Samantha.           |
| `Sandy (German (Germany))`           | de_DE  | Hallo! Ich heiße Sandy.               |
| `Sandy (English (UK))`               | en_GB  | Hello! My name is Sandy.              |
| `Sandy (English (US))`               | en_US  | Hello! My name is Sandy.              |
| `Sandy (Spanish (Spain))`            | es_ES  | ¡Hola! Me llamo Sandy.                |
| `Sandy (Spanish (Mexico))`           | es_MX  | ¡Hola! Me llamo Sandy.                |
| `Sandy (Finnish (Finland))`          | fi_FI  | Hei! Nimeni on Sandy.                 |
| `Sandy (French (Canada))`            | fr_CA  | Bonjour! Je m'appelle Sandy.          |
| `Sandy (French (France))`            | fr_FR  | Bonjour, je m'appelle Sandy.          |
| `Sandy (Italian (Italy))`            | it_IT  | Ciao! Mi chiamo Sandy.                |
| `Sandy (Japanese (Japan))`           | ja_JP  | こんにちは! 私の名前はSandyです。     |
| `Sandy (Korean (South Korea))`       | ko_KR  | 안녕하세요. 제 이름은 Sandy입니다.    |
| `Sandy (Portuguese (Brazil))`        | pt_BR  | Olá, meu nome é Sandy.                |
| `Sandy (Chinese (China mainland))`   | zh_CN  | 你好！我叫Sandy。                     |
| `Sandy (Chinese (Taiwan))`           | zh_TW  | 你好，我叫Sandy。                     |
| `Sara`                               | da_DK  | Hej! Jeg hedder Sara.                 |
| `Satu`                               | fi_FI  | Hei! Nimeni on Satu.                  |
| `Shelley (German (Germany))`         | de_DE  | Hallo! Ich heiße Shelley.             |
| `Shelley (English (UK))`             | en_GB  | Hello! My name is Shelley.            |
| `Shelley (English (US))`             | en_US  | Hello! My name is Shelley.            |
| `Shelley (Spanish (Spain))`          | es_ES  | ¡Hola! Me llamo Shelley.              |
| `Shelley (Spanish (Mexico))`         | es_MX  | ¡Hola! Me llamo Shelley.              |
| `Shelley (Finnish (Finland))`        | fi_FI  | Hei! Nimeni on Shelley.               |
| `Shelley (French (Canada))`          | fr_CA  | Bonjour! Je m'appelle Shelley.        |
| `Shelley (French (France))`          | fr_FR  | Bonjour, je m'appelle Shelley.        |
| `Shelley (Italian (Italy))`          | it_IT  | Ciao! Mi chiamo Shelley.              |
| `Shelley (Japanese (Japan))`         | ja_JP  | こんにちは! 私の名前はShelleyです。   |
| `Shelley (Korean (South Korea))`     | ko_KR  | 안녕하세요. 제 이름은 Shelley입니다.  |
| `Shelley (Portuguese (Brazil))`      | pt_BR  | Olá, meu nome é Shelley.              |
| `Shelley (Chinese (China mainland))` | zh_CN  | 你好！我叫Shelley。                   |
| `Shelley (Chinese (Taiwan))`         | zh_TW  | 你好，我叫Shelley。                   |
| `Sinji`                              | zh_HK  | 你好！我叫善怡。                      |
| `Tessa`                              | en_ZA  | Hello! My name is Tessa.              |
| `Thomas`                             | fr_FR  | Bonjour, je m'appelle Thomas.         |
| `Tina`                               | sl_SI  | Živijo, ime mi je Tina.               |
| `Tingting`                           | zh_CN  | 你好！我叫婷婷。                      |
| `Trinoids`                           | en_US  | Hello! My name is Trinoids.           |
| `Vani`                               | ta_IN  | Hello! My name is Vani.               |
| `Whisper`                            | en_US  | Hello! My name is Whisper.            |
| `Xander`                             | nl_NL  | Hallo! Mijn naam is Xander.           |
| `Yelda`                              | tr_TR  | Merhaba, benim adım Yelda.            |
| `Yuna`                               | ko_KR  | 안녕하세요. 제 이름은 유나입니다.     |
| `Zarvox`                             | en_US  | Hello! My name is Zarvox.             |
| `Zosia`                              | pl_PL  | Hi my name is Zosia                   |
| `Zuzana`                             | cs_CZ  | Hi my name is Zuzana                  |

## Changelog

### 2025-06-25

- Add support for custom voice and speech rate.

### 2025-03-20

- Update minimum PopClip version due to compatibility issues with older versions
  on some machines.

### 2023-08-29

- Update to "modern" extension structure with JSON config, for documentation
  example purposes.
- Use `stdin` instead of shell variable for input.
- Update README to describe the new location of the default voice settings.
- Move CHANGELOG to its own file.
- Minimum PopClip version is now 4069.

### 2017-07-17

- Fix bug when input contained `*` character.

### 2012-01-08

- Initial release.
