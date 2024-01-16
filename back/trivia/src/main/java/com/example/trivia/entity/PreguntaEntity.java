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
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@JsonAutoDetect(fieldVisibility = Visibility.ANY)
@Data
@Table(name="PREGUNTA")
public class PreguntaEntity implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="id")
	private Long id;
	@Column(name="pregunta")
	private String pregunta;
	@Column(name="categoria")
	private String categoria;
}
