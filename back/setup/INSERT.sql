INSERT INTO pregunta(id,pregunta,categoria) VALUES(1,'¿Cuál es la capital de Australia?',' Geografía');

INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(1,'Canberra','y',1);

INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(2,'Madrid','n',1);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(3,'Paris','n',1);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(4,'Roma','n',1);

select * FROM PREGUNTA  
