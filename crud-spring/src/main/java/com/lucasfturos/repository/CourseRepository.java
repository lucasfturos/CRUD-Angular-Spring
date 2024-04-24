package com.lucasfturos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lucasfturos.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
