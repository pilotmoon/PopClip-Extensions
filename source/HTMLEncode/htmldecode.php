<?php
mb_internal_encoding("UTF-8");
$input=getenv('POPCLIP_TEXT');
echo html_entity_decode($input, ENT_COMPAT | ENT_HTML401, 'UTF-8');
?>