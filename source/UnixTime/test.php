<?php
include 'unixtime.php';
$testData=array(
	'1366890005', 'Thu, 25 Apr 2013 11:40:05 +0000',	
	);
$fail=FALSE;
for ($i=0; $i<count($testData); $i+=2) {
	$testValue = $testData[$i];
	$expect = $testData[$i+1];
	$result = doConvert($testValue);
	$pass = $result === $expect;
	if (!$pass) {
		$fail = TRUE;
	}
	echo $testValue . ' -> ' . $result . ' ' . ($pass ? 'OK' : 'FAIL') . "\n";	
}
echo ($fail ? "FAILED" : "PASSED") . "\n";
?>