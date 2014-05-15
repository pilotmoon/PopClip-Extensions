<?php
// produce the list of google maps domains from domains.txt
$lines = file('domains.txt', FILE_IGNORE_NEW_LINES);
foreach($lines as $line) {
	//echo $line;
	preg_match("=http://www.google([^/]+)=u", $line, $matches);
	//var_dump($matches);	
	echo "<string>www.google".$matches[1]."</string>\n";
}
?>