package com.psoriasis.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.psoriasis.dto.TestimonialAdminRequest;
import com.psoriasis.dto.TestimonialResponse;
import com.psoriasis.dto.TestimonialResponse.ProgressEntryDto;
import com.psoriasis.model.Testimonial;
import com.psoriasis.model.TestimonialProgress;
import com.psoriasis.repository.TestimonialProgressRepository;
import com.psoriasis.repository.TestimonialRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.IntStream;

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

    public List<TestimonialResponse> getAllAdmin() {
        return testimonialRepository.findAllByOrderBySortOrderAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public TestimonialResponse create(TestimonialAdminRequest request) {
        Testimonial testimonial = new Testimonial();
        applyRequest(testimonial, request);
        testimonial.setId(null);
        testimonial = testimonialRepository.save(testimonial);
        upsertProgress(testimonial.getId(), request.getProgressHistory());
        return toResponse(testimonialRepository.findById(testimonial.getId()).orElseThrow());
    }

    @Transactional
    public TestimonialResponse update(Long id, TestimonialAdminRequest request) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Testimonial not found"));
        applyRequest(testimonial, request);
        testimonialRepository.save(testimonial);
        progressRepository.deleteByTestimonialId(id);
        upsertProgress(id, request.getProgressHistory());
        return toResponse(testimonialRepository.findById(id).orElseThrow());
    }

    @Transactional
    public void delete(Long id) {
        progressRepository.deleteByTestimonialId(id);
        testimonialRepository.deleteById(id);
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

    private void applyRequest(Testimonial testimonial, TestimonialAdminRequest request) {
        testimonial.setAffiliateId(request.getAffiliateId());
        testimonial.setName(request.getName());
        testimonial.setLocation(request.getLocation());
        testimonial.setConditionDuration(request.getConditionDuration());
        testimonial.setCategories(serialize(request.getCategories()));
        testimonial.setSummary(request.getSummary());
        testimonial.setInitialQuote(request.getInitialQuote());
        testimonial.setResultQuote(request.getResultQuote());
        testimonial.setFeatured(Boolean.TRUE.equals(request.getFeatured()));
        testimonial.setAvatarUrl(request.getAvatarUrl());
        testimonial.setLang(normalizeLang(request.getLang()));
        testimonial.setSortOrder(request.getSortOrder() == null ? 0 : request.getSortOrder());
        testimonial.setStatus(request.getStatus() == null || request.getStatus().isBlank() ? "active" : request.getStatus());
    }

    private void upsertProgress(Long testimonialId, List<TestimonialAdminRequest.TestimonialProgressAdminRequest> progressHistory) {
        if (progressHistory == null || progressHistory.isEmpty()) {
            return;
        }

        IntStream.range(0, progressHistory.size()).forEach(index -> {
            TestimonialAdminRequest.TestimonialProgressAdminRequest request = progressHistory.get(index);
            TestimonialProgress progress = new TestimonialProgress();
            progress.setTestimonialId(testimonialId);
            progress.setDateLabel(request.getDateLabel());
            progress.setTitle(request.getTitle());
            progress.setDescription(request.getDescription());
            progress.setNotes(request.getNotes());
            progress.setTips(serialize(request.getTips()));
            progress.setImages(serialize(request.getImages()));
            progress.setProductTags(serialize(request.getProductTags()));
            progress.setDetails(serialize(request.getDetails()));
            progress.setSortOrder(request.getSortOrder() == null ? index : request.getSortOrder());
            progressRepository.save(progress);
        });
    }

    private String serialize(Object value) {
        if (value == null) {
            return "[]";
        }
        try {
            return objectMapper.writeValueAsString(value);
        } catch (Exception e) {
            return "[]";
        }
    }

    private String normalizeLang(String lang) {
        if (lang == null || lang.isBlank()) {
            return "ms";
        }
        return lang.trim().toLowerCase().substring(0, Math.min(2, lang.trim().length()));
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
