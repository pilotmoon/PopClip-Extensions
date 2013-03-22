<?php
mb_internal_encoding("UTF-8");
$input=getenv('POPCLIP_TEXT');
$quoteExample=getenv('POPCLIP_OPTION_QUOTESTYLE');

$openQuote=mb_substr($quoteExample,0,1);
$closeQuote=mb_substr($quoteExample,2,1);

echo $openQuote.$input.$closeQuote;

?>