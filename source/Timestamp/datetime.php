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

# get local time zone
# example: /etc/localtime -> /var/db/timezone/zoneinfo/Europe/London
# example: /etc/localtime -> /usr/share/zoneinfo/Europe/London
$zonefile = readlink('/etc/localtime');
if (preg_match('%zoneinfo/(.+)$%u', $zonefile, $matches)===1) {
  date_default_timezone_set($matches[1]);
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
