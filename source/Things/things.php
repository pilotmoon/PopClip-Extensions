<?php
$text=trim(getenv('POPCLIP_TEXT'));
$url=trim(getenv('POPCLIP_BROWSER_URL'));

$title=strtok($text, "\n");
$note=(strlen($title)<strlen($text))?$text:"";

if (strlen($url)>0) {
	if (strlen($note)>0) {
		$note.="\n\n";
	}
	$note.="Added from $url";
}

$title=rawurlencode($title);
$note=rawurlencode($note);
$cmd="things:add?title=$title&notes=$note";
echo $cmd;
shell_exec('open "'.$cmd.'"');
?>