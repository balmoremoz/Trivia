package com.example.trivia;

import java.util.Arrays;
import java.util.Properties;
import java.util.ResourceBundle;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;



@SpringBootApplication
@EnableAutoConfiguration
//@ComponentScan(basePackages = { "com.example.trivia" })
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
	@Bean
	public CorsFilter corsFilter() {
		CorsConfiguration corsConfiguration =new CorsConfiguration();
		corsConfiguration.setAllowCredentials(true);
		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin","Acces-Control-Allow-Origin","Content-Type",
				"Accept", "Autorization", "Origin", "Accept", "X-Requested-With",
				"Access-Control-Request-Method", "Acces-Control-Request-Headers"));
		corsConfiguration.setExposedHeaders(Arrays.asList("Origin","Content-Type","Accept","Authorization","Acces-Control-Allow-Origin","Acces-Control-Allow-Origin", "Acces-Control-Allow-Credentials"));
		corsConfiguration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource =new UrlBasedCorsConfigurationSource();
		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);

		return new CorsFilter(urlBasedCorsConfigurationSource);
		
	}
}
