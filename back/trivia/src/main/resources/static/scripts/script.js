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
	console.log("fin")
}
function generarTablero(f, c, numJugadores, meta) {
	meta = meta;
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
async function tirar(numeroCasillas) {
	if (girando == false) {
		girando = true
		preguntaP.innerText = "";
		posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();

		//let numeroCasillas = await girarDado();

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
function prueba() {
	turno = $("#numJugador").val();
	tirar($("#numCasillas").val());
}

function limpiarPopUp() {
	while (formRespuestas.firstChild) {
		formRespuestas.removeChild(formRespuestas.firstChild);
	}
}

function moveDerecha(numeroCasillas) {
	//posicionJugadorX=posicion del jugador al que corresponde el turno
	posicionJugadorX = posicionJugador.left;
	posicionJugadorY = posicionJugador.top;
	let id = null;
	clearInterval(id);
	id = setInterval(frame, 5);
	let pos = 0;
	let auxNumCasillas = numeroCasillas * tamanoSaltoHorizontal;

	function frame() {
		if (turno % 2 != 0) {//si es par turno par(2,4)
			if (posicionJugadorX >= (tamanoSaltoHorizontal * columnas) - 20) {
				posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
				columnaActual = Math.round((posicionJugadorX - 55) / tamanoSaltoHorizontal);
				filaActual = Math.round((posicionJugadorY) / tamanoSaltoVertical);
				moveArribaAbajo(Math.round((auxNumCasillas - 45) / tamanoSaltoVertical));
				clearInterval(id);
			}
		} else if (posicionJugadorX >= (tamanoSaltoHorizontal * (columnas - 1))) {
			{
				posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
				columnaActual = Math.round((posicionJugadorX - 45) / tamanoSaltoHorizontal);
				filaActual = Math.round((posicionJugadorY) / tamanoSaltoVertical);
				moveArribaAbajo(Math.round((auxNumCasillas - 45) / tamanoSaltoVertical));
				clearInterval(id);
			}
		}
		if (posicionJugadorX < (tamanoSaltoHorizontal * (columnas - 1)) + tamanoSaltoHorizontal) {//+tamanoSaltoHorizontal
			if (pos >= numeroCasillas * tamanoSaltoHorizontal) {
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
}

function moveArribaAbajo(numeroCasillas) {
	posicionJugadorX = posicionJugador.left;
	posicionJugadorY = posicionJugador.top;
	let idTb = null;
	clearInterval(idTb);
	idTb = setInterval(frameAb, 5);
	let pos = 0;
	let auxNumCasillas = numeroCasillas * tamanoSaltoVertical;
	function frameAb() {
		//if (posicionJugadorY >= tamanoSaltoVertical * (filas - 1)) { --dudoso este if
		//console.log("if1");
		//filaActual = posicionJugadorY / tamanoSaltoVertical;
		//moveIzquierda(Math.round(auxNumCasillas / tamanoSaltoHorizontal));
		//clearInterval(idTb);
		if (turno > 1) {
			if (posicionJugadorY >= (tamanoSaltoVertical * ((filas)) - 20)) {//35=tamaño de la casilla vertical -20(tamaño de la ficha) inicial para que llegue abajo del todo
				posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
				columnaActual = Math.round((posicionJugadorX - 55) / tamanoSaltoHorizontal);
				filaActual = posicionJugadorY / tamanoSaltoVertical;
				moveIzquierda(Math.round(auxNumCasillas / tamanoSaltoHorizontal));
				clearInterval(idTb);
			}
		} else {
			if (posicionJugadorY >= tamanoSaltoVertical * (filas - 1)) {
				posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
				columnaActual = Math.round((posicionJugadorX) / tamanoSaltoHorizontal);
				filaActual = posicionJugadorY / tamanoSaltoVertical;
				moveIzquierda(Math.round((auxNumCasillas+75) / tamanoSaltoHorizontal));//copiar arriba
				clearInterval(idTb);
			}
		}
		//}
		if (posicionJugadorY < (tamanoSaltoVertical * (filas - 1)) + tamanoSaltoVertical) {
			if (pos >= numeroCasillas * tamanoSaltoVertical) {
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
				cargarPregunta();
				clearInterval(idTb);
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
	posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
	posicionJugadorXx = posicionJugador.left;
	posicionJugadorYy = posicionJugador.top;
	let idIzq = null;
	let posIzq = 0;
	clearInterval(idIzq);
	idIzq = setInterval(frameIzq, 5);
	let auxNumCasillas = numeroCasillas * tamanoSaltoHorizontal;

	function frameIzq() {
		//if (posicionJugadorXx == 0) {
		//	moveAbajoArriba(Math.round(auxNumCasillas / tamanoSaltoVertical))
		//	clearInterval(idIzq);
		//}
		if (turno % 2 != 0) {//si es par turno par(2,4)
			if (posicionJugadorXx == 55) {//55= posicion X inicial de la ficha 
				posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
				columnaActual = Math.round((posicionJugadorX - 55) / tamanoSaltoHorizontal);
				filaActual = Math.round((posicionJugadorY) / tamanoSaltoVertical);
				moveAbajoArriba(Math.round(auxNumCasillas / tamanoSaltoVertical));
				clearInterval(idIzq);
			}
		} else {
			if (posicionJugadorXx == 0) {//20 tamaño de la ficha
				posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
				columnaActual = Math.round((posicionJugadorX) / tamanoSaltoHorizontal);
				filaActual = Math.round((posicionJugadorY) / tamanoSaltoVertical);
				moveAbajoArriba(Math.round(auxNumCasillas / tamanoSaltoVertical));
				clearInterval(idIzq);
			}
		}
		if (posicionJugadorXx > 0) {
			if (posIzq >= numeroCasillas * tamanoSaltoHorizontal) {

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
				cargarPregunta();
				clearInterval(idIzq);
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
	posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
	posicionJugadorXx = posicionJugador.left;
	posicionJugadorYy = posicionJugador.top;

	let auxNumCasillas = numeroCasillas * tamanoSaltoVertical;
	posicionJugadorYy = posicionJugador.top;
	let id = null;
	let pos = 0;
	clearInterval(id);
	id = setInterval(frame, 5);

	function frame() {

		if (turno > 1) {//si es par turno par(2,4)
			if (posicionJugadorYy == 40) {//35=tamaño de la casilla vertical -20(tamaño de la ficha) inicial para que llegue abajo del todo
				posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
				columnaActual = Math.round((posicionJugadorXx - 55) / tamanoSaltoHorizontal);
				filaActual = posicionJugadorYy / tamanoSaltoVertical;
				posicionJugadorX = 0;
				posicionJugadorY = 0;
				posicionJugadorXx = 0;
				posicionJugadorYy = 0;
				moveDerecha(Math.round(auxNumCasillas / tamanoSaltoHorizontal));
				clearInterval(id);
			}
		} else {
			if (posicionJugadorYy == 0) {
				posicionJugador = $("#" + arrayJugadores[turno].getAttribute("id")).position();
				columnaActual = Math.round((posicionJugadorXx) / tamanoSaltoHorizontal);
				filaActual = posicionJugadorYy / tamanoSaltoVertical;
				posicionJugadorX = 0;
				posicionJugadorY = 0;
				posicionJugadorXx = 0;
				posicionJugadorYy = 0;
				moveDerecha(Math.round(auxNumCasillas / tamanoSaltoHorizontal));
				clearInterval(id);
			}
		}
		if (posicionJugadorYy > 0) {
			if (pos >= numeroCasillas * tamanoSaltoVertical) {
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

				cargarPregunta();
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