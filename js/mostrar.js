
function mostrarSugerencias() {
    traerApi('https://api.giphy.com/v1/gifs/random?api_key=' + apiKey + '&tag=&rating=G')
        .then(mostrar);
};
function sugerenciasPorCuatro() {
    for (i = 0; i < 4; i++) {
        mostrarSugerencias();
    }
};
function mostrarTendencias() {
    traerApi('https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=12&rating=G')
        .then(tendencias);
};

function tendencias(datos) {
    for (i = 0; i < datos.data.length; i++) {

        let tendenciasContainer = document.getElementById('contenedor-tendencias');
        let imagen = document.createElement('img');
        imagen.src = datos.data[i].images.downsized_large.url;
        imagen.classList.add('tendencia');
        tendenciasContainer.appendChild(imagen);
        let descripcion = document.createElement('p');
        descripcion.classList.add = ('p');
     
    }
};

function mostrar(random) {
    let contenedorSugerencias = document.getElementById('contenedor-sugerencias');
    let box = document.createElement('div');
    box.classList.add('sugerencia');
    contenedorSugerencias.appendChild(box);

    let descripcion = document.createElement('p');
    descripcion.id = 'titulo';
    descripcion.innerHTML = ('#') + random.data.title;
    let cruz = document.createElement('img');
    cruz.src = './assets/close.svg';
    descripcion.appendChild(cruz);
    descripcion.classList.add('p');
    box.appendChild(descripcion);

    let boton = document.createElement('button');
    boton.id = 'giphys-sugeridos';
    box.appendChild(boton);
    boton.innerHTML = 'Ver más';
    boton.addEventListener('click',() =>{
        let titulo = random.data.title;
        traerApi('http://api.giphy.com/v1/gifs/search?q=' + titulo + '&api_key=' + apiKey)
        .then(busquedasEncontradas);
    })

    let imagen = document.createElement('img');
    imagen.src = random.data.images.downsized_large.url;
    imagen.classList.add('sugerencia');
    imagen.id = 'giphy-sugerido';
    box.appendChild(imagen);

};


function mostrarVerMas() {
    let input = document.getElementById('input-buscar');
    let title = document.getElementById('titulo');
    input.value = title.innerText;
    let boton = document.createElement('button');
    
};
