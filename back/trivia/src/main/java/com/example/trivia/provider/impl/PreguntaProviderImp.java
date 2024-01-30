package com.example.trivia.provider.impl;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.trivia.dto.PreguntaDto;
import com.example.trivia.entity.PreguntaEntity;
import com.example.trivia.provider.PreguntaProvider;
import com.example.trivia.repository.PreguntaRepository;

@Component
public class PreguntaProviderImp implements PreguntaProvider {
	@Autowired
	PreguntaRepository preguntaRepository;
	@Autowired
	ModelMapper modeMapper;

	@Override
	public List<PreguntaDto> findAllPreguntas() {
		List<PreguntaEntity> preguntas = preguntaRepository.findAll();
		List<PreguntaDto> preguntasDto = new ArrayList<PreguntaDto>();

		for (PreguntaEntity pregunta : preguntas) {
			preguntasDto.add(modeMapper.map(pregunta, PreguntaDto.class));
		}
		return preguntasDto;
	}

	@Override
	public PreguntaDto findByCategoria(String categoria) {
		PreguntaEntity pregunta = preguntaRepository.PreguntaRandomPorCategoria(categoria);
		PreguntaDto preguntaDto= modeMapper.map(pregunta, PreguntaDto.class);
		
		return preguntaDto;
	}
	/*
	 * @Override public PreguntaEntity findPreguntaById(Long id) {
	 * Optional<PreguntaEntity> pregunta= preguntaRepository.findById(id); if
	 * (pregunta.isPresent()) { return pregunta.get(); } return null; }
	 */

}
