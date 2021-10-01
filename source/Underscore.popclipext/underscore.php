<?php
$source=getenv('POPCLIP_TEXT');

if (preg_match('/^(\s*)(.*?)(\s*)$/u', $source, $matches)) {
	$pre=$matches[1];
	$text=$matches[2];
	$post=$matches[3];	
	if (preg_match('/\s/u', $text)) { // if string contains spaces
		$res=preg_replace('/\s+/u', '_', $text); //replace spaces with underscores
	}
	else {
		$res=preg_replace('/[_]+/u', ' ', $text); // else replace underscores with spaces	
	}
	echo $pre.$res.$post;	
}

?>