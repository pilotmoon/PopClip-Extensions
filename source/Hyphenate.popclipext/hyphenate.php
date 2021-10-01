<?php
$source=getenv('POPCLIP_TEXT');

if (preg_match('/^(\s*)(.*?)(\s*)$/u', $source, $matches)) {
	$pre=$matches[1];
	$text=$matches[2];
	$post=$matches[3];	
	if (preg_match('/\s/u', $text)) { // if string contains spaces
		$res=preg_replace('/\s+/u', '-', $text); //replace spaces with hyphens
	}
	else {
		$res=preg_replace('/[-]+/u', ' ', $text); // else replace hyphens with spaces	
	}
	echo $pre.$res.$post;	
}

?>