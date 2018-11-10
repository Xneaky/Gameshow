<?php

	session_start();

	if (isset($_SESSION['wMhLRCf'])) { 
		print json_encode($_SESSION["wMhLRCf"]);
	} else {
		echo false;
	}
?>