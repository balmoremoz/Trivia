package com.example.trivia.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data
@Entity(name="RespuestaEntity")
@Table(name="respuesta")
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
public class RespuestaEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="id")
	private Long Id;
	@Column(name="respuesta")
	private String respuesta;
	@Column(name="correcta") 
	private char correcta;
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "id_pregunta")
	@JsonIgnore  
	private PreguntaEntity pregunta;
	

}
