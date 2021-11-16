<?php

// this will ensure all tags are closed, without any html/head/body/doctype tags
function tidy_html($html) {
	$tidy_config=array('output-xhtml' => true,
	                   'show-body-only' => true);
	$tidy=tidy_parse_string($html, $tidy_config, 'UTF8');
	$tidy->cleanRepair();
	return tidy_get_output($tidy);
}

echo tidy_html($argv[1]);