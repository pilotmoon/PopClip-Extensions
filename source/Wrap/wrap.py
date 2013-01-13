import os, re, string, textwrap
print '\n\n'.join(map(lambda x: textwrap.fill(re.sub(r'\s+', ' ', x), 80), string.split(re.sub(r'\n\n+', '\n\n', os.getenv('POPCLIP_TEXT')), '\n\n')))
