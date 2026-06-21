package com.psoriasis.dto;

import java.util.List;
import java.util.Map;

public class TestimonialResponse {
    private Long id;
    private String name;
    private String location;
    private String conditionDuration;
    private List<String> categories;
    private String summary;
    private String initialQuote;
    private String resultQuote;
    private Boolean featured;
    private String avatarUrl;
    private String lang;
    private List<ProgressEntryDto> progressHistory;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
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
    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getLang() { return lang; }
    public void setLang(String lang) { this.lang = lang; }
    public List<ProgressEntryDto> getProgressHistory() { return progressHistory; }
    public void setProgressHistory(List<ProgressEntryDto> progressHistory) { this.progressHistory = progressHistory; }

    public static class ProgressEntryDto {
        private Long id;
        private String dateLabel;
        private String title;
        private String description;
        private String notes;
        private List<String> tips;
        private List<String> images;
        private List<Map<String, String>> productTags;
        private Map<String, Object> details;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
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
        public List<Map<String, String>> getProductTags() { return productTags; }
        public void setProductTags(List<Map<String, String>> productTags) { this.productTags = productTags; }
        public Map<String, Object> getDetails() { return details; }
        public void setDetails(Map<String, Object> details) { this.details = details; }
    }
}
