console.log("JavaScript conectado correctamente");

let busqueda = document.querySelector("#busqueda");
let orden = document.querySelector("#orden");
let grilla = document.querySelector(".grid-peliculas");

let nombresSeries = [
    "Emily in Paris",
    "Stranger Things",
    "Gossip Girl",
    "Outer Banks",
    "La casa de papel",
    "Envidiosa",
    "El verano en que me enamoré",
    "The office",
    "Ginny & Georgia",
    "Division Palermo",
    "Rebelde way",
    "Friends",
    "iCarly",
    "Alexa&Katie"
];

function esSerie(tarjeta) {
    let titulo = tarjeta.querySelector("h3");

    if (!titulo) {
        return false;
    }

    return nombresSeries.includes(titulo.textContent.trim());
}

if (busqueda) {
    busqueda.addEventListener("input", function () {
        let texto = busqueda.value.toLowerCase();

        let tarjetas = document.querySelectorAll(
            ".grid-peliculas > .tarjeta-pelicula, .grid-peliculas > .tarjeta"
        );

        tarjetas.forEach(function (tarjeta) {
            let titulo = tarjeta.querySelector("h3");

            if (titulo) {
                if (titulo.textContent.toLowerCase().includes(texto)) {
                    tarjeta.style.display = "";
                } else {
                    tarjeta.style.display = "none";
                }
            }
        });
    });
}

if (orden && grilla) {
    let ordenOriginal = Array.from(grilla.children);

    orden.addEventListener("change", function () {
        let tarjetas = Array.from(grilla.children);

        if (orden.value === "series") {
            tarjetas.forEach(function (tarjeta) {
                tarjeta.style.display = esSerie(tarjeta) ? "" : "none";
            });

            return;
        }

        if (orden.value === "peliculas") {
            tarjetas.forEach(function (tarjeta) {
                tarjeta.style.display = esSerie(tarjeta) ? "none" : "";
            });

            return;
        }

        tarjetas.forEach(function (tarjeta) {
            tarjeta.style.display = "";
        });

        if (orden.value === "mayor") {
            tarjetas.sort(function (a, b) {
                let notaA = parseFloat(a.querySelector(".nota").textContent);
                let notaB = parseFloat(b.querySelector(".nota").textContent);

                return notaB - notaA;
            });
        }

        if (orden.value === "menor") {
            tarjetas.sort(function (a, b) {
                let notaA = parseFloat(a.querySelector(".nota").textContent);
                let notaB = parseFloat(b.querySelector(".nota").textContent);

                return notaA - notaB;
            });
        }

        if (orden.value === "nombre") {
            tarjetas.sort(function (a, b) {
                let nombreA = a.querySelector("h3").textContent;
                let nombreB = b.querySelector("h3").textContent;

                return nombreA.localeCompare(nombreB);
            });
        }

        if (orden.value === "normal") {
            tarjetas = ordenOriginal.slice();
        }

        tarjetas.forEach(function (tarjeta) {
            grilla.appendChild(tarjeta);
        });
    });
}

let botonRecomendacion = document.querySelector("#btn-recomendacion");
let resultadoRecomendacion = document.querySelector("#resultado-recomendacion");

if (botonRecomendacion && resultadoRecomendacion) {
    botonRecomendacion.addEventListener("click", function () {
        let tarjetas = document.querySelectorAll(
            ".grid-peliculas > .tarjeta-pelicula, .grid-peliculas > .tarjeta"
        );

        let visibles = Array.from(tarjetas).filter(function (tarjeta) {
            return tarjeta.style.display !== "none";
        });

        if (visibles.length === 0) {
            return;
        }

        let numeroAleatorio = Math.floor(Math.random() * visibles.length);
        let peliculaElegida = visibles[numeroAleatorio];

        let nombre = peliculaElegida.querySelector("h3").textContent;
        let estrellas = peliculaElegida.querySelector(".estrellas").textContent;

        resultadoRecomendacion.innerHTML = `
            <p>Tu recomendación de hoy es:</p>
            <h3>${nombre}</h3>
            <p>${estrellas}</p>
        `;
    });
}

