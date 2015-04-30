from __future__ import print_function
import os, auth, trello, traceback, sys

testauth = '["6cf5c3fef687f4cf33a6f903c4c29ad541669bf0f45d5afb0639a7f08dd2de54", "4f52bea83d785c980eabff894b65c70c"]'
testdata = {      
        'session': auth.get_session(testauth), 
        'board_url': 'https://trello.com/b/7aElDmQJ/xxxxx-test',
        'text': 'testing 123456',
        'position': 'Top',
        'source_url': 'http://example.com'
}



try:
    if os.getenv('POPCLIP_TEXT'):
        try:
            session = auth.get_session(os.getenv('POPCLIP_OPTION_AUTHSECRET');
        except:
            raise TrelloError(401)

        trello.add_card(
             session=,
             board_url=os.getenv('POPCLIP_OPTION_BOARD'),
             text=os.getenv('POPCLIP_TEXT'),
             position=os.getenv('POPCLIP_OPTION_POSITION'),
             source_url=os.getenv('POPCLIP_BROWSER_URL'))
    else:
        trello.add_card(**testdata)
    
except trello.TrelloError as e:     
    traceback.print_exc(file=sys.stderr) 
    print('Status code', e.code, file=sys.stderr)
    if e.code == 401:
        exit(2) # bad auth
    elif e.code == 404 or e.code == 400:
        exit(3) # probably bad board id
    else:
        exit(1) # who knows
