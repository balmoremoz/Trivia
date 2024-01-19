var apiServerUrl = 'http://localhost:8081/pregunta/all';
let posicionCat = 0;
let arrayPosiciones = [];

function llamada() {
	let preguntas = new Array();
	let xhr = new XMLHttpRequest();

	xhr.open('GET', apiServerUrl, true);

	xhr.onload = function() {
		if (xhr.status >= 200 && xhr.status < 300) {
			var responseData = JSON.parse(xhr.responseText);
			console.log('Resultado:', responseData);
			preguntas.push(responseData)

		} else {
			console.error('Error', xhr.statusText);
		}
	};

	xhr.onerror = function() {
		console.error('Error');
	};
	xhr.send();
}


function generarTablero(filas, columnnas) {

	const tablero = document.querySelector('.tablero');
	tablero.style.gridTemplateColumns = `repeat(${columnnas}, 1fr)`;
	tablero.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
	
	
	
	for (let i = 0; i < filas; i++) {
		arrayPosiciones[i] = []
	}
	let posicionJugador=[0][0];
	const arrayCat = ['G', 'H', 'D', 'C', 'A', 'E'];

	
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
					icono.className ="fa fa-university";
					break;
				case 'C':
					icono.className = "fa fa-flask";
					break;
				case 'A':
					icono.className = "fa fa-map";
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

generarTablero(6, 5);
