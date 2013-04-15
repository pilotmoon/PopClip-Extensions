<?php
// regex for possible decimal separators
define (ALL_SEPARATORS, '[\.,]');

// get proper decimal separator for the locale
define (DECIMAL_SEPARATOR, ifNull(getenv('POPCLIP_DECIMAL_SEPARATOR'),'.'));
function ifNull($a, $b) {
	return $a?$a:$b;
}

// conversion data from http://en.wikipedia.org/wiki/Conversion_of_units
$kg_per_lb = 0.45359237; // international avoirdupois pound
$g_per_oz = ($kg_per_lb / 16) * 1000;
$cm_per_inch = 2.54; // exact definition
$m_per_foot = ($cm_per_inch * 12) / 100;
$m_per_yard = $m_per_foot * 3;
$km_per_mile = ($m_per_yard * 1760) / 1000;
$convert = array(
	'(?:pounds?|lbs?)' => array('kg', $kg_per_lb),
	'(?:ounces?|oz?)' => array('g', $g_per_oz),
	'(?:centimetres?|centimeters?|cm)' => array('"', 1/$cm_per_inch, 0),
	'(?:inches|inch|ins?|")' => array('cm', $cm_per_inch),
	'(?:feet|foot|ft|\')' => array('m', $m_per_foot),
	'(?:yards?|yds?)' => array('m', $m_per_yard),	
	'(?:miles?|mi)' => array('km', $km_per_mile),
	'(?:kilometres?|kilometers?|km?)' => array('miles', 1/$km_per_mile, 1),
	'(?:kilograms?|kilos?|kg)' => array('lb', 1/$kg_per_lb),	
	'(?:grams?|g)' => array('oz', 1/$g_per_oz),
	'(?:metres?|meters?|m)' => array('\'', 1/$m_per_foot, 0),
	'(?:°?F)' => array('°C', 1),
	'(?:°?C)' => array('°F', 1),
	);

// return the number of decimal places in the input string, if any. else 1.
function places($number) {
	if (1===preg_match('/\d'.ALL_SEPARATORS.'(\d+)/u', $number, $matches)) {
		return strlen($matches[1]);
	}
	return 1;
}

function doConvert($text) {
	global $convert;
	reset($convert);
	while (list($unitRegex, list($outputUnit, $factor, $spaceFlag)) = each($convert)) {		
		if (1===preg_match('/^\s*((\d+(?:'.ALL_SEPARATORS.'\d+)?)(\s*)'.$unitRegex.')\s*$/ui', $text, $matches)) {
			// the matching input (e.g. '123.45 kg')
			$whole=$matches[1];
			// the number part (e.g. '123.45')
			$numberPart=$matches[2];
			/// the result
			$resultNumber = $numberPart*$factor;

			// output in yards if many feet
			if ($outputUnit == '\'' && $resultNumber>50) {
				$outputUnit = 'yards';
				$resultNumber /= 3;
				$spaceFlag = 1;
			}
			else if ($outputUnit == '°C') {
				$resultNumber = (($resultNumber - 32) * 5) / 9;
			}
			else if ($outputUnit == '°F') {
				$resultNumber = (($resultNumber * 9) / 5) + 32;
			}

			// the whitespace to output between number an unit. mirror input unless 'space' flag is set 
			if ($spaceFlag===0) {
				$space = '';
			}
			else if ($spaceFlag===1) {
				$space = ' ';
			}
			else {
				$space = $matches[3];
			}

			return str_replace($whole, number_format($resultNumber, places($numberPart), DECIMAL_SEPARATOR, '') . $space . $outputUnit, $text);
		}
	}
	return NULL;
}
if ($input=getenv('POPCLIP_TEXT')) {
	echo doConvert($input);
}
?>