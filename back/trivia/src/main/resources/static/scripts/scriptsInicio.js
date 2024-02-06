const btnContinuar = document.getElementById("btnContinuar");


function redireccionarAlJuego() {
	/*let xhr = new XMLHttpRequest();

	xhr.open('GET', "http://localhost:8081/Juego", true);
	xhr.onload = function() {

		if (xhr.status >= 200 && xhr.status < 300) {
			let responseData = xhr.responseText;
			document.getElementById("content").innerHTML = responseData;
			document.getElementById("content").setAttribute("class", "d-block");
			generarTablero(10, 10);
		} else {
			console.error('Error', xhr.statusText);
		}
	}
	xhr.onerror = function() {
		console.error('Error');
	};
	xhr.send();*/
	let numJugadores = document.querySelector('[name="numeroJugadores"]').value;
	console.log(numJugadores)
	$.ajax({
		type: "GET",
		url: "http://localhost:8081/Juego",
		success: function(response) {
			$("#content").html(response);
			$("#content").attr("class", "d-block");
			generarTablero(10,10,numJugadores);
			$('#formulario').hide();
		},

		error: function(e, xhr) {
			mostrarGrowlError("Se ha producido un error al guardar la lista de contenedores", "default");
			console.log('error guardado' + e.responseText);
		}
	});
}