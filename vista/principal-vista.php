<?php
    session_start();
    if(!isset($_SESSION['usuario'])){
        header('location: ../model/login.php');
    }
    include_once 'header.php';
?>

<section class="main-container">
    <div class="main-wrapper">
        <h2>ESTA ES LA PAGINA PRINCIPAL</h2>

        <?php
        require '../model/brackets.php';
        ?>

        <a href="../model/cerrar.php">CERRAR SESION</a>
    </div>

</section>


<?php
    include_once 'footer.php';
?>

