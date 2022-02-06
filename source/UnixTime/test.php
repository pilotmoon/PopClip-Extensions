<?php
include 'unixtime.php';
$testData=array(
	"1535438729", "2018-08-28 06:45:29 UTC",
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