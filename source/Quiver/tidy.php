<?php

function tidy_html($html) {
	$tidy_config=array('clean' => true,
		               'output-xhtml' => true,
	                   'show-body-only' => true);
	$tidy=tidy_parse_string($html, $tidy_config, 'UTF8');
	$tidy->cleanRepair();
	return tidy_get_output($tidy);
}

echo tidy_html($argv[1]);
?>