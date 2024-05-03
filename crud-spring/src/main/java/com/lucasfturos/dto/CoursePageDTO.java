package com.lucasfturos.dto;

import java.util.List;

public record CoursePageDTO(
        List<CourseDTO> courseDTOs,
        long totalElements,
        int totalPages) {

}
