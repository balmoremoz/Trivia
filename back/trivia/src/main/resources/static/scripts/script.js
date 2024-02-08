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
//import * as constants from './consts.js';
function inicializar() {

	divPregunta = $('divPregunta')[0];
	cube = document.querySelector('.cubo');
	time = 0.5;
	girando = false
	posicionJugadorX = 0;
	posicionJugadorY = 0;
	posicionJugadorXx = 0;
	posicionJugadorYy = 0;
	respondida = 0;
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
}
function generarTablero(f, c, numJugadores) {
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
	console.log(arrayPosiciones)
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
	for (let i = 1; i <= numJugadores; i++) {
		if (i % 2 != 0) {
			$("#player" + i).css("left", "0");
			$("#player" + i).css("top", (((i - 1) * tamanoSaltoVertical)) / i);
		} else {
			$("#player" + i).css("left", tamanoSaltoHorizontal - 20);//20=tamaño de la ficha
			$("#player" + i).css("top",(((i - 2) * tamanoSaltoVertical)) / (i-1));
		}
		$("#player" + i).css("color", colors[i - 1]);
	}
	inicializar();
}

//-----------------------------------DADO------------------------------------------------------------------------------//
function generarTableros() {

}
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

async function tirar() {
	if (girando == false) {
		girando = true
		preguntaP.innerText = "";

		if (turno == numeroJugadores) {
			turno = 0;
		}
		posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
		console.log(posicionJugador);
		while (formRespuestas.firstChild) {
			formRespuestas.removeChild(formRespuestas.firstChild);
		}
		let numeroCasillas = await girarDado();
		if ((posicionJugador.left < tamanoSaltoHorizontal * (columnas - 1)) && (posicionJugador.top == 0)) {
			moveDerecha(numeroCasillas);
		} else if ((posicionJugador.top < tamanoSaltoVertical * (filas - 1)) && (posicionJugador.left > 0)) {
			moveArribaAbajo(numeroCasillas);
		} else if (posicionJugador.left >= tamanoSaltoHorizontal && (posicionJugador.top != 0)) {
			moveIzquierda(numeroCasillas);
		} else {
			moveAbajoArriba(numeroCasillas);
		}
	}
}

function moveDerecha(numeroCasillas) {
	//posicionJugadorX=posicion del jugador al que corresponde el turno
	posicionJugadorX = posicionJugador.left;
	//posicionJugadorY=posicionJugador.top;
	let id = null;
	clearInterval(id);
	id = setInterval(frame, 5);
	let pos = 0;
	let auxNumCasillas = numeroCasillas * tamanoSaltoHorizontal;
	function frame() {
		if (posicionJugadorX >= tamanoSaltoHorizontal * (columnas - 1)) {
			if ((turno % 2 != 0) && (turno != 0)) {
				columnaActual = Math.round((posicionJugadorX) / tamanoSaltoHorizontal);//55=posicion inicial X de la ficha
				debugger
			} else {
				columnaActual = posicionJugadorX / tamanoSaltoHorizontal;
			}
			moveArribaAbajo(Math.round(auxNumCasillas / tamanoSaltoHorizontal));
			clearInterval(id);
		}
		if (posicionJugadorX < tamanoSaltoHorizontal * (columnas - 1)) {
			if (pos >= numeroCasillas * tamanoSaltoHorizontal) {
				//columnaActual = Math.round(posicionJugadorX / tamanoSaltoHorizontal);
				if (turno != 0) {
					columnaActual = Math.round((posicionJugadorX - 55) / tamanoSaltoHorizontal);//55=posicion inicial X de la ficha
				} else {
					columnaActual = posicionJugadorX / tamanoSaltoHorizontal;
				}
				filaActual = posicionJugadorY / tamanoSaltoVertical;
				console.log("columna->" + columnaActual, "fila->" + filaActual)
				cargarPregunta()
				clearInterval(id);
			} else {
				posicionJugadorX++;
				pos++;
				auxNumCasillas--;
				arrayJugadores[turno].style.left = posicionJugadorX + "px";
			}
		}
	}
}

