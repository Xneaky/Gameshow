<?php
    session_start();
    if(isset($_SESSION['usuario'])){
        header('location: vista/principal-vista.php');
    }else{
        header('location: model/login.php');
    }
    include_once 'header.php';
?>

<section class="main-container">
    <div class="main-wrapper">
        <h2>Home</h2>
    </div>

</section>


<?php
    include_once 'vista/footer.php';
?>


