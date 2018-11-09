<?php

	session_start();

	if (isset($_SESSION['newsession'])) { 
		echo true; 
	} else {
		echo false;
	}
?>