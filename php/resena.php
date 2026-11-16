<?php
include "conexion.php";

$id         = $_SESSION['usuario_id'];
$pelicula   = $_POST['pelicula'];
$puntuacion = $_POST['puntuacion'];
$comentario = $_POST['comentario'];

mysqli_query($conexion, "INSERT INTO resenas (usuario_id, pelicula, puntuacion, comentario)
                         VALUES ($id, '$pelicula', $puntuacion, '$comentario')");

echo "ok";
