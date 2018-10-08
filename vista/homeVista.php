<section class="main-container">
    <div class="main-wrapper">
        <h2 class="titulo-home">Home hola soy el home</h2>
    </div>
</section>

<div id="modal" class="modal">
    <div class="modal-conte">
        <div class="modal-header">
            <span class="closeBtn">&times;</span>
            <h2>Inicio de sesion</h2>

        </div>
        <div class="modal-body">
            <form action="" method="post">
               <div class="inputbox">
                    <input type="text" name="usuario" required="">
                    <label>Usuario</label>
               </div>
               <div class="inputbox">
                <input type="password" name="pwd" required="">
                    <label>Contrasena</label>
               </div>
                <button class="loginBtn" >Login</button>
            </form>
        </div>
    </div>
</div>


<?php
    include_once '../vista/footer.php';
?>
