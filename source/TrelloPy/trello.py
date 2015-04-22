import requests

class TrelloError(Exception):
    def __init__(self, code):
        self.code = code

def get_board_id(url):
    import re
    return re.sub("https://trello.com/b/([A-Za-z0-9]+).*", "\\1", url)

def add_card(session, board_url, text, position='top', source_url=None):    
    r = session.get('boards/'+get_board_id(board_url)+'/lists')
    if r.status_code != 200:
        raise TrelloError(r.status_code)

    lists = r.json()
    card_args = {
        'idList': lists[0]['id'],
        'urlSource': source_url,
        'name': text,
        'pos': position
    }
    print card_args
    session.post('cards', data=card_args)