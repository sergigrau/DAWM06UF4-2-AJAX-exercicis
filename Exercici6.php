<?php
header("Content-Type: text/xml;charset=ISO-8859-1");
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
$caracter=$_GET['caracter'];
$nombre=ord($caracter);
echo '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<resultats><decimal>'.$nombre.'</decimal>'.
   '<binari>'.decbin($nombre).'</binari>'.
   '<hexadecimal>'.dechex($nombre).'</hexadecimal>'.
   '<octal>'.decoct($nombre).'</octal></resultats>';
?>