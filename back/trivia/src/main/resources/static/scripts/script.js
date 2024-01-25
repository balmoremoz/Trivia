var apiServerUrl = 'http://localhost:8081/pregunta/all';
let posicionCat = 0;
let arrayPosiciones = [];

function llamada() {
    let preguntas = new Array();
    let xhr = new XMLHttpRequest();

    xhr.open('GET', apiServerUrl, true);

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var responseData = JSON.parse(xhr.responseText);
            console.log('Resultado:', responseData);
            preguntas.push(responseData)

        } else {
            console.error('Error', xhr.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error');
    };
    xhr.send();
}


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
const filas = 10;
const columnas = 10;
let filaActual=0;
let columnaActual=0;
generarTablero(filas, columnas);
//-----------------------------------DADO------------------------------------------------------------------------------//
const cube = document.querySelector('.cube');
const time = 0.5;

//cube.addEventListener('click', () => {
function girarDado() {
    cube.style.transition = '';
    cube.style.transform = `translateY(40px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;

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
            setTimeout(()=>{
                numeroRandom(randomValue)
            },1000);
      });
}

let posicionJugadorX = 0;
let posicionJugadorY = 0;
let posicionJugadorXx = 0;
let posicionJugadorYy = 0;
const ficha = document.getElementById("player");
const tamanoSalto = 50;

async function tirar() {
    const numeroCasillas=await girarDado();
    console.log(numeroCasillas)
    if (posicionJugadorX < tamanoSalto * (columnas - 1)) {
        console.log("metodo1");
        moveDerecha(numeroCasillas);
    } else if (posicionJugadorY < tamanoSalto * (filas - 1)) {
        console.log("metodo2");
        moveTb(numeroCasillas);
    } else if (posicionJugadorX >= tamanoSalto * (columnas - 1)&&(posicionJugadorY >= tamanoSalto * (filas - 1))) {
        console.log("metodo3");
        moveIzquierda(numeroCasillas);
    } else {
        console.log("metodo4");
        moveBt(numeroCasillas);
    }
}

function moveDerecha(numeroCasillas) {
    let id = null;
    clearInterval(id);
    id = setInterval(frame, 5);
    let pos = 0;
    let auxNumCasillas = numeroCasillas * tamanoSalto;
    function frame() {
        if (posicionJugadorX >= tamanoSalto * (columnas - 1)) {
            columnaActual=posicionJugadorX/50;
            moveTb(Math.round(auxNumCasillas / tamanoSalto));
            clearInterval(id);
        }
        if (posicionJugadorX < tamanoSalto * (columnas - 1)) {
            if (pos >= numeroCasillas * tamanoSalto) {
                console.log("moveDerecha saltos completados")
                columnaActual=posicionJugadorX/50;
                console.log(arrayPosiciones[filaActual][columnaActual])
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

function moveTb(numeroCasillas) {
    let idTb = null;
    clearInterval(idTb);
    idTb = setInterval(frameAb, 5);
    let pos = 0;
    let auxNumCasillas = numeroCasillas * tamanoSalto;
    function frameAb() {
        if (posicionJugadorY >= tamanoSalto * (filas - 1)) {
            filaActual=posicionJugadorY/50;
            moveIzquierda(Math.round(auxNumCasillas / tamanoSalto));
            clearInterval(idTb);
        }
        if (posicionJugadorY < tamanoSalto * (filas - 1)) {
            if (pos >= numeroCasillas * tamanoSalto) {
                clearInterval(idTb);
                filaActual=posicionJugadorY/50;
                console.log(arrayPosiciones[filaActual][columnaActual])
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
        posicionJugadorXx =posicionJugadorX;
        primeraI = false
    }
    let idIzq = null;
    let posIzq = 0;
    clearInterval(idIzq);
    idIzq = setInterval(frameIzq, 5);
    let auxNumCasillas = numeroCasillas * tamanoSalto;

    function frameIzq() {
        if (posicionJugadorXx == 0) {
            moveBt(Math.round(auxNumCasillas / tamanoSalto))
            columnaActual=posicionJugadorXx/50;
            console.log(columnaActual)
            clearInterval(idIzq);
        }
        if (posicionJugadorXx > 0) {
            if (posIzq >= numeroCasillas * tamanoSalto) {
                columnaActual=posicionJugadorXx/50;
                console.log(arrayPosiciones[filaActual][columnaActual])
                console.log(columnaActual)
                console.log(filaActual)
                clearInterval(idIzq);
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
function moveBt(numeroCasillas) {
    let auxNumCasillas = numeroCasillas * tamanoSalto;
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
            primeraD=true;
            primeraI=true;
            moveDerecha(Math.round(auxNumCasillas / tamanoSalto))
            filaActual=posicionJugadorYy/50;
            clearInterval(id);
        }
        if(posicionJugadorYy>0){
            if (pos >= numeroCasillas * tamanoSalto) {
                filaActual=posicionJugadorYy/50;
                console.log(arrayPosiciones[filaActual][columnaActual])
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
