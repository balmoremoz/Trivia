//------------------------------------------GERERACION DEL TABLERO------------------------------------------------//
let arrayPosiciones = [];
const filas = 10;
const columnas = 10;
let filaActual = 0;
let columnaActual = 0;
let posicionCat = 0;
function generarTablero(filas, columnnas) {

    const tablero = document.querySelector('.tablero');
    tablero.style.gridTemplateColumns = `repeat(${columnnas}, 1fr)`;
    tablero.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
    const arrayCat = ['G', 'H', 'D', 'C', 'A', 'E'];

    for (let i = 0; i < filas; i++) {
        arrayPosiciones[i] = []
    }

    for (let j = 0; j < columnnas; j++) {

        if (posicionCat == arrayCat.length) {
            posicionCat = 0;
        }
        arrayPosiciones[0][j] = arrayCat[posicionCat]
        posicionCat++;

    }

    for (let j = 1; j < filas; j++) {
        if (posicionCat == arrayCat.length) {
            posicionCat = 0;
        }
        arrayPosiciones[j][columnnas - 1] = arrayCat[posicionCat]
        posicionCat++
    }

    for (let j = columnnas - 2; j >= 0; j--) {
        if (posicionCat == arrayCat.length) {
            posicionCat = 0;
        }
        arrayPosiciones[filas - 1][j] = arrayCat[posicionCat]
        posicionCat++

    }

    for (let j = filas - 2; j > 0; j--) {
        if (posicionCat == arrayCat.length) {
            posicionCat = 0;
        }
        arrayPosiciones[j][0] = arrayCat[posicionCat]
        posicionCat++
    }

    for (let fila = 0; fila <= filas - 1; fila++) {
        for (let columna = 0; columna <= columnnas - 1; columna++) {
            const casilla = document.createElement('div');
            const icono = document.createElement('i');

            casilla.className = arrayPosiciones[fila][columna];

            switch (casilla.className) {
                case 'H':
                    icono.className = "fa fa-university";
                    break;
                case 'C':
                    icono.className = "fa fa-flask";
                    break;
                case 'A':
                    icono.className = "fa fa-paint-brush";
                    break;
                case 'E':
                    icono.className = "fa fa-film";
                    break;
                case 'D':
                    icono.className = "fa fa-bicycle";
                    break;
                case 'G':
                    icono.className = "fa fa-map";
                    break;
            }
            casilla.appendChild(icono);
            tablero.appendChild(casilla);
        }
    }
}

