<?php

    session_start();
    if(isset($_SESSION['usuario'])){
        header('location: principal.php');
    }else{
        header('location: login.php');
    }
    include_once 'header.php';
?>

<section class="main-container">
    <div class="main-wrapper">
        <h2>Home</h2>
    </div>

</section>


<?php
    include_once 'footer.php';
?>


