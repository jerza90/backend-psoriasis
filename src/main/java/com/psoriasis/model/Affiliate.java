package com.psoriasis.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "affiliates")
public class Affiliate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "referral_code", nullable = false, unique = true, length = 50)
    private String referralCode;

    @Column(columnDefinition = "TEXT")
    private String bio;

    @Column(name = "page_title", columnDefinition = "TEXT")
    private String pageTitle;

    @Column(name = "page_intro", columnDefinition = "TEXT")
    private String pageIntro;

    @Column(name = "story_title", columnDefinition = "TEXT")
    private String storyTitle;

    @Column(name = "story_summary", columnDefinition = "TEXT")
    private String storySummary;

    @Column(name = "story_body", columnDefinition = "TEXT")
    private String storyBody;

    @Column(name = "blog_title", columnDefinition = "TEXT")
    private String blogTitle;

    @Column(name = "blog_excerpt", columnDefinition = "TEXT")
    private String blogExcerpt;

    @Column(name = "blog_url", length = 500)
    private String blogUrl;

    @Column(name = "blog_image_url", length = 500)
    private String blogImageUrl;

    @Column(name = "tips_title", columnDefinition = "TEXT")
    private String tipsTitle;

    @Column(name = "tips_text", columnDefinition = "TEXT")
    private String tipsText;

    @Column(name = "guide_title", columnDefinition = "TEXT")
    private String guideTitle;

    @Column(name = "guide_text", columnDefinition = "TEXT")
    private String guideText;

    @Column(name = "progress_title", columnDefinition = "TEXT")
    private String progressTitle;

    @Column(name = "progress_text", columnDefinition = "TEXT")
    private String progressText;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Column(name = "social_links", columnDefinition = "TEXT")
    private String socialLinks;

    @Column(name = "payment_info", columnDefinition = "TEXT")
    private String paymentInfo;

    @Column(name = "commission_rate", nullable = false, precision = 5, scale = 4)
    private BigDecimal commissionRate = new BigDecimal("0.5000");

    @Column(name = "total_earned", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalEarned = BigDecimal.ZERO;

    @Column(name = "total_paid", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPaid = BigDecimal.ZERO;

    @Column(nullable = false, length = 20)
    private String status = "active";

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getReferralCode() { return referralCode; }
    public void setReferralCode(String referralCode) { this.referralCode = referralCode; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getPageTitle() { return pageTitle; }
    public void setPageTitle(String pageTitle) { this.pageTitle = pageTitle; }
    public String getPageIntro() { return pageIntro; }
    public void setPageIntro(String pageIntro) { this.pageIntro = pageIntro; }
    public String getStoryTitle() { return storyTitle; }
    public void setStoryTitle(String storyTitle) { this.storyTitle = storyTitle; }
    public String getStorySummary() { return storySummary; }
    public void setStorySummary(String storySummary) { this.storySummary = storySummary; }
    public String getStoryBody() { return storyBody; }
    public void setStoryBody(String storyBody) { this.storyBody = storyBody; }
    public String getBlogTitle() { return blogTitle; }
    public void setBlogTitle(String blogTitle) { this.blogTitle = blogTitle; }
    public String getBlogExcerpt() { return blogExcerpt; }
    public void setBlogExcerpt(String blogExcerpt) { this.blogExcerpt = blogExcerpt; }
    public String getBlogUrl() { return blogUrl; }
    public void setBlogUrl(String blogUrl) { this.blogUrl = blogUrl; }
    public String getBlogImageUrl() { return blogImageUrl; }
    public void setBlogImageUrl(String blogImageUrl) { this.blogImageUrl = blogImageUrl; }
    public String getTipsTitle() { return tipsTitle; }
    public void setTipsTitle(String tipsTitle) { this.tipsTitle = tipsTitle; }
    public String getTipsText() { return tipsText; }
    public void setTipsText(String tipsText) { this.tipsText = tipsText; }
    public String getGuideTitle() { return guideTitle; }
    public void setGuideTitle(String guideTitle) { this.guideTitle = guideTitle; }
    public String getGuideText() { return guideText; }
    public void setGuideText(String guideText) { this.guideText = guideText; }
    public String getProgressTitle() { return progressTitle; }
    public void setProgressTitle(String progressTitle) { this.progressTitle = progressTitle; }
    public String getProgressText() { return progressText; }
    public void setProgressText(String progressText) { this.progressText = progressText; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getSocialLinks() { return socialLinks; }
    public void setSocialLinks(String socialLinks) { this.socialLinks = socialLinks; }
    public String getPaymentInfo() { return paymentInfo; }
    public void setPaymentInfo(String paymentInfo) { this.paymentInfo = paymentInfo; }
    public BigDecimal getCommissionRate() { return commissionRate; }
    public void setCommissionRate(BigDecimal commissionRate) { this.commissionRate = commissionRate; }
    public BigDecimal getTotalEarned() { return totalEarned; }
    public void setTotalEarned(BigDecimal totalEarned) { this.totalEarned = totalEarned; }
    public BigDecimal getTotalPaid() { return totalPaid; }
    public void setTotalPaid(BigDecimal totalPaid) { this.totalPaid = totalPaid; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