let tarjetas = document.querySelectorAll(
    ".tarjeta-pelicula, .tarjeta"
);

let modal = document.querySelector("#modal-pelicula");
let cerrarModal = document.querySelector("#cerrar-modal");
let modalImagen = document.querySelector("#modal-imagen");
let modalTitulo = document.querySelector("#modal-titulo");
let modalDatos = document.querySelector("#modal-datos");
let modalEstrellas = document.querySelector("#modal-estrellas");
let modalDescripcion = document.querySelector("#modal-descripcion");

if (
    modal &&
    cerrarModal &&
    modalImagen &&
    modalTitulo &&
    modalDatos &&
    modalEstrellas &&
    modalDescripcion
) {
    tarjetas.forEach(function (tarjeta) {
        tarjeta.addEventListener("click", function () {
            let imagen = tarjeta.querySelector("img");
            let titulo = tarjeta.querySelector("h3");

            let datos =
                tarjeta.querySelector(".info-pelicula") ||
                tarjeta.querySelector(".tarjeta-info p");

            let estrellas = tarjeta.querySelector(".estrellas");

            if (!imagen || !titulo || !estrellas) {
                return;
            }

            modalImagen.src = imagen.src;
            modalImagen.alt = titulo.textContent;
            modalTitulo.textContent = titulo.textContent;

            if (datos) {
                modalDatos.textContent = datos.textContent;
            } else {
                modalDatos.textContent = "";
            }

            modalEstrellas.textContent = estrellas.textContent;

            modalDescripcion.textContent =
                obtenerDescripcion(titulo.textContent);

            crearBotonVista(titulo.textContent);

            modal.style.display = "flex";
        });
    });

    cerrarModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            modal.style.display = "none";
        }
    });
}

