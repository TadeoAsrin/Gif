const apiKey = 'JPycizfbKZivbIASGtZyMg6m60hPcOXk';

window.onload = cargarPagina;


function cargarPagina() {
    sugerenciasPorCuatro();
    mostrarTendencias();
    eventos();

};

async function traerApi(url) {
    let found = await fetch(url);
    let response = await found.json();
    return response;
};

let busquedasPasadas = []
function getApiResults() {
    let busqueda = document.getElementById('input-buscar').value;
    busquedasPasadas.push(busqueda);
    localStorage.setItem('busquedasAnteriores', JSON.stringify(busquedasPasadas));
    traerApi('http://api.giphy.com/v1/gifs/search?q=' + busqueda + '&api_key=' + apiKey)
        .then(busquedasEncontradas)
        .then(mostrarUltimaBusqueda)
        .then(borrarInput);



}

function mostrarUltimaBusqueda() {
    let historial = JSON.parse(localStorage.getItem('busquedasAnteriores'));
    let contenedorBotonesDeBusqueda = document.getElementById('contenedorBotonesBusqueda');
    let botonBusquedasRealizadas = document.createElement('div');

    botonBusquedasRealizadas.innerHTML = '#' + historial[historial.length - 1];
    botonBusquedasRealizadas.classList.add('botones-guardado');
    contenedorBotonesDeBusqueda.appendChild(botonBusquedasRealizadas);

    let divbuscador = document.getElementById('contenedorDeBusqueda');
    let barranueva = document.createElement('div');

    barranueva.innerHTML = 'Busquedas realizada: ' + historial;
    barranueva.classList.add('barra-nueva');
    divbuscador.prepend(barranueva);


}

function Enter(event) {
    let buscador = document.getElementById('input-buscar').value;
    let menu = document.getElementById('menu-buscador');

    if (event.which === 13 && buscador != 0) {
        getApiResults();
        borrarInput();
       

    }
    event.stopPropagation();
}

function borrarInput() {
    let buscador = document.getElementById('input-buscar');
    buscador.value = '';
}


function elegirTema() {
    let menu = document.getElementById('menu');
    menu.style.display = 'flex';
    document.body.addEventListener('click', () => {
        menu.style.display = 'none';
    });
    event.stopPropagation()

};
function cambiarTemaOscuro() {
    let logoSailorDark = document.getElementById('logo-day');
    logoSailorDark.id = 'gifOF_logo';
    logoSailorDark.src = './assets/gifOF_logo_dark.png';
    let body = document.body;
    body.className = 'modo-oscuro';
    body.className.replace = ('modo-oscuro');

};

function cambiarTemaClaro() {
    let logoSailorDark = document.getElementById('gifOF_logo');
    logoSailorDark.id = 'logo-day';
    logoSailorDark.src = './assets/gifOF_logo.png';
    let body = document.body;
    body.className = 'day';
    body.className.replace = ('day');
};



function accionesEnElBuscador() {
    displayMenuBuscador();
    habilitarBotonBuscar();

}
function displayMenuBuscador() {
    let menu = document.getElementById('menu-buscador');
    let busqueda = document.getElementById('input-buscar');
    if (busqueda !== null) {
        menu.style.display = 'block';
        document.body.addEventListener('click', () => {
            if (menu) {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'block';
            }
        });
    };
};


function habilitarBotonBuscar() {
    let boton = document.getElementById("buscar");
    let lupa = document.getElementById('lupa');
    let buscador = document.getElementById('input-buscar').value;
    let palabrabuscar = document.getElementById('palabra-buscar');
    if (buscador.value = !null) {
        boton.value.disabled = false;
        boton.style.backgroundColor = "#F7C9F3";
        palabrabuscar.style.color = "white";
        lupa.src = './assets/lupa.svg';
    } else {
        boton.value.disabled = true;
        lupa.src = './assets/lupa_inactive.svg';
        boton.classList.remove('boton-habilitado');
    }


};


function busquedasEncontradas(datos) {
    let contenedorImagen = document.getElementById('contenedorDeBusqueda');
    let gifsEncontrados = document.createElement('div');
    gifsEncontrados.id = 'contenedorDeBusqueda';

    for (i = 0; i < datos.data.length; i++) {
        console.log(datos.data[i].images.downsized_large.url)
        let imagen = document.createElement('img');
        imagen.src = datos.data[i].images.downsized_large.url;
        gifsEncontrados.appendChild(imagen)
    };
    contenedorImagen.replaceWith(gifsEncontrados);
};

function eventos() {
    document.getElementById('input-buscar').addEventListener('keypress', accionesEnElBuscador);
    document.getElementById('palabra-buscar').addEventListener('click', getApiResults);
    document.getElementById('lupa').addEventListener('click', getApiResults);
    document.getElementById('btn-3').addEventListener('click', elegirTema);
    document.getElementById('dark').addEventListener('click', cambiarTemaOscuro);
    document.getElementById('day').addEventListener('click', cambiarTemaClaro);
    document.body.addEventListener('keypress', Enter);

};






