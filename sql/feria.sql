CREATE DATABASE IF NOT EXISTS feria CHARACTER SET utf8mb4;
USE feria;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(150),
    password VARCHAR(100)
);

CREATE TABLE favoritas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    pelicula VARCHAR(150)
);

CREATE TABLE vistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    pelicula VARCHAR(150)
);

CREATE TABLE resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    pelicula VARCHAR(150),
    puntuacion INT,
    comentario TEXT
);
