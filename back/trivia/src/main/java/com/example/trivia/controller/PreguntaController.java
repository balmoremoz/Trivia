package com.example.trivia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.trivia.entity.PreguntaEntity;
import com.example.trivia.provider.PreguntaProvider;

@RestController
@RequestMapping("/pregunta")
public class PreguntaController {
	@Autowired
	PreguntaProvider preguntaProvider;
	
	@GetMapping("/all")
	public ResponseEntity<List<PreguntaEntity>>getAllPreguntas(){
		List<PreguntaEntity>preguntas=preguntaProvider.findAllPreguntas();
		return  new ResponseEntity<>(preguntas, HttpStatus.OK);
	}
	/*@GetMapping("/find/{id}")
	public ResponseEntity<PreguntaEntity>getProductoById(@PathVariable("id") Long id){
		PreguntaEntity pregunta=preguntaProvider.findPreguntaById(id);
		return new ResponseEntity<PreguntaEntity>(pregunta, HttpStatus.OK);
	}*/
}
