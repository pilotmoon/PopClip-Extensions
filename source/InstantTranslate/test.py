import argparse, access, mstrans

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument(dest='text', type=str,
                    help='a string to translate')
parser.add_argument('-t', '--to', dest='to_lang', type=str, default='en',
                    help='to language')
parser.add_argument('-f', '--from', dest='from_lang', type=str, default='',
                    help='from language')
args = parser.parse_args()

c = access.get_credentials()
print c

translator = mstrans.Translator(client_id=c[0], client_secret=c[1])
translation = translator.translate_text(text=args.text,
                                        from_lang=args.from_lang,
                                        to_lang=args.to_lang)

print translation
