<?php
// set internal string encoding to UTF-8
mb_internal_encoding("UTF-8");

// limit on number of lines copied
$max_lines = 12;

foreach (preg_split('/\R/m', getenv('POPCLIP_URLS')) as $line) {
	if (!mb_strlen($line)) continue; // don't copy blank lines
	if (!$max_lines--) break;
	
	// copy to pasteboard
	$arg = escapeshellarg($line);
	`echo $arg | pbcopy`;
	
	// sleep to allow clipboard managers to see it
	usleep(250000);	
}




