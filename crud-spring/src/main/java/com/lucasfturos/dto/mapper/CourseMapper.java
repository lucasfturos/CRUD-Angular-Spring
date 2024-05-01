package com.lucasfturos.dto.mapper;

import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.lucasfturos.dto.CourseDTO;
import com.lucasfturos.dto.LessonDTO;
import com.lucasfturos.enums.Category;
import com.lucasfturos.model.Course;
import com.lucasfturos.model.Lesson;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }
        var lessons = course.getLessons()
                .stream()
                .map(lesson -> new LessonDTO(
                        lesson.getId(),
                        lesson.getName(),
                        lesson.getVideoUrl()))
                .collect(Collectors.toList());
        return new CourseDTO(
                course.getId(),
                course.getName(),
                course.getCategory().getValue(),
                lessons);
    }

    public Course toEntity(CourseDTO courseDTO) {
        if (courseDTO == null) {
            return null;
        }
        var course = new Course();
        if (courseDTO.id() != null) {
            course.setId(courseDTO.id());
        }
        course.setName(courseDTO.name());
        course.setCategory(convertCategoryValue(courseDTO.category()));
        var lessons = courseDTO.lessons()
                .stream()
                .map(lessonDTO -> {
                    var lesson = new Lesson();
                    lesson.setId(lessonDTO.id());
                    lesson.setName(lessonDTO.name());
                    lesson.setVideoUrl(lessonDTO.videoUrl());
                    lesson.setCourse(course);
                    return lesson;
                })
                .collect(Collectors.toList());
        course.setLessons(lessons);
        return course;
    }

    public Category convertCategoryValue(String value) {
        if (value == null) {
            return null;
        }
        return switch (value) {
            case "Back-End" -> Category.BACKEND;
            case "Front-End" -> Category.FRONTEND;
            default -> throw new IllegalArgumentException("Categoria inválida: " + value);
        };
    }

}
