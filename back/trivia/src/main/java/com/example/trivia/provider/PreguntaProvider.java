package com.example.trivia.provider;

import java.util.List;

import com.example.trivia.entity.PreguntaEntity;

public interface PreguntaProvider {
	List<PreguntaEntity>findAllPreguntas();
}
