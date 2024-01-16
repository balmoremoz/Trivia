package com.example.trivia.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.trivia.entity.PreguntaEntity;

public interface PreguntaRepository extends JpaRepository<PreguntaEntity, Long> {

	Optional<PreguntaEntity> findById(Long id);
	
}
