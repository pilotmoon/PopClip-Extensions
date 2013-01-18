<?
//$text="test@example.com";
$text=getenv('POPCLIP_TEXT');
if (1===preg_match("/.+@(.+)/u", $text, $matches)) {
	`open "http://$matches[1]"`;
}
?>
