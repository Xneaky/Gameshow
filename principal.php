<?php session_start();

    if(isset($_SESSION['usuario'])){
        require 'vista/principal-vista.php';
    }else{
        header ('location: login.php');
    }

?>
