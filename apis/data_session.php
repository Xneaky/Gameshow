<?php
	$json = file_get_contents('php://input');
	$obj = json_decode($json);

	$sesion = $obj->sesion->params;
	
	session_start();
	/*session is started if you don't write this line can't use $_Session  global variable*/
	$_SESSION["wMhLRCf"]=$sesion;
	print json_encode($_SESSION["wMhLRCf"]);
?>