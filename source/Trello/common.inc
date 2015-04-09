<?php

# extension identifiers
define('EXTENSION_ID', 'com.pilotmoon.popclip.extension.trello');
define('EXTENSION_NAME', 'Trello');

# callback url
define('CALLBACK', 'http://reqr.net/callback/popclip?callback_ext_id='.EXTENSION_ID.'&callback_ext_name='.EXTENSION_NAME);

# trell endpoints
define('ENDPOINT_REQUEST', 'https://trello.com/1/OAuthGetRequestToken');
define('ENDPOINT_AUTHORIZE', 'https://trello.com/1/OAuthAuthorizeToken');
define('ENDPOINT_ACCESS', 'https://trello.com/1/OAuthGetAccessToken');




