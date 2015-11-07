from __future__ import print_function
import os, auth, trello, traceback, sys

try:
    session = auth.get_session(os.getenv('POPCLIP_OPTION_AUTHSECRET'));
    trello.verify_login(session);
except:
    exit(2)

try:
    trello.add_card(
         session=session,
         board_url=os.getenv('POPCLIP_OPTION_BOARD'),
         text=os.getenv('POPCLIP_TEXT'),
         position={'Top of list': 'top', 'Bottom of list': 'bottom'}.get(os.getenv('POPCLIP_OPTION_POSITION'), 'top'),
         source_url=os.getenv('POPCLIP_BROWSER_URL'))
    
except trello.TrelloError as e:     
    traceback.print_exc(file=sys.stderr) 
    print('Status code', e.code, file=sys.stderr)
    if e.code == 400 or e.code == 401 or e.code == 404:
        exit(3) # probably bad board id
    else:
        exit(1) # who knows
