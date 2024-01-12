CREATE TABLE pregunta(
  id NUMBER NOT NULL,
  pregunta VARCHAR2(100),
  categoria VARCHAR(22),
  
   CONSTRAINT Pk_pregunta PRIMARY KEY (id)
);

CREATE TABLE respuesta(
    id NUMBER NOT NULL,
    respuesta VARCHAR2(100),
    correcta char(1),
    Id_pregunta NUMBER NOT NULL,
    
    CONSTRAINT Pk_respuesta PRIMARY KEY (id),
    CONSTRAINT Fk_respuesta FOREIGN KEY (Id_pregunta) REFERENCES pregunta(id)
);