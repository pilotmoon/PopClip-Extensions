<?php 
$input=trim(getenv('POPCLIP_TEXT'));

$api = 'http://freeapi.ipip.net/';
$data = file_get_contents($api . $input);

if (!empty($data)) {
    $data = json_decode($data, true);
    foreach ($data as $k=>$v) {
        if (empty($v)){
            unset($data[$k]);
        }
    }
    echo implode('|', $data);
} else {
    echo 'fail';
}
