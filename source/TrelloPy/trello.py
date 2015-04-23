import requests, re

class TrelloError(Exception):
    def __init__(self, code):
        self.code = code

def get_board_id(url):
    return re.sub("https://trello.com/b/([A-Za-z0-9]+).*", "\\1", url)

def add_card(session, board_url, text, position='top', source_url=None):    
    r = session.get('boards/'+get_board_id(board_url)+'/lists')
    if r.status_code != 200:
        raise TrelloError(r.status_code)

    print r.text

    r = session.post('cards', data={
        'idList': r.json()[0]['id'],
        'urlSource': source_url,
        'name': text,
        'pos': position.lower() if position else None
    })

    print r.status_code
    print r.headers
