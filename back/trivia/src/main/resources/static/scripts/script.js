var apiServerUrl = 'http://localhost:8081/pregunta/all';
function llamada() {
  let preguntas=new Array();
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