function obtenerDescripcion(titulo) {
    let descripciones = {
        "Emily in Paris":
            "Emily se muda a París por trabajo y comienza una nueva etapa llena de desafíos, amistades, moda y romances.",

        "Interestelar":
            "Un grupo de astronautas emprende un viaje por el espacio en busca de un nuevo hogar para la humanidad.",

        "Spider-Man No Way Home":
            "Peter Parker intenta solucionar el problema de que su identidad haya sido revelada, pero termina enfrentándose a amenazas de otros universos.",

        "Stranger Things":
            "Un grupo de amigos se enfrenta a misterios, criaturas sobrenaturales y secretos mientras intenta proteger a su pueblo.",

        "La La Land":
            "Una aspirante a actriz y un músico de jazz se conocen en Los Ángeles y persiguen sus sueños mientras intentan mantener su relación.",

        "Gossip Girl":
            "La vida de un grupo de jóvenes de la élite de Nueva York queda expuesta cuando una misteriosa persona comienza a revelar sus secretos.",

        "A través de mi ventana":
            "Raquel está enamorada de su vecino desde hace años y finalmente comienza una relación con él, enfrentándose a las diferencias entre sus mundos.",

        "Outer Banks":
            "Un grupo de amigos se embarca en una aventura llena de secretos, tesoros, misterios y peligros mientras busca respuestas sobre un antiguo tesoro.",

        "La sociedad de la nieve":
            "Después de un accidente aéreo en los Andes, un grupo de sobrevivientes debe enfrentar condiciones extremas y luchar por mantenerse con vida.",

        "Envidiosa":
            "Una mujer atraviesa una etapa de cambios mientras intenta encontrar el equilibrio entre sus relaciones, su vida personal y sus propios deseos.",

        "A todos los chicos de los que me enamoré":
            "La vida amorosa de Lara Jean cambia por completo cuando las cartas secretas que escribió para sus antiguos amores llegan inesperadamente a sus destinatarios.",

        "La casa de papel":
            "Un grupo de criminales lleva adelante un elaborado plan para realizar un gran atraco mientras intenta escapar de la policía.",

        "La calle del terror":
            "Un grupo de adolescentes descubre que una serie de asesinatos está relacionada con una antigua maldición que afecta a su pueblo.",

        "El verano en que me enamoré":
            "Belly pasa sus vacaciones de verano junto al mar y se encuentra en medio de cambios, amistades y un complicado triángulo amoroso.",

        "Rockstar Duki":
            "Un documental que muestra el recorrido de Duki, su crecimiento artístico y el camino que lo llevó a convertirse en una de las figuras más importantes del trap argentino.",

        "Rockstar: Duki":
            "Un documental que muestra el recorrido de Duki, su crecimiento artístico y el camino que lo llevó a convertirse en una de las figuras más importantes del trap argentino.",

        "The office":
            "Una comedia que muestra el día a día de los empleados de una oficina y las situaciones absurdas, incómodas y divertidas que ocurren en su lugar de trabajo.",

        "Son como niños":
            "Un grupo de amigos se reúne después de muchos años y descubre que pasar unas vacaciones juntos con sus familias puede ser mucho más caótico de lo que imaginaban.",

        "Ginny & Georgia":
            "Ginny y su madre Georgia comienzan una nueva vida en un pequeño pueblo, pero los secretos del pasado de Georgia comienzan a salir a la luz.",

        "Division Palermo":
            "Una comedia argentina que sigue a un grupo de personas que forma una particular guardia urbana y se enfrenta a situaciones inesperadas.",

        "División Palermo":
            "Una comedia argentina que sigue a un grupo de personas que forma una particular guardia urbana y se enfrenta a situaciones inesperadas.",

        "Rebelde way":
            "Un grupo de estudiantes de un colegio privado atraviesa amistades, romances, conflictos familiares y diferentes desafíos durante su adolescencia.",

        "Friends":
            "Un grupo de amigos comparte su vida en Nueva York mientras atraviesa relaciones, trabajos, problemas y muchas situaciones divertidas.",

        "iCarly":
            "Carly y sus amigos crean un programa de internet que rápidamente se vuelve popular mientras viven distintas aventuras durante su adolescencia.",

        "Metegol":
            "Amadeo descubre que los jugadores de su metegol cobran vida y juntos emprenden una aventura para enfrentar a un antiguo rival.",

        "Alexa&Katie":
            "Dos mejores amigas atraviesan juntas distintas situaciones de la adolescencia mientras enfrentan cambios y nuevos desafíos.",

        "El stand de los besos":
            "Elle y Lee son mejores amigos, pero cuando Elle comienza a acercarse al hermano mayor de Lee, tendrá que enfrentar las complicaciones del amor y la amistad.",

        "Rápidos y furiosos 5: Sin control":
            "Dom y Brian reúnen a un equipo para realizar un gran robo en Río de Janeiro mientras intentan escapar de un poderoso empresario y de un agente federal.",

        "Alerta roja":
            "Un agente del FBI se une a una famosa ladrona de arte para capturar a otro criminal que roba objetos históricos y siempre parece ir un paso adelante.",

        "Gran Turismo":
            "Un joven fanático de los videojuegos de carreras consigue la oportunidad de convertirse en piloto profesional y demostrar que sus habilidades pueden servir en las pistas reales.",

        "Guerra Mundial Z":
            "Un exinvestigador de la ONU recorre distintos lugares del mundo para encontrar el origen de una epidemia que transforma a las personas en criaturas violentas.",

        "El Eternauta":
            "En Buenos Aires, una nevada mortal anuncia una invasión extraña y un grupo de sobrevivientes intenta mantenerse unido para enfrentar la amenaza.",

        "El hombre gris":
            "Un agente de la CIA descubre secretos peligrosos de la organización y se convierte en el objetivo de un antiguo compañero que intenta eliminarlo.",

        "Cobra kai":
            "Años después de sus enfrentamientos en el karate, Johnny Lawrence y Daniel LaRusso vuelven a cruzarse y reabren viejas rivalidades mientras entrenan a nuevos alumnos.",

        "Peaky blinders":
            "Tras la Primera Guerra Mundial, Tommy Shelby lidera una banda familiar en Birmingham y busca ampliar su poder mientras enfrenta enemigos y conflictos políticos.",

        "S.W.A.T":
            "Un equipo especial de la policía de Los Ángeles se encarga de resolver situaciones de alto riesgo mientras sus integrantes deben confiar unos en otros.",

        "El marginal":
            "Un expolicía ingresa de incógnito a una prisión para investigar un secuestro y queda atrapado en un mundo de bandas, alianzas y luchas por el poder.",

        "El chapo":
            "La serie recorre el ascenso y la caída de Joaquín Guzmán, conocido como El Chapo, y muestra su relación con el narcotráfico y las autoridades.",

        "Al filo del mañana":
            "Un oficial queda atrapado en un ciclo temporal durante una guerra contra una especie extraterrestre y utiliza cada repetición para aprender a combatirla.",

        "Bumblebee":
            "Un joven robot extraterrestre llega a la Tierra y encuentra refugio junto a una adolescente que intenta ayudarlo a descubrir su lugar en el mundo.",

        "Chappie":
            "Un robot policial adquiere conciencia y comienza a aprender sobre el mundo gracias a las personas que lo rodean, mientras otros quieren controlar su tecnología.",

        "I.A Inteligencia artificial":
            "En un futuro donde existen robots con apariencia humana, un niño artificial emprende un viaje con la esperanza de convertirse en un niño de verdad.",

        "Black Mirror":
            "Una serie antológica que presenta historias independientes sobre cómo la tecnología puede cambiar la sociedad y afectar la vida de las personas.",

        "Dark":
            "La desaparición de un niño en un pueblo alemán lleva a varias familias a descubrir secretos que conectan distintas generaciones y misteriosos viajes en el tiempo.",

        "El problema de los 3 cuerpos":
            "Un grupo de científicos se enfrenta a descubrimientos inexplicables que ponen en duda las leyes conocidas y revelan una amenaza que va más allá de la Tierra.",

        "The rain":
            "Dos hermanos salen de un refugio después de que una lluvia contagiosa devastara gran parte de la población y buscan sobrevivir en un mundo peligroso.",

        "Resident alien":
            "Un extraterrestre que llega a un pequeño pueblo haciéndose pasar por médico intenta cumplir una misión secreta mientras empieza a relacionarse con los humanos.",

        "Viajeros":
            "Personas del futuro envían sus conciencias al presente para ocupar cuerpos de personas que están por morir e intentar evitar el colapso de la humanidad.",

        "Abigail":
            "Un grupo de delincuentes secuestra a una niña para pedir un rescate, pero pronto descubre que la situación es mucho más peligrosa de lo que imaginaba.",

        "El exorcista del papa":
            "Un sacerdote especializado en exorcismos investiga un caso inquietante que lo lleva a descubrir secretos ocultos dentro de una antigua institución religiosa.",

        "La noche del demonio: La puerta roja":
            "Años después de los sucesos anteriores, Josh y su hijo intentan dejar atrás su pasado, pero recuerdos inquietantes vuelven a abrir la puerta a un mundo oscuro.",

        "Cuando acecha la maldad":
            "En una zona rural, dos hermanos descubren que una presencia demoníaca amenaza a su comunidad y deben intentar detener una tragedia que se expande rápidamente.",

        "La calle del terror: Parte 2":
            "En 1978, un campamento de verano se convierte en escenario de una serie de hechos aterradores relacionados con la maldición que persigue a Shadyside.",

        "La calle del terror: Parte 3":
            "La historia viaja hasta 1666 para revelar el origen de la maldición de Shadyside y descubrir qué ocurrió realmente con Sarah Fier.",

        "Violetta":
            "Violetta regresa a Buenos Aires y descubre su pasión por la música mientras construye amistades, vive romances y enfrenta los conflictos de crecer.",

        "El rey León":
            "Simba, un joven león destinado a ser rey, debe superar la pérdida y recuperar su lugar en la sabana después de que su tío tome el poder.",

        "Frozen":
            "Anna emprende un viaje para encontrar a su hermana Elsa, cuyos poderes de hielo sumieron al reino en un invierno interminable.",

        "Enredados":
            "Rapunzel, una joven de cabello mágico que nunca salió de su torre, se aventura por primera vez al mundo exterior junto a un ladrón fugitivo.",

        "Moana":
            "Una joven navegante se lanza al océano para salvar a su pueblo y, con la ayuda del semidiós Maui, intenta devolver el equilibrio a la naturaleza.",

        "Moana 2":
            "Moana recibe una inesperada llamada de sus antepasados y emprende una nueva travesía por mares lejanos para conectar a su pueblo con otras comunidades.",

        "La sirenita":
            "Ariel, una sirena curiosa por el mundo humano, hace un trato para poder vivir en la superficie y conocer al príncipe Eric.",

        "Aladdín":
            "Un joven de buen corazón encuentra una lámpara mágica y, con la ayuda de un genio, intenta cambiar su destino y acercarse a la princesa Jasmine.",

        "La bella y la bestia":
            "Bella queda prisionera en un castillo encantado y descubre que detrás de la apariencia de la Bestia existe alguien capaz de amar y cambiar.",

        "Mulán":
            "Mulán se hace pasar por un soldado para ocupar el lugar de su padre en el ejército y demostrar su valentía mientras protege a su familia.",

        "Lilo & Stitch":
            "Lilo, una niña hawaiana, adopta a Stitch sin saber que es un experimento extraterrestre que aprenderá junto a ella el verdadero significado de la familia.",

        "Zootopia":
            "Judy Hopps, una coneja que se convierte en policía, trabaja junto a un zorro astuto para resolver un misterio en una ciudad habitada por animales.",

        "Ratatouille":
            "Remy, una rata apasionada por la cocina, encuentra la oportunidad de cumplir su sueño de convertirse en chef en un restaurante de París.",

        "Toy Story":
            "Los juguetes de Andy cobran vida cuando los humanos no están presentes y deben aprender a convivir cuando aparece un nuevo juguete llamado Buzz.",

        "Los increíbles":
            "Una familia de superhéroes intenta llevar una vida normal, pero debe volver a la acción cuando aparece una nueva amenaza.",

        "Coco":
            "Miguel sueña con ser músico y llega al mundo de los muertos, donde descubre secretos familiares y aprende sobre la importancia de recordar a sus seres queridos.",

        "Up":
            "Carl, un hombre mayor, emprende una aventura inesperada al hacer volar su casa con globos y termina acompañado por un joven explorador.",

        "WALL-E":
            "Un pequeño robot encargado de limpiar la Tierra abandonada encuentra una nueva misión cuando conoce a una robot exploradora llamada EVA.",

        "Buscando a Nemo":
            "Marlin atraviesa el océano para encontrar a su hijo Nemo, acompañado por Dory, una pez simpática que lo ayuda a superar distintos obstáculos.",

        "Cars":
            "Rayo McQueen, un auto de carreras, termina en un pequeño pueblo donde aprende importantes lecciones sobre la amistad y el trabajo en equipo.",

        "Piratas del caribe":
            "El capitán Jack Sparrow se embarca en aventuras llenas de tesoros, barcos y misterios mientras intenta escapar de sus enemigos.",

        "101 dálmatas":
            "Pongo y Perdita intentan rescatar a sus cachorros cuando Cruella de Vil planea utilizarlos para fabricar un abrigo."
    };

    return descripciones[titulo.trim()] || "Una historia para disfrutar y descubrir.";
}


