package com.psoriasis.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class TestimonialAdminRequest {

    private Long affiliateId;

    @NotBlank
    private String name;

    private String location;
    private String conditionDuration;
    private List<String> categories;
    private String summary;
    private String initialQuote;
    private String resultQuote;

    @NotNull
    private Boolean featured = false;

    private String avatarUrl;

    @NotBlank
    private String lang = "ms";

    @NotNull
    private Integer sortOrder = 0;

    @NotBlank
    private String status = "active";

    @Valid
    private List<TestimonialProgressAdminRequest> progressHistory;

    public Long getAffiliateId() { return affiliateId; }
    public void setAffiliateId(Long affiliateId) { this.affiliateId = affiliateId; }
    public @NotBlank String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getConditionDuration() { return conditionDuration; }
    public void setConditionDuration(String conditionDuration) { this.conditionDuration = conditionDuration; }
    public List<String> getCategories() { return categories; }
    public void setCategories(List<String> categories) { this.categories = categories; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getInitialQuote() { return initialQuote; }
    public void setInitialQuote(String initialQuote) { this.initialQuote = initialQuote; }
    public String getResultQuote() { return resultQuote; }
    public void setResultQuote(String resultQuote) { this.resultQuote = resultQuote; }
    public @NotNull Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public @NotBlank String getLang() { return lang; }
    public void setLang(String lang) { this.lang = lang; }
    public @NotNull Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    public @NotBlank String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public List<TestimonialProgressAdminRequest> getProgressHistory() { return progressHistory; }
    public void setProgressHistory(List<TestimonialProgressAdminRequest> progressHistory) { this.progressHistory = progressHistory; }

    public static class TestimonialProgressAdminRequest {
        private String dateLabel;
        private String title;
        private String description;
        private String notes;
        private List<String> tips;
        private List<String> images;
        private List<java.util.Map<String, String>> productTags;
        private java.util.Map<String, Object> details;
        private Integer sortOrder = 0;

        public String getDateLabel() { return dateLabel; }
        public void setDateLabel(String dateLabel) { this.dateLabel = dateLabel; }
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
        public List<String> getTips() { return tips; }
        public void setTips(List<String> tips) { this.tips = tips; }
        public List<String> getImages() { return images; }
        public void setImages(List<String> images) { this.images = images; }
        public List<java.util.Map<String, String>> getProductTags() { return productTags; }
        public void setProductTags(List<java.util.Map<String, String>> productTags) { this.productTags = productTags; }
        public java.util.Map<String, Object> getDetails() { return details; }
        public void setDetails(java.util.Map<String, Object> details) { this.details = details; }
        public Integer getSortOrder() { return sortOrder; }
        public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    }
}
