package com.example.trivia.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

import lombok.Data;

@Entity
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
@Data
@Table(name="pregunta")
public class PreguntaEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="id")
	private Long id;
	@Column(name="pregunta")
	private String pregunta;
	@Column(name="categoria")
	private String categoria;
	
	@OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<RespuestaEntity> respuestas;
	
}
