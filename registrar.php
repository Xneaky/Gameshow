<?php session_start();

    if(isset($_SESSION['usuario'])) {
        header('location: index.php');
    }



    if ($_SERVER['REQUEST_METHOD'] == 'POST'){

        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $email = $_POST['email'];
        $usuario = $_POST['usuario'];
        $pwd = $_POST['pwd'];
        $pwd2 = $_POST['pwd2'];

        $pwd = hash('sha512', $pwd);
        $pwd2 = hash('sha512', $pwd2);

        $error = '';

        if (empty($nombre) or empty($apellido) or empty($email) or empty($usuario) or empty($pwd) or empty($pwd2)){

            $error .= '<i>Favor de rellenar todos los campos</i>';
        }else{
            try{
                $conexion = new PDO('mysql:host=localhost;dbname=gameshow', 'root', '');
            }catch(PDOException $prueba_error){
                echo "Error: " . $prueba_error->getMessage();
            }

            $statement = $conexion->prepare('SELECT * FROM usuarios WHERE usuario = :usuario LIMIT 1');
            $statement->execute(array(':usuario' => $usuario));
            $resultado = $statement->fetch();


            if ($resultado != false){
                $error .= '<i>Este usuario ya existe</i>';
            }

            if ($pwd != $pwd2){
                $error .= '<i> Las contraseñas no coinciden</i>';
            }


        }

        if ($error == ''){
            $statement = $conexion->prepare('INSERT INTO usuarios ( nombre, apellido, email, username, pwd) VALUES (:nombre, :apellido, :email, :usuario, :pwd)');
            $statement->execute(array(

                ':nombre' => $nombre,
                ':apellido' => $apellido,
                ':email' => $email,
                ':usuario' => $usuario,
                ':pwd' => $pwd

            ));

            $error .= '<i style="color: green;">Usuario registrado exitosamente</i>';
        }
    }


    require 'vista/registro-vista.php';

?>
