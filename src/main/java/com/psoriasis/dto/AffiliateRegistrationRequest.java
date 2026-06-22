package com.psoriasis.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AffiliateRegistrationRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    private String bio;
    private String conditionLabel;
    private String socialLinks;
    private String paymentInfo;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getConditionLabel() { return conditionLabel; }
    public void setConditionLabel(String conditionLabel) { this.conditionLabel = conditionLabel; }
    public String getSocialLinks() { return socialLinks; }
    public void setSocialLinks(String socialLinks) { this.socialLinks = socialLinks; }
    public String getPaymentInfo() { return paymentInfo; }
    public void setPaymentInfo(String paymentInfo) { this.paymentInfo = paymentInfo; }
}
