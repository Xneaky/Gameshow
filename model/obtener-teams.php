<?php
	require "../config/conexion.php";
	function processDrpdown($selectedVal) {
	    $value = intval($selectedVal);
	    try {
			$conn = new DbConDuelos();

			$sql = " SELECT t1.nombre FROM team AS t1 INNER JOIN participantes AS t2 ON t1.codTeam = t2.team_codTeams WHERE t2.torneos_codTorneo = $value ";

			$conn = $conn->conn();

			$stmt1 = $conn->prepare($sql);

			$stmt1->execute();

			$rows = $stmt1->fetchAll(PDO::FETCH_ASSOC);

			print_r(json_encode($rows));
		}
		catch(PDOException $e) {
			return '{"status":"fail","description":"'. $e->getMessage() .'"}';
		}
	}        

	if ($_POST['dropdownValue']){
	    processDrpdown($_POST['dropdownValue']);
	}
?>