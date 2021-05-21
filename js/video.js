
const mostrarBloqueGrabacion = () => {
    document.getElementById('cuadroVideo').hidden = false;
    document.getElementById('cuadromensaje').hidden = true;
};

const cambiarBotonVideo = () => {
    document.getElementById('boton-detener').hidden = false;
    document.getElementById('btn-comenzar').hidden = true;


}

const cambiarBotonDetener = () => {

    document.getElementById('boton-detener').hidden = true;
    document.getElementById('boton-subir').hidden = false;
    document.getElementById('boton-camara').hidden = true;
    document.getElementById('boton-repetir').hidden = false;
    document.getElementById('barraSubiendoGuifo').hidden = true;

    document.getElementById('boton-grabando').hidden = true;
    document.getElementById('barraVistaPrevia').style.display = "block";
    document.getElementById('barraCapturando').style.display = "none";

}

const getStreamAndRecord = () => {
    navigator.mediaDevices
        .getUserMedia({
            audio: false,
            video: {
                width: 800,
                height: 448
            }
        })
        .then(comenzarGrabacion);
};

let recorder;

const comenzarGrabacion = stream => {
    video.srcObject = stream;
    video.play();


    recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
            console.log('started');
        }
    });
    recorder.startRecording();
};

const frenarGrabacion = async () => {

    document.getElementById('video').hidden = true;
    document.getElementById('imagenn').hidden = false;


    recorder.stopRecording();

    let blob = recorder.getBlob();
    const imagen = document.getElementById('imagenn');
    const objURL = URL.createObjectURL(blob);
    imagen.src = objURL;
    imagen.setAttribute("width", "800")
    imagen.setAttribute("height", "434");
    let contenedor = document.getElementById("video-wrap");
    contenedor.appendChild(imagen);
    console.log('vista previa')

    //COPIAR EN EL PORTAPAPELES EL GIF QUE OBTUVE
    let botonCopiar = document.getElementById("copiar-enlace");
    botonCopiar.setAttribute("url", objURL)
    navigator.clipboard.writeText(objURL);

    //DESCARGAR EL GIF QUE OBTUVE
    let a = document.getElementById("descarga")
    a.setAttribute("href", objURL);

};

const apiKey = 'JPycizfbKZivbIASGtZyMg6m60hPcOXk';

const mostrarGuifo = async () => {

    document.getElementById("imagenn").style.display = "none";
    document.getElementById("globo").hidden = false;
    document.getElementById("fondo-blanco").hidden = false;
    document.getElementById("boton-cancel").hidden = false;
    document.getElementById("parrafo-subir").style.display = "block";
    document.getElementById("parrafo-tiempo").style.display = "block";
    document.getElementsByClassName("barra").hidden = false;
    document.getElementById('boton-subir').hidden = true;
    document.getElementById('boton-repetir').hidden = true;

    document.getElementById('barraVistaPrevia').style.display = "none";
    document.getElementById('barraSubiendoGuifo').style.display = "block";

    




    //GENERANDO ARCHIVO PARA SUBIR 
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    form.append('apiKey', apiKey)
    console.log(form.get('file'))
    subirAGhipy(form);
}

async function subirAGhipy(form) {
    fetch('https://upload.giphy.com/v1/gifs?' + 'api_key=' + apiKey, {
        method: 'POST',
        body: form,
        mode: "cors"
    }).then(async function (response) {
        if (response.ok) {
            let jSON = await response.json();
            console.log(jSON)
            return jSON
        } else {
            throw "Error en la llamada";
        }

    }).then(datos => {
        let gifId = datos.data.id;
        let gifs = JSON.parse(localStorage.getItem('url')) || [];
        gifs.push(`https://media1.giphy.com/media/${gifId}/giphy.gif?cid=52afa79a31b48e99d4268c4cc71df9dcbf8f8b3c9db10a07&rid=giphy.gif`);
        localStorage.setItem("url", JSON.stringify(gifs));

        gifs.forEach(misGuifos);
    });
    setTimeout("verGuifo()", 3000);


}


function misGuifos(mostrar) {
    let contenedorGeneral = document.getElementById("contenedor-misgifs");
    let miGif = document.createElement('img');
    miGif.classList.add('miGif');
    miGif.style.marginLeft = "25px";
    miGif.style.marginBottom = "25px";
    miGif.src = mostrar;
    console.log(mostrar);
    contenedorGeneral.appendChild(miGif);
}


const verGuifo = async () => {

    document.getElementById('fondo-blanco').hidden = true;
    document.getElementById("bloque-mostrar-gif").hidden = false;
    document.getElementById("video-wrap").hidden = true;
    document.getElementById("comandos").style.display = 'none';
    let imagen = document.getElementById("imagenn");
    imagen.style.display = "block";
    let contenedor2 = document.getElementById("enmarcar-gif");
    contenedor2.appendChild(imagen);
    imagen.setAttribute("width", "365")
    imagen.setAttribute("height", "191");
    document.getElementById("ultimo-bloque").hidden = false;


};


window.onload = () => {
    const grabar = document.getElementById('btn-comenzar');
    const detener = document.getElementById('boton-detener');
    const subirGif = document.getElementById('boton-subir');


    grabar.addEventListener('click', mostrarBloqueGrabacion);
    grabar.addEventListener('click', getStreamAndRecord);
    grabar.addEventListener('click', cambiarBotonVideo);
    detener.addEventListener('click', frenarGrabacion);
    detener.addEventListener('click', cambiarBotonDetener);
    subirGif.addEventListener('click', mostrarGuifo);

};
