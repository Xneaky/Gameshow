<?php

Class DbConDuelos{


	private $db_host = 'localhost';
	private $db_user = 'root';
	private $db_pass = '';
	private $db_name = 'gameshow';

	public function conn(){


			$mysql_conecxion_str = "mysql:host=$this->db_host;dbname=$this->db_name;";

			$dbConecxion =  new  PDO($mysql_conecxion_str,$this->db_user, $this->db_pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
			$dbConecxion->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
			return $dbConecxion;
	}


}
?>
