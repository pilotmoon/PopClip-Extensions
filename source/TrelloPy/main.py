import os, auth, trello, traceback, sys

#session = auth.get_session('["8286e4f3f8f303435c2a0cfeeb95aeb0fcbdb47b2a5e29ecebfd11c2659d6770", "78233b7cffd046ffd9bd1862f942a6ce"]')

session = auth.get_session()
board_url = os.getenv('POPCLIP_OPTION_BOARD')# or 'https://trello.com/b/7aElDmQJ/xxxxx-test'
text = os.getenv('POPCLIP_TEXT')# or 'test text 12345'
position = os.getenv('POPCLIP_OPTION_POSITION') or 'Top'
source_url = os.getenv('POPCLIP_BROWSER_URL')

try:
    trello.add_card(session=session, board_url=board_url, text=text, position=position.lower(), source_url=source_url)
except trello.TrelloError as e:     
    traceback.print_exc(file=sys.stderr) 
    print e.code    
    if e.code == 401:
        exit(2) # bad auth
    elif e.code == 404 or e.code == 400:
        exit(3) # probably bad board id
    else:
        exit(1) # who knows
