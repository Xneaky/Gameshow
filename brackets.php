<?php

		try {
			require "DbConDuelos.php";

			$conn = new DbConDuelos();
			$version = 0;
			$array_teams = array();
			$cuartos = array();
			$semi = array();
			$final = array();
			$sql = " SELECT * FROM duelos ";

			$conn = $conn->conn();
			
			$stmt1 = $conn->prepare($sql);

			$stmt1->execute();

			$rows = $stmt1->fetchAll();

			for ($i = 0; $i < 4; $i++) { //EL NUMERO 4 SERA LA CLAVE PARA QUE EL BUCLE RECORRA LA CANTIDAD INDICADA DE ENCUENTROS
			    $team = array($rows[$i]['equipo_1'], $rows[$i]['equipo_2']);
			    array_push($array_teams, $team);
			}
			for ($i = 0; $i < 4; $i++) { //EL NUMERO 4 SERA LA CLAVE PARA OCTAVOS, CUARTOS, SEMIS, ETC
			    $team = array(intval($rows[$i]['gol_equipo_1']), intval($rows[$i]['gol_equipo_2']));
			    array_push($cuartos, $team);
			}
			for ($i = 0; $i < 2; $i++) { //EL NUMERO 2 SERA LA CLAVE PARA OCTAVOS, CUARTOS, SEMIS, ETC
			    $team = array(intval($rows[$i + 4]['gol_equipo_1']), intval($rows[$i + 4]['gol_equipo_2']));
			    array_push($semi, $team);
			}
			for ($i = 0; $i < 1; $i++) { //EL NUMERO 1 SERA LA CLAVE PARA OCTAVOS, CUARTOS, SEMIS, ETC
			    $team = array(intval($rows[$i + 6]['gol_equipo_1']), intval($rows[$i + 6]['gol_equipo_2']));
			    array_push($final, $team);
			}
			$resultado = $rows;
		}

		catch(PDOException $e) {
			return '{"status":"fail","description":"'. $e->getMessage() .'"}';
		}
?>

<!DOCTYPE html>
<html lang="es">  
	<head>    
		<title>Título de la WEB</title>    
		<meta charset="UTF-8">
		<meta name="title" content="Título de la WEB">
		<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="js/jquery.bracket.min.js"></script>
		<link href="js/jquery.bracket.min.css" rel="stylesheet">
	</head>  
	<body>    
		<header>
		</header>    
		<section>      
			<article>
			</article>      
		</section>
		<div class="demo">
		</div>
		<script type="text/javascript">
			var equiposCompletos = <?php echo json_encode($array_teams); ?>;
			var cuartos = <?php echo json_encode($cuartos); ?>;
			var semifinales = <?php echo json_encode($semi); ?>;
			var final = <?php echo json_encode($final); ?>;
			var doubleElimination = {
				"teams": equiposCompletos,
				"results": [
					[
						cuartos,
						semifinales,
						final
					]
				]
			}

			$('.demo').bracket({
				init: doubleElimination,
				teamWidth: 100,
				scoreWidth: 30
			});
		</script>
		<footer>
		</footer>
	</body>  
</html>