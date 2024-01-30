package com.example.trivia.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.trivia.entity.RespuestaEntity;

public interface RespuestaRepository extends JpaRepository<RespuestaEntity, Long>{
	
	@Query("SELECT r.correcta FROM RespuestaEntity r WHERE r.id=:id")
	String corregirRespuesta(@Param("id")Long id);
}
