<?php
mb_internal_encoding("UTF-8");
$input=getenv('POPCLIP_TEXT');
echo 'mailto:?body=https%3A%2F%2Fpubmed.ncbi.nlm.nih.gov%2F' . $input . '%2F';

?>