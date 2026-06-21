package com.psoriasis.controller;

import com.psoriasis.dto.TestimonialAdminRequest;
import com.psoriasis.dto.TestimonialResponse;
import com.psoriasis.dto.response.MessageResponse;
import com.psoriasis.service.TestimonialService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/testimonials")
public class AdminTestimonialController {

    private final TestimonialService testimonialService;

    public AdminTestimonialController(TestimonialService testimonialService) {
        this.testimonialService = testimonialService;
    }

    @GetMapping
    public ResponseEntity<List<TestimonialResponse>> list() {
        return ResponseEntity.ok(testimonialService.getAllAdmin());
    }

    @PostMapping
    public ResponseEntity<TestimonialResponse> create(@Valid @RequestBody TestimonialAdminRequest request) {
        return ResponseEntity.ok(testimonialService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TestimonialResponse> update(@PathVariable Long id, @Valid @RequestBody TestimonialAdminRequest request) {
        return ResponseEntity.ok(testimonialService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> delete(@PathVariable Long id) {
        testimonialService.delete(id);
        return ResponseEntity.ok(new MessageResponse("Testimonial deleted"));
    }
}
