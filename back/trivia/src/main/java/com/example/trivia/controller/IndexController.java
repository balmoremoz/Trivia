package com.example.trivia.controller;

import java.net.URL;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class IndexController {
	
	@GetMapping("/")
	public String inicio() {
		return "./html/index";
	}
}
