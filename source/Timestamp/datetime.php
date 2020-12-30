<?php
mb_internal_encoding("UTF-8");
function getOpts($str) {
    $name = 'POPCLIP_OPTION_' . strtoupper($str);
    $value = getenv($name);
    $bracketPos = strpos($value, '(');
    if ($bracketPos===false) {
      return false;
    }
    return substr($value, 0, $bracketPos-1);
}
$dateType = getOpts('date');
$timeType = getOpts('time');
if ($timeType) {
  $format = $dateType . ' ' . $timeType;
}
else {
  $format = $dateType;
}
echo date($format);
?>
