package com.example.trivia.provider;

import java.util.List;

import com.example.trivia.dto.PreguntaDto;

public interface PreguntaProvider {
	List<PreguntaDto>findAllPreguntas();
}
