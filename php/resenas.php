<?php
include "conexion.php";

// Todas las reseñas de la comunidad (para opiniones.html)
$lista = [];
$r = mysqli_query($conexion, "SELECT usuarios.nombre, resenas.pelicula,
                                     resenas.puntuacion, resenas.comentario
                              FROM resenas
                              JOIN usuarios ON usuarios.id = resenas.usuario_id
                              ORDER BY resenas.id DESC");
while ($fila = mysqli_fetch_assoc($r)) {
    $lista[] = $fila;
}

echo json_encode($lista);
