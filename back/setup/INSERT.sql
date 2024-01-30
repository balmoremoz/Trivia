INSERT INTO pregunta(id,pregunta,categoria) VALUES(1,'�Cu�l es la capital de Australia?',' Geograf�a');

INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(1,'Canberra','y',1);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(2,'Madrid','n',1);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(3,'Paris','n',1);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(4,'Roma','n',1);
//--------------------------------------------------------------------------------------------------------------------//
INSERT INTO pregunta(id,pregunta,categoria) VALUES(2,'�Qui�n es el autor de la obra literaria "Cien a�os de soledad"?',' Arte y Literatura');

INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(5,'Mario Vargas Llosa','n',2);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(6,'Gabriel Garc�a M�rquez','y',2);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(7,'Isabel Allende','n',2);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(8,'Julio Cort�zar','n',2);

INSERT INTO pregunta(id,pregunta,categoria) VALUES(3,'�Cu�l fue la causa principal de la Revoluci�n Francesa en 1789?','Historia');

INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(9,'Escasez de pan','n',3);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(10,' Desigualdad social ','y',3);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(11,' Monarqu�a estable','n',3);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(12,' Invasi�n extranjera','n',3);

INSERT INTO pregunta(id,pregunta,categoria) VALUES(4,'�Cu�l es el nombre del actor que interpreta a Iron Man en el Universo Cinematogr�fico de Marvel?','Entretenimiento');

INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(13,'Chris Evans','n',4);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(14,' Chris Hemsworth','n',4);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(15,' Mark Ruffalo','n',4);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(16,' Robert Downey Jr ','y',4);

INSERT INTO pregunta(id,pregunta,categoria) VALUES(5,'�Cu�l es el componente principal del aire que respiramos?','Ciencias y Naturaleza');

INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(17,'Di�xido de carbono','n',5);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(18,' Vapor de agua','n',5);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(19,' Nitr�geno ','y',5);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(20,' Ozono','n',5);

INSERT INTO pregunta(id,pregunta,categoria) VALUES(6,'�En qu� deporte se utiliza una pista ovalada y patines de cuatro ruedas?','Deportes y Pasatiempos');

INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(21,'Baloncesto','n',6);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(22,'Hockey sobre hielo','n',6);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(23,' Ciclismo','n',6);
INSERT INTO respuesta (id,respuesta,correcta,id_pregunta)VALUES(24,'  Roller derby ','y',6);

//-----------------------------------INSERT DE 3 PREGUNTAS POR CATEGORIA-----------------------------------------------------------------//
-- Arte y Literatura
INSERT INTO pregunta(id, pregunta, categoria) VALUES (7, '�Qui�n pint� la famosa obra "La noche estrellada"?', 'Arte y Literatura');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (25, 'Leonardo da Vinci', 'n', 7);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (26, 'Vincent van Gogh', 'y', 7);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (27, 'Pablo Picasso', 'n', 7);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (28, 'Claude Monet', 'n', 7);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (13, '�Qui�n escribi� la obra "Don Quijote de la Mancha"?', 'Arte y Literatura');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (49, 'Miguel de Cervantes', 'y', 13);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (50, 'Federico Garc�a Lorca', 'n', 13);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (51, 'Gabriel Garc�a M�rquez', 'n', 13);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (52, 'Jorge Luis Borges', 'n', 13);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (19, '�Qui�n fue el autor del cuadro "La persistencia de la memoria"?', 'Arte y Literatura');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (73, 'Salvador Dal�', 'y', 19);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (74, 'Pablo Picasso', 'n', 19);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (75, 'Vincent van Gogh', 'n', 19);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (76, 'Claude Monet', 'n', 19);

-- Historia
INSERT INTO pregunta(id, pregunta, categoria) VALUES (8, '�Cu�l de las siguientes civilizaciones antiguas se desarroll� a lo largo del r�o Nilo?', 'Historia');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (29, 'Mesopotamia', 'n', 8);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (30, 'Civilizaci�n Maya', 'n', 8);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (31, 'Egipto', 'y', 8);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (32, 'Grecia Antigua', 'n', 8);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (14, '�Qu� evento hist�rico inici� la Primera Guerra Mundial?', 'Historia');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (53, 'Asesinato de Archiduque Francisco Fernando', 'y', 14);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (54, 'Tratado de Versalles', 'n', 14);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (55, 'Ataque a Pearl Harbor', 'n', 14);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (56, 'Revoluci�n Rusa', 'n', 14);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (20, '�En qu� a�o se firm� la Declaraci�n de Independencia de los Estados Unidos?', 'Historia');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (77, '1776', 'y', 20);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (78, '1789', 'n', 20);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (79, '1804', 'n', 20);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (80, '1820', 'n', 20);

