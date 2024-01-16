package com.example.trivia.provider.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.trivia.entity.PreguntaEntity;
import com.example.trivia.provider.PreguntaProvider;
import com.example.trivia.repository.PreguntaRepository;

@Component
public class PreguntaProviderImp implements PreguntaProvider {
	@Autowired
	PreguntaRepository preguntaRepository;

	@Override
	public List<PreguntaEntity> findAllPreguntas() {
		List<PreguntaEntity>preguntas=preguntaRepository.findAll();
		return preguntas;
	}
	/*@Override
	public PreguntaEntity findPreguntaById(Long id) {
		Optional<PreguntaEntity> pregunta= preguntaRepository.findById(id);
		if (pregunta.isPresent()) {
			return pregunta.get();
		}
		return null;
	}*/
	
	
}
