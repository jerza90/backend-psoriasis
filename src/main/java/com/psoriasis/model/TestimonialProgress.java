package com.psoriasis.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "testimonial_progress")
public class TestimonialProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "testimonial_id", nullable = false)
    private Long testimonialId;

    @Column(name = "date_label")
    private String dateLabel;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(columnDefinition = "TEXT")
    private String tips;

    @Column(columnDefinition = "TEXT")
    private String images;

    @Column(name = "product_tags", columnDefinition = "TEXT")
    private String productTags;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getTestimonialId() { return testimonialId; }
    public void setTestimonialId(Long testimonialId) { this.testimonialId = testimonialId; }
    public String getDateLabel() { return dateLabel; }
    public void setDateLabel(String dateLabel) { this.dateLabel = dateLabel; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getTips() { return tips; }
    public void setTips(String tips) { this.tips = tips; }
    public String getImages() { return images; }
    public void setImages(String images) { this.images = images; }
    public String getProductTags() { return productTags; }
    public void setProductTags(String productTags) { this.productTags = productTags; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