function moveArribaAbajo(numeroCasillas) {
	posicionJugadorY = posicionJugador.top;
	//posicionJugadorX=posicionJugador.left;
	if (turno != 0) {
		columnaActual = Math.round((posicionJugadorX - 55) / tamanoSaltoHorizontal);//55=posicion inicial X de la ficha
	} else {
		columnaActual = posicionJugadorX / tamanoSaltoHorizontal;
	}
	let idTb = null;
	clearInterval(idTb);
	idTb = setInterval(frameAb, 5);
	let pos = 0;
	let auxNumCasillas = numeroCasillas * tamanoSaltoVertical;
	function frameAb() {
		if (posicionJugadorY >= tamanoSaltoVertical * (filas - 1)) {
			filaActual = posicionJugadorY / tamanoSaltoVertical;
			console.log("fila->" + filaActual + " columna->" + columnaActual)
			moveIzquierda(Math.round(auxNumCasillas / tamanoSaltoHorizontal));
			clearInterval(idTb);
		}
		if (posicionJugadorY < tamanoSaltoVertical * (filas - 1)) {
			if (pos >= numeroCasillas * tamanoSaltoVertical) {
				clearInterval(idTb);
				filaActual = posicionJugadorY / tamanoSaltoVertical;
				console.log("fila->" + filaActual + " columna->" + columnaActual);
				cargarPregunta()
			} else {
				posicionJugadorY++;
				pos++;
				auxNumCasillas--;
				arrayJugadores[turno].style.top = posicionJugadorY + "px";
			}
		}
	}
}

function moveIzquierda(numeroCasillas) {

	posicionJugadorXx = posicionJugador.left;

	let idIzq = null;
	let posIzq = 0;
	clearInterval(idIzq);
	idIzq = setInterval(frameIzq, 5);
	let auxNumCasillas = numeroCasillas * tamanoSaltoHorizontal;

	function frameIzq() {
		if (posicionJugadorXx == 0) {
			moveAbajoArriba(Math.round(auxNumCasillas / tamanoSaltoVertical))
			columnaActual = posicionJugadorXx / tamanoSaltoHorizontal;
			clearInterval(idIzq);
		}
		if (posicionJugadorXx > 0) {
			if (posIzq >= numeroCasillas * tamanoSaltoHorizontal) {
				columnaActual = posicionJugadorXx / tamanoSaltoHorizontal;
				clearInterval(idIzq);
				cargarPregunta()
			} else {
				posIzq++;
				posicionJugadorXx--;
				auxNumCasillas--;
				arrayJugadores[turno].style.left = posicionJugadorXx + "px";
			}
		}
	}
}

function moveAbajoArriba(numeroCasillas) {
	let auxNumCasillas = numeroCasillas * tamanoSaltoVertical;

	posicionJugadorYy = posicionJugador.top;

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

			moveDerecha(Math.round(auxNumCasillas / tamanoSaltoHorizontal))
			filaActual = posicionJugadorYy / tamanoSaltoVertical;
			clearInterval(id);
		}
		if (posicionJugadorYy > 0) {
			if (pos >= numeroCasillas * tamanoSaltoVertical) {
				filaActual = posicionJugadorYy / tamanoSaltoVertical;
				cargarPregunta()
				clearInterval(id)
			} else {
				posicionJugadorYy--;
				pos++;
				auxNumCasillas--;
				arrayJugadores[turno].style.top = posicionJugadorYy + "px";
			}
		}
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
	turno++;
}
function mostrarPregunta(pregunta) {

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
		let respuestaRb = document.createElement("input")
		let labelRepuesta = document.createElement("label")
		labelRepuesta.setAttribute("class", "labelRespuesta");
		respuestaRb.setAttribute("type", "radio")
		respuestaRb.setAttribute("name", "respuesta")
		respuestaRb.setAttribute("value", respuesta.id)
		labelRepuesta.innerText = respuesta.respuesta;
		labelRepuesta.style.marginTop = "10px";

		respuestaRb.style.display = "none"
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
		popUp.setAttribute("data-on", "on")

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
					actualizarPuntajes(totalPreguntas, preguntasCorrectas, preguntasIncorrectas, rachaActual)
					radio.parentNode.style.backgroundColor = "green"
					fuegosArtificiales.setAttribute("data-on", "on");
					fuegosArtificiales.style.animation = "firework 2s infinite"
				} else if (response == false) {
					preguntasIncorrectas++;
					rachaActual = 0;
					actualizarPuntajes(totalPreguntas, preguntasCorrectas, preguntasIncorrectas, rachaActual)
					radio.parentNode.style.backgroundColor = "red"
				}
			}

			cerrarDivPreguntas()
			respondida = 1;
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

}

function actualizarPuntajes(totalPreguntas, preguntasCorrectas, preguntasIncorrectas, racha) {
	divTotalPreguntas.innerHTML = totalPreguntas
	divPreguntasCorrectas.innerText = preguntasCorrectas;
	divPreguntasIncorrectas.innerText = preguntasIncorrectas
	divRachaAcutal.innerHTML = racha
}
