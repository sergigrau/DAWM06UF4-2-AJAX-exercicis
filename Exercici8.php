<?php
function __file_backread_helper(&$haystack, $needle, $x) {
	$pos = 0;
	$cnt = 0;
	while ($cnt < $x && ($pos = strpos($haystack, $needle, $pos)) !== false) {$pos++;
		$cnt++;
	}
	return $pos == false ? false : substr($haystack, $pos, strlen($haystack));
}

function file_backread($file, $lines, &$fsize = 0) {
	$f = fopen($file, 'r');
	if (!$f)
		return Array();

	$splits = $lines * 50;
	if ($splits > 10000)
		$splits = 10000;

	$fsize = filesize($file);
	$pos = $fsize;

	$buff1 = Array();
	$cnt = 0;

	while ($pos) {
		$pos = $pos - $splits;

		if ($pos < 0) { $splits += $pos;
			$pos = 0;
		}

		fseek($f, $pos);
		$buff = fread($f, $splits);
		if (!$buff)
			break;

		$lines -= substr_count($buff, "\n");

		if ($lines <= 0) {
			$buff1[] = __file_backread_helper($buff, "\n", abs($lines) + 1);
			break;
		}
		$buff1[] = $buff;
	}

	return str_replace("\r", '', implode('', array_reverse($buff1)));
}

header("Content-Type: text/xml;charset=ISO-8859-1");
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
date_default_timezone_set('UTC');
$ultimLog= file_backread("Exercici8.txt", 1);
$arrayDades=explode("_", $ultimLog);
if ($_GET['ultim'] != $ultimLog) {
	echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<log><data>' . $arrayDades[0] . '</data>' . '<dades>' . $arrayDades[1] . '</dades>' . '</log>';
}
?>