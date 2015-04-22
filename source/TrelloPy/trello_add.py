import auth
import json, os

def add_card(session, text):
    r = session.get('boards/TQiYDk1V/lists');
    print r.json()

#session = auth.get_session('["8286e4f3f8f303435c2a0cfeeb95aeb0fcbdb47b2a5e29ecebfd11c2659d6770", "44366552a659d4ba31e2a8eac6767db1"]')
session = auth.get_session()
text = os.getenv('POPCLIP_TEXT') or 'test text 12345'
add_card(session, text)