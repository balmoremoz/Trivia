package com.example.trivia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.trivia.entity.RespuestaEntity;
import com.example.trivia.provider.RespuestaProvider;

@RestController
@RequestMapping("/respuesta")
public class RespuestaController {

	@Autowired
	RespuestaProvider respuestaProvider;

	@GetMapping("/all")
	public ResponseEntity<List<RespuestaEntity>> getAllRespuestas() {
		List<RespuestaEntity> respuestas = respuestaProvider.findAllRespuestas();
		return new ResponseEntity<>(respuestas, HttpStatus.OK);
	}

	@GetMapping(value = "/corregir")
	public ResponseEntity<Boolean> corregirRespuesta(@RequestParam(defaultValue = "idRespuesta") String idRespuesta)
	{
		Long idRespuestaP=Long.parseLong(idRespuesta);
		return new ResponseEntity<>(respuestaProvider.corregirRespuesta(idRespuestaP), HttpStatus.OK);
	}
}
