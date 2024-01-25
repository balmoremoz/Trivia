package com.example.trivia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.trivia.entity.RespuestaEntity;

public interface RespuestaRepository extends JpaRepository<RespuestaEntity, Long>{
	
}
