const btnContinuar = document.getElementById("btnContinuar");


function redireccionarAlJuego() {
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