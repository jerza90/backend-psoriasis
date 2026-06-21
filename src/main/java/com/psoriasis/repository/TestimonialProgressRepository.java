package com.psoriasis.repository;

import com.psoriasis.model.TestimonialProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestimonialProgressRepository extends JpaRepository<TestimonialProgress, Long> {
    List<TestimonialProgress> findByTestimonialIdOrderBySortOrderAsc(Long testimonialId);
}
