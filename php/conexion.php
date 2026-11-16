<?php
session_start();

$conexion = mysqli_connect("localhost", "root", "", "feria");
mysqli_set_charset($conexion, "utf8mb4");
