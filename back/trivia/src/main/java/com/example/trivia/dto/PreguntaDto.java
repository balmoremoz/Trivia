package com.example.trivia.dto;

import lombok.Data;

@Data
public class PreguntaDto {
	long id;
	String pregunta;
	String categoria;
}
