<?php
mb_internal_encoding("UTF-8"); 
// split
$lines=preg_split('/\R/m', getenv('POPCLIP_TEXT'));
// natural, case-insensitive sort
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