<?php
$text=getenv('POPCLIP_TEXT');

// trim whitespace
$trimmedText=trim($text);

// check we still have characters
if (strlen($trimmedText)<	3) {
	exit(1);
}

// do we end with an =
$endsWithEquals=(substr($trimmedText, -1) === "=");

// trim off the equals too
if ($endsWithEquals) {
	$trimmedText=trim(substr($trimmedText, 0, -1));
}

// check there are no equals now
if (strpos($trimmedText, "=")!==FALSE) {
	exit(1);
}

// replace x with *
$evalText=str_replace("x", "*", $trimmedText);

$evalResult=eval("\$result = ($evalText); return \$result;");
if (gettype($evalResult)==='integer' || gettype($evalResult)==='double') {

	if($endsWithEquals) {
		// append to end
		$resultStr=$text.$evalResult;
	}
	else {
		// substitute
		$resultStr=str_replace($trimmedText, $evalResult, $text);
	}
	
	echo $resultStr;
	exit(0);	
}
else {
	echo $text;
	exit(1);
}
?>