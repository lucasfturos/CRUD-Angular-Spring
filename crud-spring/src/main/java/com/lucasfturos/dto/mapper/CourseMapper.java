package com.lucasfturos.dto.mapper;

import org.springframework.stereotype.Component;

import com.lucasfturos.dto.CourseDTO;
import com.lucasfturos.enums.Category;
import com.lucasfturos.model.Course;

@Component
public class CourseMapper {

    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }
        return new CourseDTO(
                course.getId(),
                course.getName(),
                course.getCategory().getValue());
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
