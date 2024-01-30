package com.example.trivia.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.trivia.entity.PreguntaEntity;

public interface PreguntaRepository extends JpaRepository<PreguntaEntity, Long> {

	Optional<PreguntaEntity> findById(Long id);
	
	@Query(value = "SELECT * FROM (SELECT * FROM pregunta WHERE categoria = :categoria ORDER BY dbms_random.value) WHERE ROWNUM <= 1", nativeQuery = true)
	PreguntaEntity PreguntaRandomPorCategoria(@Param("categoria")String categoria);
}
