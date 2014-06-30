<?php

// applescript to create the note in evernote
$applescript = <<<END
tell application id "com.evernote.Evernote"
	activate
	
	-- input strings
	set theText to "{popclip text}"
	set theHtml to "{popclip html}"
	set theBrowserUrl to "{popclip browser url}"
	set theBrowserTitle to "{popclip browser title}"
	
	-- choose html or plain
	if length of theHtml > 0 then
		set theNote to create note with html theHtml
	else
		set theNote to create note with text theText
	end if
	
	-- set browser url and title if known
	if length of theBrowserUrl > 0 then
		set source URL of theNote to theBrowserUrl
	end if
	if length of theBrowserTitle > 0 then
		set title of theNote to theBrowserTitle
	end if
	
	open note window with theNote
	activate
end tell
END;
							
// escape backslashes and double quotes
function applescript_safe($string) {
	$string=str_replace("\\", "\\\\", $string);
	$string=str_replace("\"", "\\\"", $string);
	return $string;
}

// this will ensure all tags are closed, without any html/head/body/doctype tags
function tidy_html($html) {
	$tidy_config=array('output-xhtml' => true,
	                   'show-body-only' => true);
	$tidy=tidy_parse_string($html, $tidy_config, 'UTF8');
	$tidy->cleanRepair();
	return tidy_get_output($tidy);
}

function force_string($str) {
	return is_string($str)?$str:'';
}

// get the required fields
$popclip_text=force_string(getenv('POPCLIP_TEXT'));
$popclip_html=force_string(getenv('POPCLIP_HTML'));
$popclip_browser_url=force_string(getenv('POPCLIP_BROSWER_URL'));
$popclip_browser_title=force_string(getenv('POPCLIP_BROWSER_TITLE'));
							
/* Tidy the html. We do this because evernote 5.6.0 is much stricter about
html errors than previous version. Seems to prefer a strict XHTML fragment, sans doctype. */
$popclip_html=tidy_html($popclip_html);

// Fill in applescript template fields.
$applescript=str_replace("{popclip text}", applescript_safe($popclip_text), $applescript);
$applescript=str_replace("{popclip html}", applescript_safe($popclip_html), $applescript);
$applescript=str_replace("{popclip browser url}", applescript_safe($popclip_browser_url), $applescript);
$applescript=str_replace("{popclip browser title}", applescript_safe($popclip_browser_title), $applescript);

// Call script
$escapedscript=escapeshellarg($applescript);
$result=`echo $escapedscript | osascript -`;

?>