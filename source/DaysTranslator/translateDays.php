<?php
$days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

$input = getenv('POPCLIP_TEXT');
$camelcase = getenv('POPCLIP_OPTION_CAMELCASE');
$return = '';

if($input >= 1 && $input < 8) {
  $return = $days[$input - 1];

  if($camelcase)
    $return = ucfirst($return);
}

echo $return;
