<?php
include "conexion.php";

$nombre   = $_POST['nombre'];
$email    = $_POST['email'];
$password = $_POST['password'];

mysqli_query($conexion, "INSERT INTO usuarios (nombre, email, password)
                         VALUES ('$nombre', '$email', '$password')");

echo "ok";
