package com.psoriasis.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "testimonials")
public class Testimonial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "affiliate_id")
    private Long affiliateId;

    @Column(nullable = false)
    private String name;

    private String location;

    @Column(name = "condition_duration")
    private String conditionDuration;

    @Column(columnDefinition = "TEXT")
    private String categories;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column(name = "initial_quote", columnDefinition = "TEXT")
    private String initialQuote;

    @Column(name = "result_quote", columnDefinition = "TEXT")
    private String resultQuote;

    @Column(nullable = false)
    private Boolean featured = false;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(nullable = false, length = 10)
    private String lang = "ms";

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;

    @Column(nullable = false, length = 20)
    private String status = "active";

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getAffiliateId() { return affiliateId; }
    public void setAffiliateId(Long affiliateId) { this.affiliateId = affiliateId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getConditionDuration() { return conditionDuration; }
    public void setConditionDuration(String conditionDuration) { this.conditionDuration = conditionDuration; }
    public String getCategories() { return categories; }
    public void setCategories(String categories) { this.categories = categories; }
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
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
