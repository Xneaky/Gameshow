<?php
$header1 =
'<div class="nav-login">
    <form action="" method="post">
        <input type="text" name="usuario" placeholder="Usuario">
        <input type="password" name="pwd" placeholder="Contrasena">
        <button type="submit" name="submit">Login</button>
    </form>
    <a href="../vista/registro-vista.php">Registrarse</a>
</div>';

$header2 = ''
?>
<!DOCTYPE html>
<html>


<head>
    <title>Torneos Gameshow</title>
    <link rel="stylesheet" href="../lib/css/style.css">
    <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
    <script src="../lib/js/jquery.bracket.min.js"></script>
    <link href="../lib/js/jquery.bracket.min.css" rel="stylesheet">
</head>


<body>

    <header>
        <nav>
            <div class="main-wrapper">
                <ul>
                    <li><a href="../index.php">Home</a></li>
                </ul>


                <?php
        if(!isset($_SESSION['usuario'])){
        echo $header1;
    }else{
            echo $header2;
        }
     ?>

            </div>
        </nav>


    </header>