generarTablero(filas, columnas);
//-----------------------------------DADO------------------------------------------------------------------------------//
const cube = document.querySelector('.cube');
const time = 0.5;
let respondida;
//cube.addEventListener('click', () => {
function girarDado() {
    popUp.style.display = "none";
    cube.style.transition = '';
    cube.style.transform = `translateY(40px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    respondida = 0;
    const randomValue = Math.floor((Math.random() * 6) + 1);
    setTimeout(() => {
        cube.style.transition = `transform ${time}s`;
        switch (randomValue) {
            case 1:
                cube.style.transform = `translateY(40px) rotateX(3600deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 2:
                cube.style.transform = `translateY(40px) rotateX(4410deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 3:
                cube.style.transform = `translateY(40px) rotateX(3600deg) rotateY(4410deg) rotateZ(3600deg)`;
                break;
            case 4:
                cube.style.transform = `translateY(40px) rotateX(3600deg) rotateY(2430deg) rotateZ(3600deg)`;
                break;
            case 5:
                cube.style.transform = `translateY(40px) rotateX(2430deg) rotateY(3600deg) rotateZ(3600deg)`;
                break;
            case 6:
                cube.style.transform = `translateY(40px) rotateX(3600deg) rotateY(1980deg) rotateZ(3600deg)`;
                break;
        };
    }, time);
    return new Promise((numeroRandom) => {
        setTimeout(() => {
            numeroRandom(randomValue)
        }, 1000);
    });
}
//-------------------------------------MOVIMIENTO DE LA FICHA------------------------------------------------------------//
let posicionJugadorX = 0;
let posicionJugadorY = 0;
let posicionJugadorXx = 0;
let posicionJugadorYy = 0;
const ficha = document.getElementById("player");
const preguntaPopup = document.getElementById("popUpPregunta");
const formRespuestas = document.getElementById("respuestas");
const preguntaP = document.getElementById("pregunta");
const tamanoSaltoHorizontal = document.querySelector(".H").offsetWidth;
const tamanoSaltoVertical = document.querySelector(".H").offsetHeight;
async function tirar() {
    preguntaP.innerText = "";

    while (formRespuestas.firstChild) {
        formRespuestas.removeChild(formRespuestas.firstChild);
    }
    const numeroCasillas = await girarDado();
    console.log(numeroCasillas)
    if (posicionJugadorX < tamanoSaltoHorizontal * (columnas - 1)) {
        console.log("metodo1");
        moveDerecha(numeroCasillas);
    } else if (posicionJugadorY < tamanoSaltoVertical * (filas - 1)) {
        console.log("metodo2");
        moveArribaAbajo(numeroCasillas);
    } else if (posicionJugadorX >= tamanoSaltoHorizontal * (columnas - 1) && (posicionJugadorY >= tamanoSaltoVertical * (filas - 1))) {
        console.log("metodo3");
        moveIzquierda(numeroCasillas);
    } else {
        console.log("metodo4");
        moveAbajoArriba(numeroCasillas);
    }
}

function moveDerecha(numeroCasillas) {
    let id = null;
    clearInterval(id);
    id = setInterval(frame, 5);
    let pos = 0;
    let auxNumCasillas = numeroCasillas * tamanoSaltoHorizontal;
    function frame() {
        if (posicionJugadorX >= tamanoSaltoHorizontal * (columnas - 1)) {
            columnaActual = posicionJugadorX / tamanoSaltoHorizontal;
            moveArribaAbajo(Math.round(auxNumCasillas / tamanoSaltoHorizontal));
            clearInterval(id);
        }
        if (posicionJugadorX < tamanoSaltoHorizontal * (columnas - 1)) {
            if (pos >= numeroCasillas * tamanoSaltoHorizontal) {
                columnaActual = posicionJugadorX / tamanoSaltoHorizontal;
                cargarPregunta(arrayPosiciones[filaActual][columnaActual])
                clearInterval(id);
            } else {
                posicionJugadorX++;
                pos++;
                auxNumCasillas--;
                ficha.style.left = posicionJugadorX + "px";
            }
        }
    }
}

function moveArribaAbajo(numeroCasillas) {
    let idTb = null;
    clearInterval(idTb);
    idTb = setInterval(frameAb, 5);
    let pos = 0;
    let auxNumCasillas = numeroCasillas * tamanoSaltoVertical;
    function frameAb() {
        if (posicionJugadorY >= tamanoSaltoVertical * (filas - 1)) {
            filaActual = posicionJugadorY / tamanoSaltoVertical;
            moveIzquierda(Math.round(auxNumCasillas / tamanoSaltoHorizontal));
            clearInterval(idTb);
        }
        if (posicionJugadorY < tamanoSaltoVertical * (filas - 1)) {
            if (pos >= numeroCasillas * tamanoSaltoVertical) {
                clearInterval(idTb);
                filaActual = posicionJugadorY / tamanoSaltoVertical;
                cargarPregunta(arrayPosiciones[filaActual][columnaActual])
            } else {
                posicionJugadorY++;
                pos++;
                auxNumCasillas--;
                ficha.style.top = posicionJugadorY + "px";
            }
        }
    }
}
let primeraI = true
function moveIzquierda(numeroCasillas) {
    if (primeraI) {
        posicionJugadorXx = posicionJugadorX;
        primeraI = false
    }
    let idIzq = null;
    let posIzq = 0;
    clearInterval(idIzq);
    idIzq = setInterval(frameIzq, 5);
    let auxNumCasillas = numeroCasillas * tamanoSaltoHorizontal;

    function frameIzq() {
        if (posicionJugadorXx == 0) {
            moveAbajoArriba(Math.round(auxNumCasillas / tamanoSaltoVertical))
            columnaActual = posicionJugadorXx / tamanoSaltoHorizontal;
            console.log(columnaActual)
            clearInterval(idIzq);
        }
        if (posicionJugadorXx > 0) {
            if (posIzq >= numeroCasillas * tamanoSaltoHorizontal) {
                columnaActual = posicionJugadorXx / tamanoSaltoHorizontal;
                (arrayPosiciones[filaActual][columnaActual])
                clearInterval(idIzq);
                cargarPregunta(arrayPosiciones[filaActual][columnaActual])
            } else {
                posIzq++;
                posicionJugadorXx--;
                auxNumCasillas--;
                ficha.style.left = posicionJugadorXx + "px";
            }
        }
    }
}
let primeraD = true
function moveAbajoArriba(numeroCasillas) {
    let auxNumCasillas = numeroCasillas * tamanoSaltoVertical;
    if (primeraD) {
        posicionJugadorYy = posicionJugadorY;
        primeraD = false
    }
    let id = null;
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);

    function frame() {
        if (posicionJugadorYy == 0) {
            posicionJugadorX = 0;
            posicionJugadorY = 0;
            posicionJugadorXx = 0;
            posicionJugadorYy = 0;
            primeraD = true;
            primeraI = true;
            moveDerecha(Math.round(auxNumCasillas / tamanoSaltoHorizontal))
            filaActual = posicionJugadorYy / tamanoSaltoVertical;
            clearInterval(id);
        }
        if (posicionJugadorYy > 0) {
            if (pos >= numeroCasillas * tamanoSaltoVertical) {
                filaActual = posicionJugadorYy / tamanoSaltoVertical;
                cargarPregunta(arrayPosiciones[filaActual][columnaActual])
                clearInterval(id);
            } else {
                posicionJugadorYy--;
                pos++;
                auxNumCasillas--;
                ficha.style.top = posicionJugadorYy + "px";
            }
        }
    }

}
//-----------------------------------------LLAMADAS BACK-----------------------------------------------------------//
const popUp = document.getElementById("popUpPregunta");
let urlPreguntas = 'http://localhost:8081/pregunta/';
let urlRespuestas = 'http://localhost:8081/respuesta/';
let idRespuestaCorregir;
cont = 1
function cargarPregunta(categoriaActual) {

    let categoria;
    let pregunta = new Object();
    let xhr = new XMLHttpRequest();

    popUp.style.display = "block"
    cube.style.display = "none";
    switch (categoriaActual) {
        case 'H':
            categoria = "Historia"
            break;
        case 'G':
            categoria = "Geografía"
            break;
        case 'A':
            categoria = "Arte y Literatura"
            break;
        case 'D':
            categoria = "Deportes y Pasatiempos"
            break;
        case 'E':
            categoria = "Entretenimiento"
            break;
        case 'C':
            categoria = "Ciencias y Naturaleza"
            break;
    }

    xhr.open('GET', urlPreguntas + "/categoria?categoria=" + categoria, true);

    xhr.onload = function () {

        if (xhr.status >= 200 && xhr.status < 300) {

            let responseData = JSON.parse(xhr.responseText);
            pregunta = responseData;

            preguntaP.innerText = pregunta.pregunta;
            //preguntaPopup.appendChild(preguntaP);
            preguntaPopup.style.top = (tamanoSaltoVertical * filas) + "px";
            let btnConfirmar = document.createElement("button")
            btnConfirmar.setAttribute("type", "button")
            btnConfirmar.setAttribute("onclick", "corregirRespuesta()")
            btnConfirmar.setAttribute("id", "btnConfirmar");
            btnConfirmar.innerText = "CONFIRMAR"
            btnConfirmar.style.marginTop = "20px";
            btnConfirmar.style.width = "fit-content";

            pregunta.respuestas.forEach(respuesta => {
                let respuestaRb = document.createElement("input")
                let labelRepuesta = document.createElement("label")
                labelRepuesta.setAttribute("class", "labelRespuesta");
                respuestaRb.setAttribute("type", "radio")
                respuestaRb.setAttribute("name", "respuesta")
                respuestaRb.setAttribute("value", respuesta.id)
                labelRepuesta.innerText = respuesta.respuesta;
                labelRepuesta.style.marginTop = "10px";

                respuestaRb.style.visibility = "hidden"
                formRespuestas.appendChild(labelRepuesta);

                labelRepuesta.appendChild(respuestaRb);

                if (cont == 1) {
                    labelRepuesta.style.gridColumnStart = "1"
                }
                if (cont == 2) {
                    labelRepuesta.style.gridColumnStart = "2"
                    cont = 0;
                }
                cont++

                //-----------SELECCION DE RESPUESTAS-------------------------///
                let radios = document.forms["respuestas"].elements["respuesta"];
                for (let i = 0, max = radios.length; i < max; i++) {
                    radios[i].onclick = function () {
                        corregirRespuesta(this, this.value)
                    }
                }
            });
            btnConfirmar.style.gridRowStart = "3"
        } else {
            console.error('Error', xhr.statusText);
        }

    };

    xhr.onerror = function () {
        console.error('Error');
    };
    xhr.send();
}

function corregirRespuesta(radio, idRespuesta) {

    if (respondida == 0) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', urlRespuestas + "corregir?idRespuesta=" + idRespuesta, true);
        xhr.onload = function () {

            if (xhr.status >= 200 && xhr.status < 300) {
                let responseData = xhr.responseText;


                if (responseData == "true") {

                    radio.parentNode.style.backgroundColor = "green"

                } else if (responseData == "false") {

                    radio.parentNode.style.backgroundColor = "red"
                }

            } else {
                console.error('Error', xhr.statusText);
            }
        }
        xhr.onerror = function () {
            console.error('Error');
        };
        xhr.send();
        cube.style.display = "block"
        respondida = 1;
    }
}

