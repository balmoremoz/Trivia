const btnContinuar = document.getElementById("btnContinuar");


function redireccionarAlJuego(){
    let xhr = new XMLHttpRequest();

    xhr.open('GET', "http://localhost:8081/Juego", true);
    xhr.onload = function () {

        if (xhr.status >= 200 && xhr.status < 300) {
            let responseData = xhr.responseText;
            document.getElementById("content").innerHTML=responseData;
            document.getElementById("content").setAttribute("class","d-block");
            generarTablero(10,10);
        } else {
            console.error('Error', xhr.statusText);
        }
    }
    xhr.onerror = function () {
        console.error('Error');
    };
    xhr.send();
}