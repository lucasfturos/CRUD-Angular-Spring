package com.lucasfturos.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import com.lucasfturos.dto.CourseDTO;
import com.lucasfturos.dto.mapper.CourseMapper;
import com.lucasfturos.exception.NotFoundExeception;
import com.lucasfturos.repository.CourseRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Validated
@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    public CourseService(CourseRepository courseRepository, CourseMapper courseMapper) {
        this.courseRepository = courseRepository;
        this.courseMapper = courseMapper;
    }

    public List<CourseDTO> list() {
        return courseRepository.findAll()
                .stream()
                .map(courseMapper::toDTO)
                .collect(Collectors.toList());
    }

    public CourseDTO findById(@NotNull @Positive Long id) {
        return courseRepository
                .findById(id)
                .map(courseMapper::toDTO)
                .orElseThrow(() -> new NotFoundExeception(id, "Course"));
    }

    public CourseDTO create(@Valid @NotNull CourseDTO courseDTO) {
        return courseMapper
                .toDTO(courseRepository.save(courseMapper.toEntity(courseDTO)));
    }

    public CourseDTO update(@NotNull @Positive Long id, @Valid @NotNull CourseDTO courseDTO) {
        return courseRepository
                .findById(id)
                .map(courseFound -> {
                    var course = courseMapper.toEntity(courseDTO);
                    courseFound.setName(courseDTO.name());
                    courseFound.setCategory(
                            courseMapper.convertCategoryValue(courseDTO.category()));
                    courseFound.getLessons().clear();
                    course.getLessons().forEach(courseFound.getLessons()::add);
                    return courseMapper.toDTO(courseRepository.save(courseFound));
                })
                .orElseThrow(() -> new NotFoundExeception(id, "Course"));
    }

    public void delete(@NotNull @Positive Long id) {
        courseRepository.delete(
                courseRepository
                        .findById(id)
                        .orElseThrow(() -> new NotFoundExeception(id, "Course")));
    }

}
