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

let gifs = JSON.parse(localStorage.getItem('url')) || [];
gifs.forEach(misGuifos);

function misGuifos(mostrar) {
    let contenedorGeneral = document.getElementById('contenedor-misgifs');
    let miGif = document.createElement('img');
    miGif.classList.add('miGif');
    miGif.style.marginLeft = "50px";
    miGif.style.marginBottom = "25px";
    miGif.src = mostrar;
    console.log(mostrar);
    contenedorGeneral.appendChild(miGif);
}

window.onload = eventos

function eventos() {
    document.getElementById('btn-3').addEventListener('click', elegirTema);
    document.getElementById('dark').addEventListener('click', cambiarTemaOscuro);
    document.getElementById('day').addEventListener('click', cambiarTemaClaro);
}
