<?php
$text=getenv('POPCLIP_TEXT');
$dsep=getenv('POPCLIP_DECIMAL_SEPARATOR');
$gsep=getenv('POPCLIP_GROUPING_SEPARATOR');

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

// remove spaces
$evalText=preg_replace('=\s=', '', $evalText);

// remove grouping separator
$evalText=str_replace($gsep, '', $evalText);

// replace decimal separator with .
$evalText=str_replace($dsep, '.', $evalText);

$evalResult=eval("\$result = ($evalText); return \$result;");
if (gettype($evalResult)==='integer' || gettype($evalResult)==='double') {
	
	// replace back decimal separator 
	$resultStr=str_replace('.', $dsep, $evalResult);

	if($endsWithEquals) {
		// append to end
		$resultStr=$text.$resultStr;
	}
	else {
		// substitute
		$resultStr=str_replace($trimmedText, $resultStr, $text);
	}
	
	echo $resultStr;
	exit(0);	
}
else {
	echo $text;
	exit(1);
}
?>