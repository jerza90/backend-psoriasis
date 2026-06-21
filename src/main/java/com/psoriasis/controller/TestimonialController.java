package com.psoriasis.controller;

import com.psoriasis.dto.TestimonialResponse;
import com.psoriasis.service.TestimonialService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testimonials")
public class TestimonialController {

    private final TestimonialService testimonialService;

    public TestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<List<TestimonialResponse>> getAll(@RequestParam(required = false, defaultValue = "ms") String lang) {
        List<TestimonialResponse> list = testimonialService.getAll(lang);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/featured")
    public ResponseEntity<List<TestimonialResponse>> getFeatured(@RequestParam(required = false, defaultValue = "ms") String lang) {
        List<TestimonialResponse> list = testimonialService.getFeatured(lang);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestimonialResponse> getById(@PathVariable Long id) {
        return testimonialService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