// =====================================================
//  CONEXIÓN CON PHP / MYSQL
// =====================================================

const BASE = window.location.pathname.includes("/pages/") ? "../" : "";

let usuarioActual = null;
let puntuacion = 0;

async function pedirTexto(archivo, datos) {
    const respuesta = await fetch(BASE + "php/" + archivo, {
        method: "POST",
        body: new URLSearchParams(datos || {})
    });
    return await respuesta.text();
}

async function pedirJSON(archivo) {
    const respuesta = await fetch(BASE + "php/" + archivo);
    return await respuesta.json();
}

// ---------- Registro / login / logout ----------

async function registrarse() {
    let nombre = document.querySelector("#nombreRegistro").value.trim();
    let email = document.querySelector("#emailRegistro").value.trim().toLowerCase();
    let password = document.querySelector("#passwordRegistro").value;

    await pedirTexto("registro.php", {
        nombre: nombre,
        email: email,
        password: password
    });

    alert("Cuenta creada correctamente.");
    window.location.href = "iniciosesion.html";
}

async function iniciarSesion() {
    let email = document.querySelector("#emailLogin").value.trim().toLowerCase();
    let password = document.querySelector("#passwordLogin").value;

    let resultado = await pedirTexto("login.php", {
        email: email,
        password: password
    });

    if (resultado === "ok") {
        alert("Iniciaste sesión correctamente.");
        window.location.href = "../index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

async function cerrarSesion() {
    await pedirTexto("logout.php");

    alert("Sesión cerrada.");

    if (window.location.pathname.includes("/pages/")) {
        window.location.href = "../index.html";
    } else {
        window.location.href = "index.html";
    }
}

// ---------- Favoritas ----------

function iniciarFavoritas() {
    let tarjetasFavoritas = document.querySelectorAll(".tarjeta-pelicula, .tarjeta");

    tarjetasFavoritas.forEach(function (tarjeta) {
        let titulo = tarjeta.querySelector("h3");

        if (!titulo) {
            return;
        }

        let nombrePelicula = titulo.textContent.trim();
        let botonFavorito = document.createElement("button");

        botonFavorito.classList.add("boton-favorito");

        if (usuarioActual && usuarioActual.favoritas.includes(nombrePelicula)) {
            botonFavorito.textContent = "❤️";
            botonFavorito.classList.add("favorita");
        } else {
            botonFavorito.textContent = "♡";
        }

        tarjeta.appendChild(botonFavorito);

        botonFavorito.addEventListener("click", async function (evento) {
            evento.stopPropagation();

            if (!usuarioActual) {
                alert("Tenés que iniciar sesión para guardar favoritos.");
                return;
            }

            let resultado = await pedirTexto("favorito.php", { pelicula: nombrePelicula });

            if (resultado === "agregada") {
                usuarioActual.favoritas.push(nombrePelicula);
                botonFavorito.textContent = "❤️";
                botonFavorito.classList.add("favorita");
            } else {
                usuarioActual.favoritas = usuarioActual.favoritas.filter(function (p) {
                    return p !== nombrePelicula;
                });
                botonFavorito.textContent = "♡";
                botonFavorito.classList.remove("favorita");
            }
        });
    });
}

// ---------- Vistas (botón dentro del modal) ----------

function crearBotonVista(nombrePelicula) {
    let boton = document.querySelector("#boton-vista");

    if (!boton) {
        boton = document.createElement("button");

        boton.id = "boton-vista";
        boton.classList.add("btn-publicar");

        modalDescripcion.after(boton);
    }

    if (!usuarioActual) {
        boton.textContent = "Iniciá sesión para marcar como vista";

        boton.onclick = function () {
            window.location.href = BASE + "pages/iniciosesion.html";
        };

        return;
    }

    if (usuarioActual.vistas.includes(nombrePelicula)) {
        boton.textContent = "Película vista";
    } else {
        boton.textContent = "Marcar como vista";
    }

    boton.onclick = async function (evento) {
        evento.stopPropagation();

        let resultado = await pedirTexto("vista.php", { pelicula: nombrePelicula });

        if (resultado === "agregada") {
            usuarioActual.vistas.push(nombrePelicula);
            boton.textContent = "Película vista";
        } else {
            usuarioActual.vistas = usuarioActual.vistas.filter(function (p) {
                return p !== nombrePelicula;
            });
            boton.textContent = "Marcar como vista";
        }
    };
}

// ---------- Header ----------

function actualizarHeader() {
    const botones = document.querySelector("#botones");

    if (!botones) {
        return;
    }

    const rutaPages = window.location.pathname.includes("/pages/") ? "" : "pages/";

    if (!usuarioActual) {
        botones.innerHTML = `
            <a href="${rutaPages}registro.html">
                <button>Registrarse</button>
            </a>

            <a href="${rutaPages}iniciosesion.html">
                <button>Iniciar Sesión</button>
            </a>
        `;

        return;
    }

    botones.innerHTML = `
        <div class="usuario-menu">
            <button class="boton-usuario" onclick="mostrarMenuUsuario()">
                ${usuarioActual.nombre} ▼
            </button>

            <div id="menu-usuario" class="menu-usuario">
                <a href="${rutaPages}perfil.html">Mi perfil</a>
                <a href="${rutaPages}perfil.html?seccion=favoritas">Mis favoritas</a>
                <a href="${rutaPages}perfil.html?seccion=vistas">Películas vistas</a>
                <a href="${rutaPages}perfil.html?seccion=resenas">Mis reseñas</a>

                <button onclick="cerrarSesion()">Cerrar sesión</button>
            </div>
        </div>
    `;
}

function mostrarMenuUsuario() {
    const menu = document.querySelector("#menu-usuario");

    if (!menu) {
        return;
    }

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

// ---------- Perfil ----------

function cargarPerfil() {
    const nombrePerfil = document.querySelector("#nombrePerfil");
    const emailPerfil = document.querySelector("#emailPerfil");
    const favoritasPerfil = document.querySelector("#favoritasPerfil");
    const vistasPerfil = document.querySelector("#vistasPerfil");
    const opinionesPerfil = document.querySelector("#opinionesPerfil");

    // Si no estamos en perfil.html, no hacemos nada
    if (!nombrePerfil || !emailPerfil) {
        return;
    }

    if (!usuarioActual) {
        nombrePerfil.textContent = "No iniciaste sesión";
        emailPerfil.textContent = "Iniciá sesión para ver tu perfil.";
        return;
    }

    nombrePerfil.textContent = usuarioActual.nombre;
    emailPerfil.textContent = usuarioActual.email;

    const favoritas = usuarioActual.favoritas;

    favoritasPerfil.innerHTML = favoritas.length
        ? favoritas.map(pelicula => `<p>❤️ ${pelicula}</p>`).join("")
        : "<p>Todavía no tenés películas favoritas.</p>";

    const vistas = usuarioActual.vistas;

    vistasPerfil.innerHTML = vistas.length
        ? vistas.map(pelicula => `<p>🎬 ${pelicula}</p>`).join("")
        : "<p>Todavía no marcaste películas como vistas.</p>";

    const resenas = usuarioActual.resenas;

    opinionesPerfil.innerHTML = resenas.length
        ? resenas.map(resena => `
            <div class="tarjeta-opinion">
                <h3>${resena.pelicula}</h3>
                <p class="opinion-estrellas">
                    ${"★".repeat(Number(resena.puntuacion))}${"☆".repeat(5 - Number(resena.puntuacion))}
                </p>
                <p class="opinion-texto">${resena.comentario}</p>
            </div>
        `).join("")
        : "<p>Todavía no tenés reseñas publicadas.</p>";
}

function iniciarSeccionesPerfil() {
    const parametros = new URLSearchParams(window.location.search);
    const seccion = parametros.get("seccion");

    const secciones = {
        perfil: document.getElementById("seccionPerfil"),
        favoritas: document.getElementById("seccionFavoritas"),
        vistas: document.getElementById("seccionVistas"),
        resenas: document.getElementById("seccionReseñas")
    };

    // Si no estamos en perfil.html, no hacemos nada
    if (!secciones.perfil) {
        return;
    }

    Object.values(secciones).forEach(function (elemento) {
        elemento.classList.add("seccion-oculta");
    });

    if (seccion === "favoritas") {
        secciones.favoritas.classList.remove("seccion-oculta");
    } else if (seccion === "vistas") {
        secciones.vistas.classList.remove("seccion-oculta");
    } else if (seccion === "resenas") {
        secciones.resenas.classList.remove("seccion-oculta");
    } else {
        secciones.perfil.classList.remove("seccion-oculta");
    }

    document.getElementById("btnCerrarSesion").addEventListener("click", cerrarSesion);
}

// ---------- Opiniones ----------

function crearTarjetaOpinion(nombre, pelicula, estrellas, comentario) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-opinion";

    const encabezado = document.createElement("div");
    encabezado.className = "opinion-header";

    const nombreElemento = document.createElement("span");
    nombreElemento.className = "opinion-usuario";
    nombreElemento.textContent = nombre;

    const peliculaElemento = document.createElement("span");
    peliculaElemento.className = "opinion-pelicula";
    peliculaElemento.textContent = pelicula;

    encabezado.append(nombreElemento, peliculaElemento);

    const estrellasElemento = document.createElement("p");
    estrellasElemento.className = "opinion-estrellas";
    estrellasElemento.textContent =
        "★".repeat(Number(estrellas)) + "☆".repeat(5 - Number(estrellas));

    const comentarioElemento = document.createElement("p");
    comentarioElemento.className = "opinion-texto";
    comentarioElemento.textContent = comentario;

    tarjeta.append(encabezado, estrellasElemento, comentarioElemento);

    return tarjeta;
}

async function cargarOpiniones() {
    const lista = document.getElementById("lista-opiniones");

    if (!lista) {
        return;
    }

    const resenas = await pedirJSON("resenas.php");

    // Se agregan arriba de las reseñas de ejemplo que ya tiene el HTML
    resenas.reverse().forEach(function (r) {
        lista.prepend(crearTarjetaOpinion(r.nombre, r.pelicula, r.puntuacion, r.comentario));
    });
}

function iniciarFormularioOpinion() {
    const estrellas = document.querySelectorAll(".estrella");
    const botonPublicar = document.getElementById("btnPublicar");

    if (!botonPublicar) {
        return;
    }

    if (usuarioActual) {
        document.getElementById("nombreUsuario").value = usuarioActual.nombre;
    }

    estrellas.forEach(function (estrella) {
        estrella.addEventListener("click", function () {
            puntuacion = Number(this.dataset.valor);

            estrellas.forEach(function (otraEstrella) {
                otraEstrella.classList.toggle(
                    "seleccionada",
                    Number(otraEstrella.dataset.valor) <= puntuacion
                );
            });
        });
    });

    botonPublicar.addEventListener("click", publicarOpinion);
}

async function publicarOpinion() {
    const peliculaInput = document.getElementById("pelicula");
    const comentarioInput = document.getElementById("comentario");

    const pelicula = peliculaInput.value;
    const comentario = comentarioInput.value.trim();

    if (!pelicula || !comentario || puntuacion === 0) {
        alert("Completá todos los campos y seleccioná una puntuación.");
        return;
    }

    if (!usuarioActual) {
        alert("Tenés que iniciar sesión para publicar una reseña.");
        return;
    }

    await pedirTexto("resena.php", {
        pelicula: pelicula,
        puntuacion: puntuacion,
        comentario: comentario
    });

    document.getElementById("lista-opiniones").prepend(
        crearTarjetaOpinion(usuarioActual.nombre, pelicula, puntuacion, comentario)
    );

    peliculaInput.value = "";
    comentarioInput.value = "";
    puntuacion = 0;

    document.querySelectorAll(".estrella").forEach(function (estrella) {
        estrella.classList.remove("seleccionada");
    });

    alert("¡Opinión publicada con éxito!");
}

// ---------- Arranque ----------

document.addEventListener("DOMContentLoaded", async function () {
    usuarioActual = await pedirJSON("usuario.php");

    actualizarHeader();
    iniciarFavoritas();
    cargarPerfil();
    iniciarSeccionesPerfil();
    iniciarFormularioOpinion();
    cargarOpiniones();
});
