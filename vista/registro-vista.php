<?php
include_once '../vista/header.php';
?>
<section class="main-container">
    <div class="main-wrapper">
        <h2>Registrarse</h2>


        <form class="registro-f" action="../model/registrar.php" method="post">
            <input type="text" name="nombre" placeholder="Nombre">
            <input type="text" name="apellido" placeholder="Apellido">
            <input type="text" name="email" placeholder="E-mail">
            <input type="text" name="usuario" placeholder="Usuario">
            <input type="password" name="pwd" placeholder="Contrasena">
            <input type="password" name="pwd2" placeholder="Confirmar Contrasena">
            <button type="submit" name="registrar">Registrar</button>
            <?php if(!empty($error)): ?>
            <div class="mensaje">
                <?php echo $error; ?>
            </div>
            <?php endif; ?>
        </form>

    </div>

</section>

</body>
</html>

