<?php
mb_internal_encoding("UTF-8"); 
// split and uniquify
$lines=array_unique(preg_split('/\R/m', getenv('POPCLIP_TEXT')));
// natutal, case-insensitive sort
natcasesort($lines);
// exclude empty lines
$result=array();
foreach ($lines as $line) {
	if (strlen($line)>0) {
		array_push($result, $line);
	}
}
echo implode($result, "\n");
?>