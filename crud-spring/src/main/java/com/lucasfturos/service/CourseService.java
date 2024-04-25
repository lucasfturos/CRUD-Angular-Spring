package com.lucasfturos.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;

import com.lucasfturos.exception.NotFoundExeception;
import com.lucasfturos.model.Course;
import com.lucasfturos.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> list() {
        return courseRepository.findAll();
    }

    public Course findById(@PathVariable @NotNull @Positive Long id) {
        return courseRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundExeception(id, "Course"));
    }

    public Course create(@Valid Course course) {
        return courseRepository.save(course);
    }

    public Course update(@PathVariable @NotNull @Positive Long id, @Valid Course course) {
        return courseRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundExeception(id, "Course"));
    }

    public void delete(@PathVariable @NotNull @Positive Long id) {
        courseRepository.delete(
                courseRepository
                        .findById(id)
                        .orElseThrow(() -> new NotFoundExeception(id, "Course")));
    }

}
