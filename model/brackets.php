<?php
include_once '../vista/header.php';

		try {
			require "../config/conexion.php";

			$conn = new DbConDuelos();

			$conn = $conn->conn();

			$sql2 = " SELECT * FROM torneos ";

			$stmt2 = $conn->prepare($sql2);

			$stmt2 ->execute();

			$rows2 = $stmt2->fetchAll();
		}
		catch(PDOException $e) {
			return '{"status":"fail","description":"'. $e->getMessage() .'"}';
		}
?>

		<script>
            $(document).ready(function(){
	            $('#myDropDown').change(function(){
            		$(".block").addClass("loading");
	                //Selected value
	                var inputValue = $(this).val();

	                //Ajax for calling php function
	                $.post('obtener-teams.php', { dropdownValue: inputValue }, function(data) {
						var teamsArr = [];
						var itemsArr = [];
	                	if (data) {
							var datos = JSON.parse(data);
							var contador = 1;
							datos.forEach(function(item) {
								itemsArr.push(item.nombre)
								if (contador == 2) {
									teamsArr.push(itemsArr);
									itemsArr = [];
									contador = 1;
								} else {
									contador++;
								}
								if (datos.length - 1 == datos.indexOf(item)) {
									var singleElimination = {
										"teams": teamsArr,
										"results": [
											[
												
											]
										]
									}
									$('.demo').bracket({
										init: singleElimination,
										teamWidth: 100,
										scoreWidth: 30
									});
									$(".block").removeClass("loading");
									//console.log(JSON.stringify(teamsArr));
								}
							});
	                	} else {
	                		var singleElimination = {
								"teams": teamsArr,
								"results": [
									[
										
									]
								]
							}
							$('.demo').bracket({
								init: singleElimination,
								teamWidth: 100,
								scoreWidth: 30
							});
							$(".block").removeClass("loading");
	                	}
	                });
	            });
	        });
        </script>
		<div class="block"></div>
		<div class="row">
			<label>Torneos Activos</label>

			<select class="form-control" id="myDropDown">
				<?php
					if (count($rows2) > 0) {
					foreach ($rows2 as $data) {
						echo "<option value='0'>Seleccionar</option>";
						echo "<option value='" . $data['codTorneo'] . "'>" . $data['Nombre'] . "</option>";
					}
				} else { ?>
				<option value="0">No hay registros</option>
				<?php } ?>
			</select>
		</div>

		<div class="demo">
		</div>
