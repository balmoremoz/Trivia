package com.example.trivia.provider.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.trivia.entity.RespuestaEntity;
import com.example.trivia.provider.RespuestaProvider;
import com.example.trivia.repository.RespuestaRepository;

@Component
public class RespuestaProviderImp implements RespuestaProvider {
	@Autowired
	RespuestaRepository respuestaRepository;

	public List<RespuestaEntity> findAllRespuestas() {
		List<RespuestaEntity> respuestas = respuestaRepository.findAll();
		return respuestas;
	}

	
	 public Boolean corregirRespuesta(Long id) { 
		 if(respuestaRepository.corregirRespuesta( id).equals("y")) {
			 return true;
		 }else {
			 return false ; 
		 }
	 }
	 
}
