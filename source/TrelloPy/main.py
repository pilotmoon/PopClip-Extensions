import os, auth, trello, traceback, sys

session = auth.get_session('["https://trello.com/b/7aElDmQJ/xxxxx-test", "44366552a659d4ba31e2a8eac6767db1"]')
print session

#session = auth.get_session()
board_url = os.getenv('POPCLIP_OPTION_BOARD')# or 'https://trello.com/b/7aElDmQJ/xxxxx-test'
text = os.getenv('POPCLIP_TEXT')# or 'test text 12345'
position = os.getenv('POPCLIP_OPTION_POSITION') or 'Top'
source_url = os.getenv('POPCLIP_BROWSER_URL')

try:
    trello.add_card(session=session, board_url=board_url, text=text, position=position.lower())
except trello.TrelloError as e:          
    if e.code == 401:
        exit(2) # bad auth
    else if e.code == 404 or e.code == 400:
        exit(3) # probably bad board id
    else
        exit(1) # who knows
