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
    "Alexa&Katie",
    "Bridgerton",
    "The Boys",
    "Prison Break",
    "The Last of Us",
    "The 100",
    "Merlina",
    "The Walking Dead",
    "The Vampire Diaries",
    "Breaking Bad",
    "Euphoria",
    "Élite",
    "The Big Bang Theory",
    "Cómo conocí a tu madre",
    "Los simuladores",
    "Floricienta",
    "Hannah Montana",
    "Loki",
    "WandaVision",
    "You",
    "Nuestro planeta"
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
            "Pongo y Perdita intentan rescatar a sus cachorros cuando Cruella de Vil planea utilizarlos para fabricar un abrigo.",

        "Diario de una pasión":
            "Noah y Allie se enamoran durante un verano, pero las diferencias sociales los separan y el destino vuelve a cruzarlos años después.",

        "Bajo la misma estrella":
            "Hazel y Gus, dos jóvenes que enfrentan el cáncer, se conocen en un grupo de apoyo y viven una historia de amor inolvidable.",

        "Orgullo y prejuicio":
            "Elizabeth Bennet y el reservado señor Darcy deben superar sus prejuicios y el orgullo para reconocer lo que sienten.",

        "10 cosas que odio de ti":
            "Para poder salir con la chica que le gusta, un alumno paga al chico más temido del colegio para que invite a salir a su difícil hermana.",

        "A dos metros de ti":
            "Dos adolescentes con fibrosis quística deben mantener la distancia por su salud, pero el amor los hace desafiar las reglas.",

        "Culpa mía":
            "Noah debe mudarse a la mansión de su padrastro y allí conoce a Nick, un joven rebelde con quien comienza una relación prohibida.",

        "Titanic":
            "Jack y Rose se enamoran a bordo del famoso transatlántico mientras el barco avanza hacia su trágico destino.",

        "Bridgerton":
            "En la alta sociedad londinense del siglo XIX, la familia Bridgerton busca amor y reputación entre bailes, secretos y rumores.",

        "John Wick":
            "Un exasesino a sueldo vuelve a la acción para vengarse de quienes le arrebataron lo que más quería.",

        "Mad Max: Furia en el camino":
            "En un desierto postapocalíptico, Furiosa y Max huyen de un tirano en una persecución llena de vehículos extremos.",

        "Top Gun: Maverick":
            "Tras treinta años de servicio, Maverick vuelve a entrenar a una nueva generación de pilotos para una misión casi imposible.",

        "Gladiador":
            "Un general romano traicionado se convierte en gladiador y busca venganza contra el emperador que destruyó a su familia.",

        "The Boys":
            "Un grupo de vigilantes se enfrenta a superhéroes corruptos que abusan de su poder y de su fama.",

        "Prison Break":
            "Michael Scofield se hace encarcelar a propósito para planear la fuga de su hermano, condenado injustamente a muerte.",

        "Avatar":
            "Un ex marine viaja a Pandora, donde se une al pueblo Na'vi y debe elegir de qué lado está en un conflicto por el planeta.",

        "Matrix":
            "Un programador descubre que el mundo que conoce es una simulación y se une a la rebelión contra las máquinas.",

        "El origen":
            "Un ladrón especializado en robar secretos a través de los sueños recibe una misión: implantar una idea en la mente de alguien.",

        "Dune":
            "Paul Atreides viaja al peligroso planeta desértico Arrakis, clave para el futuro de la galaxia, y enfrenta su destino.",

        "Volver al futuro":
            "Marty McFly viaja al pasado en una máquina del tiempo y debe asegurarse de que sus padres se enamoren para poder existir.",

        "Los juegos del hambre":
            "Katniss se ofrece como voluntaria para un torneo mortal televisado y debe sobrevivir para volver con su familia.",

        "The Last of Us":
            "Joel debe escoltar a la joven Ellie a través de un Estados Unidos devastado por una infección que transformó a la humanidad.",

        "The 100":
            "Cien jóvenes son enviados desde una nave espacial a una Tierra arrasada por la radiación para ver si puede volver a habitarse.",

        "El conjuro":
            "Los investigadores paranormales Ed y Lorraine Warren ayudan a una familia atormentada por una presencia oscura en su casa.",

        "It":
            "Un grupo de chicos se une para enfrentar a Pennywise, una criatura que aterroriza a su pueblo tomando forma de payaso.",

        "Scream":
            "Un asesino enmascarado acecha a un grupo de adolescentes y las reglas de las películas de terror se vuelven una cuestión de vida o muerte.",

        "La monja":
            "Un sacerdote y una novicia investigan la muerte de una monja en una abadía de Rumania y descubren una fuerza maligna.",

        "Sonríe":
            "Una psicóloga comienza a ser acosada por una presencia sobrenatural luego de presenciar un hecho traumático.",

        "Five Nights at Freddy's":
            "Un guardia nocturno descubre que los animatrónicos de una pizzería abandonada cobran vida cuando cae la noche.",

        "Merlina":
            "Merlina Addams ingresa a una academia para jóvenes marginados donde debe resolver una serie de crímenes misteriosos.",

        "The Walking Dead":
            "Un grupo de sobrevivientes lucha por mantenerse con vida en un mundo invadido por muertos vivientes.",

        "The Vampire Diaries":
            "Elena se enamora de Stefan, un vampiro, y queda en medio de secretos y rivalidades sobrenaturales en su pueblo.",

        "Joker":
            "Arthur Fleck, un hombre rechazado por la sociedad, comienza un descenso a la locura que lo convierte en un criminal icónico.",

        "Oppenheimer":
            "La historia del físico J. Robert Oppenheimer y su papel clave en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.",

        "Forrest Gump":
            "Un hombre de gran corazón y mente simple vive sin proponérselo los hechos más importantes de la historia de Estados Unidos.",

        "Argentina, 1985":
            "Un joven equipo de fiscales enfrenta el juicio a las juntas militares argentinas, en un camino lleno de presiones y amenazas.",

        "Breaking Bad":
            "Un profesor de química diagnosticado con cáncer se asocia con un ex alumno para fabricar drogas y asegurar el futuro de su familia.",

        "Euphoria":
            "Un grupo de adolescentes enfrenta el amor, las adicciones, la identidad y la presión de crecer en el mundo actual.",

        "Élite":
            "Tres estudiantes de barrio humilde llegan a un colegio de élite y chocan con sus compañeros hasta que un asesinato lo cambia todo.",

        "Superbad":
            "Dos mejores amigos intentan vivir una última gran noche de fiesta antes de terminar el colegio y separarse.",

        "¿Qué pasó ayer?":
            "Tres amigos despiertan tras una despedida de soltero en Las Vegas sin recordar nada y con el novio desaparecido.",

        "Chicas pesadas":
            "Cady, que creció en África, llega a un colegio de Estados Unidos y se mete en el mundo de las populares.",

        "Barbie":
            "Barbie vive en un mundo perfecto, pero comienza a cuestionarse todo y viaja al mundo real en busca de respuestas.",

        "The Big Bang Theory":
            "Un grupo de amigos científicos y su vecina Penny viven situaciones graciosas entre ciencia, cómics y la vida cotidiana.",

        "Cómo conocí a tu madre":
            "Ted cuenta a sus hijos cómo, junto a sus amigos, vivió todo lo que lo llevó a conocer a su madre.",

        "Los simuladores":
            "Cuatro especialistas ayudan a personas comunes a resolver problemas con elaboradas simulaciones.",

        "Harry Potter y la piedra filosofal":
            "Harry descubre que es un mago el día que cumple once años y comienza su aventura en el colegio Hogwarts.",

        "Mi pobre angelito":
            "Kevin queda solo en su casa por error en Navidad y debe defenderla de dos ladrones con trampas muy ingeniosas.",

        "Shrek":
            "Un ogro gruñón emprende una misión para rescatar a una princesa, con la ayuda de un burro muy hablador.",

        "Cómo entrenar a tu dragón":
            "Hipo, un joven vikingo, se hace amigo de un dragón herido y cambia para siempre la relación entre su pueblo y estas criaturas.",

        "Floricienta":
            "Flor, una joven con buen corazón, empieza a trabajar como niñera y vive aventuras, canciones y un gran romance.",

        "Hannah Montana":
            "Miley lleva una doble vida: es una chica común en el colegio y una estrella del pop cuando se pone su peluca.",

        "Avengers: Endgame":
            "Los Vengadores se reúnen una vez más para revertir el chasquido de Thanos y devolver el equilibrio al universo.",

        "Avengers: Infinity War":
            "Los héroes se unen para detener a Thanos, que busca las Gemas del Infinito para eliminar a la mitad de la vida del universo.",

        "Iron Man":
            "Tony Stark, un millonario inventor, construye una armadura para escapar del cautiverio y se convierte en un superhéroe.",

        "Black Panther":
            "T'Challa regresa a Wakanda para asumir el trono y debe defender a su nación de un peligroso rival.",

        "Guardianes de la Galaxia":
            "Un grupo de inadaptados se une para proteger un poderoso orbe que podría destruir la galaxia.",

        "Deadpool y Wolverine":
            "Deadpool une fuerzas con Wolverine en una misión descabellada que pondrá en riesgo el multiverso.",

        "Loki":
            "Tras escapar con el Tesseract, Loki es capturado por una agencia que vigila el tiempo y debe ayudar a arreglar la línea temporal.",

        "WandaVision":
            "Wanda y Visión viven una vida perfecta en un pueblo con aire de comedia clásica, pero algo extraño se esconde detrás.",

        "Intensamente":
            "Las emociones de Riley —Alegría, Tristeza, Furia, Miedo y Desagrado— la guían cuando su vida cambia con una mudanza.",

        "Encanto":
            "Mirabel, la única de su familia sin un don mágico, intenta salvar la casa y a los suyos de una amenaza.",

        "Soul":
            "Un profesor de música queda atrapado entre mundos y debe encontrar el verdadero sentido de la vida.",

        "Hércules":
            "Hércules, hijo de Zeus criado como mortal, debe demostrar que es un verdadero héroe para recuperar su lugar en el Olimpo.",

        "Monsters, Inc.":
            "Sulley y Mike trabajan asustando niños, pero todo cambia el día que una pequeña llega al mundo de los monstruos.",

        "Mi villano favorito":
            "Gru, un villano que planea robar la Luna, ve su vida transformada al adoptar a tres niñas.",

        "Seven":
            "Dos detectives persiguen a un asesino que basa sus crímenes en los siete pecados capitales.",

        "Shutter Island":
            "Un agente federal investiga la desaparición de una paciente en un hospital psiquiátrico y empieza a dudar de todo.",

        "Perdida":
            "Cuando Amy desaparece el día de su aniversario, su esposo se convierte en el principal sospechoso.",

        "El secreto de sus ojos":
            "Un ex empleado judicial regresa a un viejo caso de homicidio que nunca pudo olvidar y a un amor que quedó sin decir.",

        "Nueve reinas":
            "Dos estafadores se asocian por un día para vender unas estampillas falsificadas y todo se complica en Buenos Aires.",

        "You":
            "Joe se obsesiona con las personas que le atraen y llega a extremos peligrosos para estar cerca de ellas.",

        "Nuestro planeta":
            "Una serie que recorre los paisajes y especies de todo el mundo y muestra cómo el cambio climático afecta a la naturaleza.",

        "Mi maestro el pulpo":
            "Un cineasta forma una relación única con un pulpo salvaje durante un año en el mar de Sudáfrica.",

        "Free Solo":
            "Alex Honnold intenta escalar sin cuerdas ni protección la imponente pared El Capitán, en Yosemite.",

        "Diego Maradona":
            "Un recorrido por la vida del famoso futbolista, de su paso por Nápoles a su consagración y sus momentos más difíciles."
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
