import common, json, os

def add(session, text):
    r = session.get('boards/TQiYDk1V/lists');
    print r.json()

def main(auth, text):    
    add(common.get_oauth_service().get_session(json.loads(auth)), text)        

auth = os.getenv('POPCLIP_OPTION_AUTHSECRET') or '["8286e4f3f8f303435c2a0cfeeb95aeb0fcbdb47b2a5e29ecebfd11c2659d6770", "44366552a659d4ba31e2a8eac6767db1"]'
text = os.getenv('POPCLIP_TEXT') or 'test text 12345'
main(auth, text)