let arrayPosiciones = [];
let filaActual = 0;
let columnaActual = 0;
let posicionCat = 0;
let filas;
let columnas;
let divPregunta;
let cube;
let time;
let respondida;
let girando;
let posicionJugadorX;
let posicionJugadorY;
let posicionJugadorXx
let posicionJugadorYy
let ficha
let preguntaPopup
let formRespuestas
let preguntaP
let tamanoSaltoHorizontal
let tamanoSaltoVertical
let popUp;
let body;
let urlPreguntas;
let urlRespuestas;
let idRespuestaCorregir;
let cont
let totalPreguntas;
let preguntasCorrectas
let preguntasIncorrectas
let rachaActual
let divTotalPreguntas
let divPreguntasCorrectas
let divPreguntasIncorrectas
let divRachaAcutal
let fuegosArtificiales
let arrayJugadores
let turno
let mapa = new Map();
let catVertical;
let posicionJugador
let numeroJugadores
let puntuaciones;
let meta;
let tamanoFicha;
function inicializar() {
	divPregunta = $('divPregunta')[0];
	cube = document.querySelector('.cubo');
	time = 0.5;
	girando = false
	posicionJugadorX = 0;
	posicionJugadorY = 0;
	posicionJugadorXx = 0;
	posicionJugadorYy = 0;
	respondida = null;
	preguntaPopup = document.getElementById("popUpPregunta");
	formRespuestas = document.getElementById("respuestas");
	preguntaP = document.getElementById("pregunta");
	tamanoSaltoHorizontal = document.querySelector(".H").offsetWidth;
	tamanoSaltoVertical = document.querySelector(".H").offsetHeight;
	popUp = document.getElementById("popUpPregunta");
	body = document.getElementsByTagName("body");
	urlPreguntas = 'http://localhost:8081/pregunta/';
	urlRespuestas = 'http://localhost:8081/respuesta/';
	idRespuestaCorregir;
	cont = 1;
	//-----------------------------------------MARCADOR PREGUNTAS-------------------------------------------------------//
	totalPreguntas = 0;
	preguntasCorrectas = 0
	preguntasIncorrectas = 0
	rachaActual = 0;
	divTotalPreguntas = document.getElementById("totalPreguntas");
	divPreguntasCorrectas = document.getElementById("preguntasCorrectas");
	divPreguntasIncorrectas = document.getElementById("preguntasIncorrectas");
	divRachaAcutal = document.getElementById("rachaActual");
	fuegosArtificiales = document.getElementsByClassName("firework")[0];
	turno = 0
	posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
	tamanoFicha = 20;
}
function generarTablero(f, c, numJugadores) {
	//meta = meta;
	filas = f;
	columnas = c;
	numeroJugadores = numJugadores;
	const tablero = document.querySelector('.tablero');
	let colors = ["white", "red", "blue", "green"];

	tablero.style.gridTemplateColumns = `repeat(${columnas}, 1fr)`;
	tablero.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
	const arrayCat = ['G', 'H', 'D', 'C', 'A', 'E'];

	mapa.set("H", "fa fa-university")
	mapa.set("C", "fa fa-flask")
	mapa.set("A", "fa fa-paint-brush")
	mapa.set("E", "fa fa-film")
	mapa.set("D", "fa fa-bicycle")
	mapa.set("G", "fa fa-map")

	catVertical = arrayCat.length - 1;
	for (let i = 0; i < filas; i++) {
		arrayPosiciones[i] = []
	}
	for (let fila = 0; fila <= filas - 1; fila++) {
		for (let columna = 0; columna <= columnas - 1; columna++) {
			const casilla = document.createElement('div');
			const icono = document.createElement('i');

			//REINICIAR EL RECORRIDO DEL ARRAY DE POSICIONES
			if (posicionCat == arrayCat.length) {
				posicionCat = 0;
			}
			if (catVertical < 0) {
				catVertical = arrayCat.length - 1;
			}

			if (fila == 0) {
				arrayPosiciones[fila][columna] = arrayCat[posicionCat]
				casilla.className = arrayCat[posicionCat]
				icono.className = mapa.get(arrayCat[posicionCat])
				posicionCat++;
			} else if (columna == columnas - 1) {
				arrayPosiciones[fila][columna] = arrayCat[posicionCat]
				casilla.className = arrayCat[posicionCat]
				icono.className = mapa.get(arrayCat[posicionCat])
				posicionCat++;
			} else if (fila == filas - 1) {
				arrayPosiciones[fila][columna] = arrayCat[catVertical]
				casilla.className = arrayCat[catVertical]
				icono.className = mapa.get(arrayCat[catVertical])
				catVertical--;
			}
			else if (columna == 0) {
				arrayPosiciones[fila][columna] = arrayCat[catVertical]
				casilla.className = arrayCat[catVertical]
				icono.className = mapa.get(arrayCat[catVertical])
				catVertical--;
			}
			casilla.appendChild(icono);
			tablero.appendChild(casilla);
		}
	}
	//crear fichas
	arrayJugadores = new Array();
	for (let i = 1; i <= numJugadores; i++) {
		let fichaAnadir = document.createElement("div");
		fichaAnadir.setAttribute("id", "player" + i);
		fichaAnadir.setAttribute("class", "fa fa-user-circle player");
		arrayJugadores[i - 1] = fichaAnadir;
		$('.contenedor').append(fichaAnadir);
	}
	tamanoSaltoHorizontal = 75//CAMBIAR POR EL TAMAÑO DE LAS CASILLAS DESPUES DE LAS PRUEBAS
	tamanoSaltoVertical = 60//----------------------------------------------------------------
	puntuaciones = [numeroJugadores];
	for (let i = 1; i <= numJugadores; i++) {
		if (i % 2 != 0) {
			$("#player" + i).css("left", "0");
			$("#player" + i).css("top", (((i - 1) * tamanoSaltoVertical)) / i);
		} else {
			$("#player" + i).css("left", tamanoSaltoHorizontal - 20);//20=tamaño de la ficha
			$("#player" + i).css("top", (((i - 2) * tamanoSaltoVertical)) / (i - 1));
		}
		$("#player" + i).css("color", colors[i - 1]);
		puntuaciones[i - 1] = 0;
	}

	inicializar();
	generarPuntuaciones();
	pintarTurno();
}

