package com.psoriasis.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.psoriasis.dto.TestimonialResponse;
import com.psoriasis.dto.TestimonialResponse.ProgressEntryDto;
import com.psoriasis.model.Testimonial;
import com.psoriasis.model.TestimonialProgress;
import com.psoriasis.repository.TestimonialProgressRepository;
import com.psoriasis.repository.TestimonialRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;
    private final TestimonialProgressRepository progressRepository;
    private final ObjectMapper objectMapper;

    public TestimonialService(TestimonialRepository testimonialRepository,
                              TestimonialProgressRepository progressRepository,
                              ObjectMapper objectMapper) {
        this.testimonialRepository = testimonialRepository;
        this.progressRepository = progressRepository;
        this.objectMapper = objectMapper;
    }

    public List<TestimonialResponse> getAll(String lang) {
        if (lang == null || lang.isBlank()) lang = "ms";
        List<Testimonial> testimonials = testimonialRepository
                .findByLangAndStatusOrderBySortOrderAsc(lang, "active");
        return testimonials.stream().map(this::toResponse).toList();
    }

    public List<TestimonialResponse> getFeatured(String lang) {
        if (lang == null || lang.isBlank()) lang = "ms";
        List<Testimonial> testimonials = testimonialRepository
                .findByFeaturedAndLangAndStatusOrderBySortOrderAsc(true, lang, "active");
        return testimonials.stream().map(this::toResponse).toList();
    }

    public Optional<TestimonialResponse> getById(Long id) {
        return testimonialRepository.findById(id)
                .map(this::toResponse);
    }

    private TestimonialResponse toResponse(Testimonial t) {
        TestimonialResponse r = new TestimonialResponse();
        r.setId(t.getId());
        r.setName(t.getName());
        r.setLocation(t.getLocation());
        r.setConditionDuration(t.getConditionDuration());
        r.setCategories(parseJsonArray(t.getCategories()));
        r.setSummary(t.getSummary());
        r.setInitialQuote(t.getInitialQuote());
        r.setResultQuote(t.getResultQuote());
        r.setFeatured(t.getFeatured());
        r.setAvatarUrl(t.getAvatarUrl());
        r.setLang(t.getLang());

        List<TestimonialProgress> progressList = progressRepository
                .findByTestimonialIdOrderBySortOrderAsc(t.getId());
        r.setProgressHistory(progressList.stream().map(this::toProgressDto).toList());

        return r;
    }

    private ProgressEntryDto toProgressDto(TestimonialProgress p) {
        ProgressEntryDto dto = new ProgressEntryDto();
        dto.setId(p.getId());
        dto.setDateLabel(p.getDateLabel());
        dto.setTitle(p.getTitle());
        dto.setDescription(p.getDescription());
        dto.setNotes(p.getNotes());
        dto.setTips(parseJsonArray(p.getTips()));
        dto.setImages(parseJsonArray(p.getImages()));
        dto.setProductTags(parseProductTags(p.getProductTags()));
        dto.setDetails(parseDetails(p.getDetails()));
        return dto;
    }

    private Map<String, Object> parseDetails(String json) {
        if (json == null || json.isBlank()) return Collections.emptyMap();
        try {
            return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {});
        } catch (Exception e) {
            return Collections.emptyMap();
        }
    }

    private List<String> parseJsonArray(String json) {
        if (json == null || json.isBlank() || "[]".equals(json)) return Collections.emptyList();
        try {
            return objectMapper.readValue(json, new TypeReference<List<String>>() {});
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    private List<Map<String, String>> parseProductTags(String json) {
        if (json == null || json.isBlank() || "[]".equals(json)) return Collections.emptyList();
        try {
            return objectMapper.readValue(json, new TypeReference<List<Map<String, String>>>() {});
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
