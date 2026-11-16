<?php
include "conexion.php";

// Si no hay sesión, devuelve null
if (!isset($_SESSION['usuario_id'])) {
    echo "null";
    exit;
}

$id = $_SESSION['usuario_id'];

$usuario = mysqli_fetch_assoc(mysqli_query($conexion,
    "SELECT nombre, email FROM usuarios WHERE id=$id"));

$usuario['favoritas'] = [];
$r = mysqli_query($conexion, "SELECT pelicula FROM favoritas WHERE usuario_id=$id");
while ($fila = mysqli_fetch_assoc($r)) {
    $usuario['favoritas'][] = $fila['pelicula'];
}

$usuario['vistas'] = [];
$r = mysqli_query($conexion, "SELECT pelicula FROM vistas WHERE usuario_id=$id");
while ($fila = mysqli_fetch_assoc($r)) {
    $usuario['vistas'][] = $fila['pelicula'];
}

$usuario['resenas'] = [];
$r = mysqli_query($conexion, "SELECT pelicula, puntuacion, comentario
                              FROM resenas WHERE usuario_id=$id ORDER BY id DESC");
while ($fila = mysqli_fetch_assoc($r)) {
    $usuario['resenas'][] = $fila;
}

echo json_encode($usuario);
