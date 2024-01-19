package com.example.trivia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.trivia.entity.RespuestaEntity;

public interface RespuestaRepository extends JpaRepository<RespuestaEntity, Long>{

/*	@Query ("SELECT correcta FROM RESPUESTA WHERE id=1")
	String corregirRespuesta(Long id);
*/
}
