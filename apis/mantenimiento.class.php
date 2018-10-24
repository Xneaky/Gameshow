<?php 
	include_once("conexion.class.php");

	class Mmto{
	 //constructor	
	 	var $con;
	 	function Mmto(){
	 		$this->con=new DBManager;
	 	}

		function crud($sql) {
			if($this->con->conectar()==true){
				return mysql_query($sql);
			}
		}
	}
?>