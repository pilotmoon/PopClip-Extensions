<?php

function extract_parameter($query, $param_name) {
	if (array_key_exists($param_name, $query)) {
		return $query[$param_name];
	}
	else {
		return '';
	}
}