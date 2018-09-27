<!DOCTYPE html>
<html>


<head>
    <title>Torneos Gameshow</title>
    <link rel="stylesheet" href="../css/style.css">
    <link href="jquery.bracket.min.css" rel="stylesheet"/>
</head>


<body>

<header>
    <nav>
        <div class="main-wrapper">
            <ul>
                <li><a href="../index.php">Home</a></li>
            </ul>
<!--             <div class="nav-login">
                <form action="" method="post">
                    <input type="text" name="usuario" placeholder="Usuario">
                    <input type="password" name="pwd" placeholder="Contrasena">
                    <button type="submit" name="submit">Login</button>
                </form>
                <a href="vista/registro-vista.php">Registrarse</a>
            </div> -->
        </div>
    </nav>


</header>

<section class="main-container">
    <div class="main-wrapper">
        <h2>Registrarse</h2>


        <form class="registro-f" action="../registrar.php" method="post">
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

