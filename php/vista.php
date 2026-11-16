<?php
include "conexion.php";

$id       = $_SESSION['usuario_id'];
$pelicula = $_POST['pelicula'];

$existe = mysqli_query($conexion, "SELECT id FROM vistas
                                   WHERE usuario_id=$id AND pelicula='$pelicula'");

if (mysqli_num_rows($existe) > 0) {
    mysqli_query($conexion, "DELETE FROM vistas
                             WHERE usuario_id=$id AND pelicula='$pelicula'");
    echo "quitada";
} else {
    mysqli_query($conexion, "INSERT INTO vistas (usuario_id, pelicula)
                             VALUES ($id, '$pelicula')");
    echo "agregada";
}
