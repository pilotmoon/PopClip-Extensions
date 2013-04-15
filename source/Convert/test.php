<?php
include 'convert.php';
$testData=array(
	'100 kg', '220.5 lb',
	'100 kgs', NULL,
	'50LBS',  '22.7kg',
	'100.20 lbs', '45.45 kg',
	'fishy 799lbs', NULL,
	'10002321312321323lb', '4536976629557340.0kg',
	'13.726kg', '30.261lb',
	'1 kg', '2.2 lb',
	'1kg', '2.2lb',
	'55,5 kg', '121.3 lb',
	'1in', '2.5cm',
	'2ins', '5.1cm',
	'3.000 "', '7.620 cm',
	'4 inch', '10.2 cm',
	'5.555 inches', '14.110 cm',
	'1cm', '0.4"',
	'100.55 cm', '39.59"',
	'100.55 cms', NULL,
	'1foot', '0.3m',
	'2 feet', '0.6 m',
	"2.3'", '0.7m',
	"2.3 '", '0.7 m',
	'100 yards', '91.4 m',
	'11.444yds', '10.464m',
	'10yd', '9.1m',
	'100m', '109.4 yards',
	'0.1 m', '0.3\'',
	'0.1000m', '0.3281\'',
	'5.0km', '3.1 miles',
	'10k', '6.2 miles',
	'100.555 km', '62.482 miles',
	'0.1mi', '0.2km',
	'10 miles', '16.1 km',
	'100g', '3.5oz',
	'225 g', '7.9 oz',
	'4 oz', '113.4 g',
	'6 ounces', '170.1 g',
	'100 kilometres', '62.1 miles',
	'7 kilos', '15.4 lb',
	'10m', "32.8'",
	'15m', "49.2'",
	'16m', '17.5 yards',
	'20m', '21.9 yards',
	'0C', '32.0°F',
	'100°C', '212.0°F',
	'32F', '0.0°C',
	'32 °F', '0.0 °C',
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