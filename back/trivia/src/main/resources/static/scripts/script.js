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
//-----------------------------------DADO---------------------------------------------------//
const cube = document.querySelector('.cube');
const time = 2;

cube.addEventListener('click', () => {
  cube.style.transition = '';
  cube.style.transform = `translateY(40px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
  setTimeout(() => {
    cube.style.transition = `transform ${time}s`;
    const randomValue = Math.floor((Math.random() * 6) + 1);
    console.log(`randomValue: ${randomValue}`);

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
  }, time * 2);
  tirar(2);
});

function tirar(numeroCasillas) {
  // function moveA() {
  let id = null;
  const elem = document.getElementById("player");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 100) {
      clearInterval(id)
    } else {
      pos++;
      elem.style.right = pos + "px";
      elem.style.left = pos + "px";
    }
  }
}
//---------- ANIMACIONNNNNNNNN----------------------//
/*
<!DOCTYPE html>
<html>
<style>
#container {
  width: 400px;
  height: 400px;
  position: relative;
  background: black;
}
#animate {
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: grey;
}
</style>
<body>

<p><button onclick="moveA()">Click Me</button></p> 

<div id ="container">
  <div id ="animate"></div>
</div>

<script>
function moveA() {
  let id = null;
  const elem = document.getElementById("animate");   
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  
  function frame() {
    if (pos == 350) {
      clearInterval(id)
      moveAb();
    } else {
      pos++; 
      elem.style.right = pos + "px"; 
      elem.style.left = pos + "px"; 
    }
  }
}
function moveAb() {
  let id = null;
  const elem = document.getElementById("animate");   
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  
  function frame() {
    if (pos == 350) {
     clearInterval(id);
      moveI()
    } else {
      pos++; 
      elem.style.bottom = pos + "px"; 
      elem.style.top = pos + "px"; 
    }
  }
}
function moveI() {
  let id = null;
  const elem = document.getElementById("animate");   
  let pos = 350;
  clearInterval(id);
  id = setInterval(frame, 5);
  
  function frame() {
    if (pos == 0) {
     clearInterval(id);
      moveArr();
    } else {
      pos--; 
      elem.style.bottom = pos + "px"; 
      elem.style.left = pos + "px"; 
    }
  }
}
function moveArr() {
  let id = null;
  const elem = document.getElementById("animate");   
  let pos = 350;
  clearInterval(id);
  id = setInterval(frame, 5);
  	
  function frame() {
    if (pos == 0) {
     clearInterval(id);

    } else {
      pos--; 
     
      elem.style.top = pos + "px"; 
      elem.style.bottom = pos + "px"; 
    }
  }
}
</script>

</body>
</html>

*/