function generarPuntuaciones() {
	let tabla = $('#puntuaciones');

	for (let i = 0; i < numeroJugadores; i++) {
		let filaJugador = document.createElement("tr");
		filaJugador.className = "jugador";
		let nombreJugador = document.createElement("th");
		nombreJugador.className = "jugadorNombre";
		let puntos = document.createElement("th");
		puntos.innerText = puntuaciones[i];
		nombreJugador.innerText = arrayJugadores[i].getAttribute("id");
		filaJugador.appendChild(nombreJugador);
		filaJugador.appendChild(puntos);
		puntos.className = "jugadorPuntuacion";
		tabla.append(filaJugador)
	}
}
//-----------------------------------DADO------------------------------------------------------------------------------//
function girarDado() {
	popUp.style.display = "none";
	cube.style.transition = '';
	cube.style.transform = `translateY(40px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
	respondida = null;
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
//-------------------------------------MOVIMIENTO DE LAS FICHAS------------------------------------------------------------//
async function tirar() {
	if (girando == false) {
		girando = true
		preguntaP.innerText = "";
		posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
		let numeroCasillas = await girarDado();
		if ((posicionJugador.left < tamanoSaltoHorizontal * (columnas - 1)) && (posicionJugador.top < tamanoSaltoVertical)) {
			moveDerecha(numeroCasillas);
		} else if ((posicionJugador.top < tamanoSaltoVertical * (filas - 1)) && (posicionJugador.left > tamanoSaltoHorizontal)) {
			moveArribaAbajo(numeroCasillas);
		} else if (posicionJugador.left >= tamanoSaltoHorizontal && (posicionJugador.top != 0)) {
			moveIzquierda(numeroCasillas);
		} else {
			moveAbajoArriba(numeroCasillas);
		}
	}
}
/*function prueba() {
	turno = $("#numJugador").val();
	numCasillas = $("#numCasillas").val();

	tirar(numCasillas);
}*/

function limpiarPopUp() {
	while (formRespuestas.firstChild) {
		formRespuestas.removeChild(formRespuestas.firstChild);
	}
}

function moveDerecha(numeroCasillas) {

	//sin el math.round la posicion dl jugador 2 y 4 es decimal
	posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
	//posicionJugador=Math.round(posicionJugador);
	posicionJugadorX = Math.round(posicionJugador.left);
	posicionJugadorY = posicionJugador.top;
	let id = null;
	clearInterval(id);
	id = setInterval(frame, 5);
	let pos = 0;
	let auxNumCasillas = numeroCasillas * tamanoSaltoHorizontal;

	function frame() {
		//si la ficha se encuentra en la casilla de la derecha del todo
		if (posicionJugadorX >= (tamanoSaltoHorizontal * (columnas - 1))) {
			//si el jugador 2 o 4 se encuentra a la derecha del todo
			if ((turno % 2 != 0) && (posicionJugadorX == (tamanoSaltoHorizontal * columnas) - tamanoFicha)) {
				//si es el jugador 4
				if (turno > 1) {
					if (auxNumCasillas > 0) {//si hay que seguir recorriendo
						clearInterval(id);
						moveArribaAbajo(auxNumCasillas / tamanoSaltoHorizontal);

					} else {//si termina en la ultima casilla de la derecha
						clearInterval(id);
						asignarFilaColumnaDer();
						cargarPregunta();
					}
				} else {//si es el jugador 2
					if (auxNumCasillas > 0) {
						clearInterval(id);
						moveArribaAbajo(auxNumCasillas / tamanoSaltoHorizontal);
					} else {
						clearInterval(id);
						asignarFilaColumnaDer();
						cargarPregunta();
					}

				}
				return;
			}
			//si el jugador 0 o 3 se encuentran en la ultima casilla a la derecha
			else if ((turno % 2 == 0) && (posicionJugadorX == (tamanoSaltoHorizontal * (columnas - 1)))) {
				//si es el jugador 3
				if (turno > 1) {
					if (auxNumCasillas > 0) {//si hay que seguir recorriendo
						moveArribaAbajo(auxNumCasillas / tamanoSaltoHorizontal);
						clearInterval(id);
					} else {
						clearInterval(id);
						asignarFilaColumnaDer();
						cargarPregunta();
					}
				} else {//si es el jugador 1

					if (auxNumCasillas > 0) {//si hay que seguir recorriendo
						moveArribaAbajo(auxNumCasillas / tamanoSaltoHorizontal);
						clearInterval(id);
					} else {//si termina en la ultima casilla de la derecha
						clearInterval(id);
						asignarFilaColumnaDer();
						cargarPregunta();
					}
				}
				return;
			}
		}
		if (pos == numeroCasillas * tamanoSaltoHorizontal) {
			asignarFilaColumnaDer();
			clearInterval(id);
			cargarPregunta();

		} else {

			posicionJugadorX++;
			pos++;
			auxNumCasillas--;
			arrayJugadores[turno].style.left = posicionJugadorX + "px";
		}
	}
}
function asignarFilaColumnaDer() {
	if (turno % 2 != 0) {
		columnaActual = Math.round((posicionJugadorX - 55) / tamanoSaltoHorizontal);
	} else {
		columnaActual = Math.round(posicionJugadorX / tamanoSaltoHorizontal);
	}
	if (turno > 1) {
		filaActual = Math.round((posicionJugadorY) / tamanoSaltoVertical) - 1;
	} else {
		filaActual = Math.round((posicionJugadorY) / tamanoSaltoVertical);
	}
}


function moveArribaAbajo(numeroCasillas) {
	posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
	posicionJugadorX = posicionJugador.left;
	posicionJugadorY = posicionJugador.top;
	let id = null;
	clearInterval(id);
	id = setInterval(frame, 5);
	let pos = 0;
	let auxNumCasillas = numeroCasillas * tamanoSaltoVertical;
	function frame() {

		//si la ficha está en la ultima fila de abajo
		if (posicionJugadorY >= (tamanoSaltoVertical * (filas - 1))) {
			//si son las fichas de abajo y estan abajo del todo
			if ((turno > 1) && (posicionJugadorY == (tamanoSaltoVertical * filas) - tamanoFicha)) {
				if (auxNumCasillas > 0) {//si hay que seguir recorriendo
					moveIzquierda(auxNumCasillas / tamanoSaltoVertical);
					clearInterval(id);
				} else {
					asignarFilaColumnaArribaAbajo();
					cargarPregunta();
					clearInterval(id);
				}
				return;
			} else if ((turno <= 1) && (posicionJugadorY == (tamanoSaltoVertical * (filas - 1)))) {
				if (auxNumCasillas > 0) {//si hay que seguir recorriendo
					moveIzquierda(auxNumCasillas / tamanoSaltoVertical);
					clearInterval(id);
				} else {
					asignarFilaColumnaArribaAbajo();
					cargarPregunta();
					clearInterval(id);
				}
				return;
			}
		}
		//if para parar
		if (posicionJugadorY < (tamanoSaltoVertical * (filas - 1)) + tamanoSaltoVertical) {
			if (pos == numeroCasillas * tamanoSaltoVertical) {
				asignarFilaColumnaArribaAbajo();
				cargarPregunta();
				clearInterval(id);
			} else {
				posicionJugadorY++;
				pos++;
				auxNumCasillas--;
				arrayJugadores[turno].style.top = posicionJugadorY + "px";
			}
		}
	}
}
function asignarFilaColumnaArribaAbajo() {

	if (turno % 2 != 0) {//control de las fichas a la derecha del todo

		columnaActual = Math.round((posicionJugadorX - 55) / tamanoSaltoHorizontal);
	} else {
		columnaActual = Math.round(posicionJugadorX / tamanoSaltoHorizontal);
	}
	if (turno > 1) {//control de las 2 fichas inferiores
		filaActual = Math.round((posicionJugadorY) / tamanoSaltoVertical) - 1;
	} else {
		filaActual = Math.round((posicionJugadorY) / tamanoSaltoVertical);
	}
}

function moveIzquierda(numeroCasillas) {
	posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
	posicionJugadorXx = Math.round(posicionJugador.left);
	posicionJugadorYy = posicionJugador.top;
	let id = null;
	clearInterval(id);
	let pos = 0;
	id = setInterval(frame, 5);
	let auxNumCasillas = numeroCasillas * tamanoSaltoHorizontal;
	function frame() {
		//si la ficha se encuentra en la casilla de la izquierda del todo
		if (posicionJugadorXx <= tamanoSaltoHorizontal) {
			//si el jugador 2 o 4 se encuentra en la casilla de la izquierda inferior
			if ((turno % 2 != 0) && (posicionJugadorXx == tamanoSaltoHorizontal - tamanoFicha)) {
				//si es el jugador 4
				if (turno > 1) {
					if (auxNumCasillas > 0) {//si hay que seguir recorriendo
						moveAbajoArriba(auxNumCasillas / tamanoSaltoHorizontal);
						clearInterval(id);
					} else {//si termina en la ultima casilla de la derecha
						clearInterval(id);
						asignarFilaColumnaIzq();
						cargarPregunta();
					}
				} else {//si es el jugador 2
					if (auxNumCasillas > 0) {
						moveAbajoArriba(auxNumCasillas / tamanoSaltoHorizontal);
						clearInterval(id);
					} else {
						clearInterval(id);
						asignarFilaColumnaIzq();
						cargarPregunta();
					}
				}
				return;
			}
			//si el jugador 0 o 3 se encuentran en la ultima casilla a la derecha
			else if ((turno % 2 == 0) && (posicionJugadorXx == 0)) {
				//si es el jugador 0
				if (turno > 1) {
					if (auxNumCasillas > 0) {//si hay que seguir recorriendo
						moveAbajoArriba(auxNumCasillas / tamanoSaltoHorizontal);
						clearInterval(id);
					} else {
						clearInterval(id);
						asignarFilaColumnaIzq();
						cargarPregunta();
					}
				} else {//si es el jugador 0
					if (auxNumCasillas > 0) {//si hay que seguir recorriendo
						moveAbajoArriba(auxNumCasillas / tamanoSaltoHorizontal);
						clearInterval(id);
					} else {//si termina en la ultima casilla de la derecha
						clearInterval(id);
						asignarFilaColumnaIzq();
						cargarPregunta();
					}
				}
				return;
			}
		}

		//if (posicionJugadorXx > 0) {
		if (pos == (numeroCasillas * tamanoSaltoHorizontal)) {

			asignarFilaColumnaIzq();
			cargarPregunta();
			clearInterval(id);
			return;
		} else {
			pos++;
			posicionJugadorXx--;
			auxNumCasillas--;
			arrayJugadores[turno].style.left = posicionJugadorXx + "px";
		}
	}
}
function asignarFilaColumnaIzq() {
	if (turno % 2 != 0) {//control de las fichas a la derecha del todo
		columnaActual = Math.round((posicionJugadorXx - 55) / tamanoSaltoHorizontal);
	} else {
		columnaActual = Math.round(posicionJugadorXx / tamanoSaltoHorizontal);
	}
	if (turno > 1) {//control de las 2 fichas inferiores
		filaActual = Math.round((posicionJugadorYy) / tamanoSaltoVertical) - 1;
	} else {
		filaActual = Math.round((posicionJugadorYy) / tamanoSaltoVertical);
	}
}
function reiniciarPosiciones() {
	posicionJugadorX = 0;
	posicionJugadorXx = 0;
	posicionJugadorY = 0;
	posicionJugadorYy = 0;
}
function moveAbajoArriba(numeroCasillas) {
	posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
	posicionJugadorXx = posicionJugador.left;
	posicionJugadorYy = Math.round(posicionJugador.top);
	let auxNumCasillas = numeroCasillas * tamanoSaltoVertical;
	posicionJugadorYy = posicionJugador.top;
	let id = null;
	let pos = 0;
	clearInterval(id);
	id = setInterval(frame, 5);

	function frame() {

		//si la ficha está en la fila de arriba
		if (posicionJugadorYy <= tamanoSaltoVertical) {
			//si son las fichas de abajo y estan abajo del todo
			if ((turno > 1) && (posicionJugadorYy == tamanoSaltoVertical - tamanoFicha)) {
				reiniciarPosiciones();
				if (auxNumCasillas > 0) {//si hay que seguir recorriendo
					moveDerecha(auxNumCasillas / tamanoSaltoVertical);
					clearInterval(id);
				} else {
					reiniciarPosiciones();
					asignarFilaColumnaAbArFin();
					cargarPregunta();
					clearInterval(id);
				}
				return;
			} else if ((turno <= 1) && (posicionJugadorYy == 0)) {
				reiniciarPosiciones();
				if (auxNumCasillas > 0) {//si hay que seguir recorriendo
					moveDerecha(auxNumCasillas / tamanoSaltoVertical);
					clearInterval(id);
				} else {
					asignarFilaColumnaAbArFin();
					cargarPregunta();
					clearInterval(id);
				}
				return;
			}
		}
		if (pos == numeroCasillas * tamanoSaltoVertical) {
			asignarFilaColumnaAbAr();
			cargarPregunta();
			clearInterval(id);
			return;
		} else {
			posicionJugadorYy--;
			pos++;
			auxNumCasillas--;
			arrayJugadores[turno].style.top = posicionJugadorYy + "px";
		}
	}
}

function asignarFilaColumnaAbAr() {
	if (turno % 2 != 0) {//control de las fichas a la derecha del todo
		columnaActual = Math.round((posicionJugadorXx - 55) / tamanoSaltoHorizontal);
	} else {
		columnaActual = Math.round(posicionJugadorXx / tamanoSaltoHorizontal);
	}
	if (turno > 1) {//control de las 2 fichas inferiores
		filaActual = Math.round((posicionJugadorYy) / tamanoSaltoVertical) - 1;
	} else {
		filaActual = Math.round((posicionJugadorYy) / tamanoSaltoVertical);
	}
}
function asignarFilaColumnaAbArFin() {
	if (turno % 2 != 0) {//control de las fichas a la derecha del todo
		columnaActual = Math.round((posicionJugadorXx) / tamanoSaltoHorizontal);
	} else {
		columnaActual = Math.round(posicionJugadorXx / tamanoSaltoHorizontal);
	}
	if (turno > 1) {//control de las 2 fichas inferiores
		filaActual = Math.round((posicionJugadorYy) / tamanoSaltoVertical);
	} else {
		filaActual = Math.round((posicionJugadorYy) / tamanoSaltoVertical);
	}
}
//-----------------------------------------LLAMADAS BACK-----------------------------------------------------------//
function getCategoria(categoriaActual) {

	switch (categoriaActual) {
		case 'H':
			return "Historia"

		case 'G':
			return "Geografía"

		case 'A':
			return "Arte y Literatura"

		case 'D':
			return "Deportes y Pasatiempos"

		case 'E':
			return "Entretenimiento"

		case 'C':
			return "Ciencias y Naturaleza"

	}
}

async function cargarPregunta() {

	if (respondida != null) {
		return;
	}
	respondida = 0;
	popUp.style.display = "block"
	$.ajax({
		type: "GET",
		dataType: "json",
		url: urlPreguntas + "/categoria?categoria=" + getCategoria(arrayPosiciones[filaActual][columnaActual]),
		success: function(response) {
			mostrarPregunta(response)
		},
		error: function(xhr) {
			console.error(xhr.responseText);
		}
	});
}
function mostrarPregunta(pregunta) {
	limpiarPopUp();
	totalPreguntas++;
	preguntaP.innerText = pregunta.pregunta;
	preguntaPopup.style.top = (tamanoSaltoVertical * filas) + "px";
	let btnConfirmar = document.createElement("button")
	btnConfirmar.setAttribute("type", "button")
	btnConfirmar.setAttribute("onclick", "corregirRespuesta()")
	btnConfirmar.setAttribute("id", "btnConfirmar");
	btnConfirmar.innerText = "CONFIRMAR"
	btnConfirmar.style.marginTop = "20px";
	btnConfirmar.style.width = "fit-content";

	pregunta.respuestas.forEach(respuesta => {
		let respuestaRb = document.createElement("input");
		let labelRepuesta = document.createElement("label");
		labelRepuesta.setAttribute("class", "labelRespuesta");
		respuestaRb.setAttribute("type", "radio");
		respuestaRb.setAttribute("name", "respuesta");
		respuestaRb.setAttribute("value", respuesta.id);
		labelRepuesta.innerText = respuesta.respuesta;
		labelRepuesta.style.marginTop = "10px";

		respuestaRb.style.display = "none"
		formRespuestas.appendChild(labelRepuesta);

		labelRepuesta.appendChild(respuestaRb);

		if (cont == 1) {
			labelRepuesta.style.gridColumnStart = "1";
		}
		if (cont == 2) {
			labelRepuesta.style.gridColumnStart = "2";
			cont = 0;
		}
		cont++
		popUp.setAttribute("data-on", "on");
		activarSeleccionarRespuesta();
	});
}
function activarSeleccionarRespuesta() {
	let radios = document.forms["respuestas"].elements["respuesta"];
	for (let i = 0, max = radios.length; i < max; i++) {
		radios[i].onclick = function() {
			corregirRespuesta(this, this.value)
		}
	}
}
function corregirRespuesta(radio, idRespuesta) {
	$.ajax({
		type: "GET",
		dataType: "json",
		url: urlRespuestas + "corregir?idRespuesta=" + idRespuesta,
		success: function(response) {
			if (respondida == 0) {
				if (response == true) {
					preguntasCorrectas++;
					rachaActual++;
					puntuaciones[turno]++;
					actualizarPuntajes(puntuaciones[turno]);
					radio.parentNode.style.backgroundColor = "green"
					fuegosArtificiales.setAttribute("data-on", "on");
					fuegosArtificiales.style.animation = "firework 2s infinite"
				} else if (response == false) {
					preguntasIncorrectas++;
					rachaActual = 0;
					radio.parentNode.style.backgroundColor = "red"
				}
				actualizarTurno();
				respondida = 1;
			}
			cerrarDivPreguntas()
			girando = false;

		},
		error: function(xhr, status, error) {
			console.error(xhr.responseText);
		}
	});
}

function cerrarDivPreguntas() {
	setTimeout(() => {
		popUp.setAttribute("data-on", "off")
		fuegosArtificiales.setAttribute("data-on", "off")
	}, 2000);
	respondida = null;
}
function actualizarTurno() {
	if (turno == numeroJugadores - 1) {
		turno = 0;
	} else {
		turno++;
	}
	pintarTurno();
}
function pintarTurno() {
	let filasJugadores = document.getElementsByClassName("jugador");
	if (turno > 0) {
		filasJugadores[turno - 1].style.backgroundColor = "white";
		filasJugadores[turno].style.backgroundColor = "green";
		//filasJugadores[turno].style.backgroundColor =  $("#player" + turno).css("background-color");
	} else {
		//filasJugadores[turno].style.backgroundColor = $("#player" + turno).css("background-color");
		filasJugadores[turno].style.backgroundColor = "green";
		filasJugadores[numeroJugadores - 1].style.backgroundColor = "white";
	}
}
function actualizarPuntajes(puntuacion) {
	let puntuaciones = document.getElementsByClassName("jugadorPuntuacion");
	puntuaciones[turno].innerText = puntuacion;
}