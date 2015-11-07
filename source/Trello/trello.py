import requests, re

class TrelloError(Exception):
    def __init__(self, code):
        self.code = code

def get_board_id(session, url):
    short_board_id = re.sub("https://trello.com/b/([A-Za-z0-9]+).*", "\\1", url)
    r = session.get('/1/boards/' + short_board_id)
    if r.status_code != 200:
        raise TrelloError(r.status_code)
    
    return r.json()['id']

def get_target_list(session, board_id):
    r = session.get('/1/boards/'+board_id+'/lists')
    if r.status_code != 200:
        raise TrelloError(r.status_code)

    lists = r.json()
    if len(lists) == 0: # create new list if needed
        r = session.post('/1/lists', data={
            'idBoard': board_id,            
            'name': 'New List',
            })    
        if r.status_code != 200:
            raise TrelloError(r.status_code)
            
        return r.json()['id']

    else:
        return lists[0]['id']

def add_card(session, board_url, text, position='top', source_url=None):    
    list_id = get_target_list(session, get_board_id(session, board_url))

    r = session.post('/1/cards', data={
        'idList': list_id,
        'urlSource': source_url,
        'name': text,
        'pos': position if position else None
    })
    if r.status_code != 200:
        raise TrelloError(r.status_code)

def verify_login(session):
    r = session.get('/1/members/me')
    if r.status_code != 200:    
        raise TrelloError(r.status_code)    