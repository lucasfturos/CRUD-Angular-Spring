package com.lucasfturos;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.lucasfturos.enums.Category;
import com.lucasfturos.model.Course;
import com.lucasfturos.model.Lesson;
import com.lucasfturos.repository.CourseRepository;

@SpringBootApplication
public class CrudSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrudSpringApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(CourseRepository courseRepository) {
		return args -> {
			courseRepository.deleteAll();

			var c = new Course();
			c.setName("Angular");
			c.setCategory(Category.FRONTEND);

			var l = new Lesson();
			l.setName("Introdução");
			l.setVideoUrl("111111111111");
			l.setCourse(c);
			c.getLessons().add(l);

			var l1 = new Lesson();
			l1.setName("Desenvolvimento");
			l1.setVideoUrl("222222222222");
			l1.setCourse(c);
			c.getLessons().add(l1);

			courseRepository.save(c);
		};
	}

}
