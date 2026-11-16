<?php
include "conexion.php";

$email    = $_POST['email'];
$password = $_POST['password'];

$resultado = mysqli_query($conexion, "SELECT * FROM usuarios
                                      WHERE email='$email' AND password='$password'");
$usuario = mysqli_fetch_assoc($resultado);

if ($usuario) {
    $_SESSION['usuario_id'] = $usuario['id'];
    echo "ok";
} else {
    echo "error";
}
