<?php

// get the popclip text
$popclip_text=trim(force_string(getenv('POPCLIP_TEXT')));

// select target app
$tp2bid="com.hogbaysoftware.TaskPaper.mac";
$tp3bid="com.hogbaysoftware.TaskPaper3";
$bid=trim(`./SelectApp ${tp3bid} ${tp2bid}`);
if ($bid===$tp2bid) {
	do_tp2($popclip_text);
}
else if ($bid==$tp3bid) {
	do_tp3($popclip_text);
}

function force_string($str) {
	return is_string($str)?$str:'';
}

function do_tp2($text) {
	$escapedtext=escapeshellarg($text);
	`./PerformService "TaskPaper: Send to Inbox" $escapedtext`;
}	

// escape backslashes and double quotes
function applescript_safe($string) {
	$string=str_replace("\\", "\\\\", $string);
	$string=str_replace("\"", "\\\"", $string);
	return $string;
}

function do_tp3($text) {
	// based on http://support.hogbaysoftware.com/t/whats-the-latest-on-quick-entry-solutions-for-taskpaper-3/1621
	$applescript = <<<END
var TaskPaper = Application('com.hogbaysoftware.TaskPaper3')
var selectedText = "{popclip text}"

// Send it to TaskPaper Inbox
TaskPaper.documents[0].evaluate({
	script: TPContext.toString(),
	withOptions: {text: selectedText }
});

function TPContext(editor, options) {
	var outline = editor.outline;
	var inbox = outline.evaluateItemPath("//Inbox:")[0];
	var items = ItemSerializer.deserializeItems(options.text, outline, ItemSerializer.TEXTMimeType);
	
	if (!inbox) {
		inbox = outline.createItem("Inbox:");
		outline.root.insertChildrenBefore(inbox, outline.root.firstChild);
	}
	
	inbox.insertChildrenBefore(items, inbox.firstChild);
}
END;

	$applescript=str_replace("{popclip text}", applescript_safe($text), $applescript);
	$escapedscript=escapeshellarg($applescript);
	$result=`echo $escapedscript | osascript -l JavaScript -`;
}

?>