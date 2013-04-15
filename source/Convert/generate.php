<?php
include 'convert.php';
//generate the regex for config.plist
foreach (array_keys($convert) as $key) {
	$regex.= ($regex?'|':'').$key;
}
echo '^\s*(\d+(?:[\.,]\d+)?)\s?(?:'.$regex.")\s*$";
?>