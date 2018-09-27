<?php session_start();
include_once 'header.php';

    if(isset($_SESSION['usuario'])) {
        header('location: index.php');
    }

    $error = '';

    if($_SERVER['REQUEST_METHOD'] == 'POST'){

        $usuario = $_POST['usuario'];
        $clave = $_POST['pwd'];
        $clave = hash('sha512', $clave);


        try{
            $conexion = new PDO('mysql:host=localhost;dbname=gameshow', 'root', '');
            }catch(PDOException $prueba_error){
                echo "Error: " . $prueba_error->getMessage();
            }

        $statement = $conexion->prepare('
        SELECT * FROM usuarios WHERE username = :usuario AND pwd = :clave'
        );

        $statement->execute(array(
            ':usuario' => $usuario,
            ':clave' => $clave
        ));

        $resultado = $statement->fetch();

        if ($resultado !== false){
            $_SESSION['usuario'] = $usuario;
            header('location: principal.php');
        }else{
            $error .= '<i>Este usuario no existe</i>';
        }
    }
?>

<section class="main-container">
    <div class="main-wrapper">
        <h2>Home</h2>

    </div>

</section>

<?php
    include_once 'footer.php';
?>
