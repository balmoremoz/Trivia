package com.example.trivia.dto;

import java.util.List;

import lombok.Data;

@Data
public class PreguntaDto {
	long id;
	String pregunta;
	String categoria;
	List<RespuestaDto>respuestas;
}
