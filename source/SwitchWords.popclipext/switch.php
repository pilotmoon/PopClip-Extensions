<?php
$source=getenv('POPCLIP_TEXT');

if (preg_match('/^(\s*)(.*?)([\s,]+)(.*?)(\s*)$/u', $source, $matches)) {
	$pre=$matches[1];
	$word1=$matches[2];
	$middle=$matches[3];
	$word2=$matches[4];		
	$post=$matches[5];	
	echo $pre.$word2.$middle.$word1.$post;	
}

?>