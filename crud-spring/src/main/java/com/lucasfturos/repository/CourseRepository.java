package com.lucasfturos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lucasfturos.model.Course;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

}