-- Entretenimiento
INSERT INTO pregunta(id, pregunta, categoria) VALUES (9, '�En qu� pel�cula gan� Leonardo DiCaprio su primer premio Oscar como Mejor Actor?', 'Entretenimiento');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (33, 'El Gran Gatsby', 'n', 9);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (34, 'Inception', 'n', 9);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (35, 'The Revenant', 'y', 9);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (36, 'Titanic', 'n', 9);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (15, '�Qui�n interpret� a Hermione Granger en las pel�culas de Harry Potter?', 'Entretenimiento');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (57, 'Emma Watson', 'y', 15);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (58, 'Emma Stone', 'n', 15);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (59, 'Keira Knightley', 'n', 15);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (60, 'Natalie Portman', 'n', 15);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (21, '�Cu�l es el nombre del actor que interpret� a Jack Dawson en la pel�cula "Titanic"?', 'Entretenimiento');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (81, 'Leonardo DiCaprio', 'y', 21);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (82, 'Brad Pitt', 'n', 21);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (83, 'Tom Hanks', 'n', 21);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (84, 'Johnny Depp', 'n', 21);

-- Ciencias y Naturaleza
INSERT INTO pregunta(id, pregunta, categoria) VALUES (10, '�Cu�l es el planeta m�s grande del sistema solar?', 'Ciencias y Naturaleza');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (37, 'Venus', 'n', 10);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (38, 'J�piter', 'y', 10);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (39, 'Saturno', 'n', 10);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (40, 'Marte', 'n', 10);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (16, '�Cu�l es el elemento m�s abundante en la corteza terrestre?', 'Ciencias y Naturaleza');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (61, 'Ox�geno', 'n', 16);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (62, 'Silicio', 'y', 16);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (63, 'Aluminio', 'n', 16);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (64, 'Hierro', 'n', 16);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (22, '�Cu�l es el hueso m�s largo del cuerpo humano?', 'Ciencias y Naturaleza');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (85, 'F�mur', 'y', 22);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (86, 'H�mero', 'n', 22);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (87, 'Tibia', 'n', 22);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (88, 'Radio', 'n', 22);

-- Deportes y Pasatiempos
INSERT INTO pregunta(id, pregunta, categoria) VALUES (11, '�En qu� deporte compiten equipos de remo en un r�o o canal?', 'Deportes y Pasatiempos');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (41, 'Baloncesto', 'n', 11);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (42, 'F�tbol', 'n', 11);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (43, 'Tenis', 'n', 11);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (44, 'Remo', 'y', 11);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (17, '�Cu�l es el deporte nacional de Jap�n?', 'Deportes y Pasatiempos');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (65, 'Sumo', 'y', 17);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (66, 'Judo', 'n', 17);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (67, 'B�isbol', 'n', 17);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (68, 'Kendo', 'n', 17);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (23, '�En qu� deporte se utiliza una red y se juega con una pelota peque�a?', 'Deportes y Pasatiempos');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (89, 'Tenis de mesa', 'y', 23);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (90, 'B�dminton', 'n', 23);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (91, 'V�ley playa', 'n', 23);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (92, 'Squash', 'n', 23);


-- Geograf�a
INSERT INTO pregunta(id, pregunta, categoria) VALUES (12, '�Cu�l es la capital de Canad�?', 'Geograf�a');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (45, 'Toronto', 'n', 12);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (46, 'Ottawa', 'y', 12);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (47, 'Montreal', 'n', 12);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (48, 'Vancouver', 'n', 12);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (18, '�Cu�l es el r�o m�s largo del mundo?', 'Geograf�a');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (69, 'Amazonas', 'y', 18);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (70, 'Nilo', 'n', 18);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (71, 'Misisipi', 'n', 18);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (72, 'Yangts�', 'n', 18);

INSERT INTO pregunta(id, pregunta, categoria) VALUES (24, '�Cu�l es el punto m�s alto de la cordillera de los Andes?', 'Geograf�a');

INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (93, 'Aconcagua', 'y', 24);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (94, 'Huascar�n', 'n', 24);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (95, 'Monte Fitz Roy', 'n', 24);
INSERT INTO respuesta (id, respuesta, correcta, id_pregunta) VALUES (96, 'Chimborazo', 'n', 24);