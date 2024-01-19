package com.example.trivia.provider;

import java.util.List;

import com.example.trivia.entity.RespuestaEntity;

public interface RespuestaProvider{
	List<RespuestaEntity>findAllRespuestas();
	
	//String corregirRespuesta(Long idPregunta);
}
