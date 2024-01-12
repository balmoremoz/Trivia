package com.example.trivia;

import java.util.Properties;
import java.util.ResourceBundle;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = { "com.example.trivia" })
public class TriviaApplication extends SpringBootServletInitializer{

	static ResourceBundle rb = ResourceBundle.getBundle("trivia");
	static String pathApplicationProperties = rb.getString("PATH_APPLICATION_PROPERTIES");
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TriviaApplication.class).properties(getProperties());
	}
	
	public static void main(String[] args) {
		new SpringApplicationBuilder(TriviaApplication.class).sources(TriviaApplication.class).properties(getProperties())
				.run(args);
	}

	static Properties getProperties() {
		Properties props = new Properties();
		
		return props;
	}
}
