package com.example.trivia.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;

import lombok.Data;

@Data
@Entity
@Table(name="RESPUESTA")
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class RespuestaEntity implements Serializable{
	@Id
	@Column(name="id")
	private Long Id;
	@Column(name="respuesta")
	private String respuesta;
	@Column(name="correcta") 
	private char correcta;
	@Column(name="id_pregunta")
	private Long idPregunta;
	/*
	  @ManyToOne(fetch = FetchType.LAZY, optional = false)
	  @JoinColumn(name = "id_pregunta", nullable = false)
	  @OnDelete(action = OnDeleteAction.CASCADE)
	  private PreguntaEntity pregunta;
	  */
}
