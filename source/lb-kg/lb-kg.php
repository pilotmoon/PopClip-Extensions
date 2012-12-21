<?php
$lbkg=2.20462;
$text=trim($_ENV['POPCLIP_TEXT']);
if (1===preg_match("/(\\d+(?:\\.\\d+)?)\\s?kgs?/u", $text, $matches)) {
   // kg
   echo number_format($matches[1]*$lbkg, 1) . " lb";
}
else if (1===preg_match("/(\\d+(?:\\.\\d+)?)\\s?lbs?/u", $text, $matches)) {
   // lb
   echo number_format($matches[1]/$lbkg, 1) . " kg";   
}


?>