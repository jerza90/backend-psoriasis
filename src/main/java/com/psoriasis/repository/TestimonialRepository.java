package com.psoriasis.repository;

import com.psoriasis.model.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestimonialRepository extends JpaRepository<Testimonial, Long> {
    List<Testimonial> findByLangAndStatusOrderBySortOrderAsc(String lang, String status);
    List<Testimonial> findByFeaturedAndLangAndStatusOrderBySortOrderAsc(Boolean featured, String lang, String status);
}
