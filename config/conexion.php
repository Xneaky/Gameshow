<?php

function conectar(){

    $host="localhost";
    $usuario="root";
    $contra="admin";
    $bd="gameshow";

    try{
        $conn = new PDO("mysql:host=$host; dbname=$bd",$usuario,$contra);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->exec("set names utf8");
        return $conn;


        }catch(PDOException $error){
            echo "No se pudo conectar con la base de datos:" .$error->getMessage();


    }

}
?>
