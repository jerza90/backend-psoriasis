package com.psoriasis.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class CheckoutRequest {

    @NotBlank
    private String fullName;

    @NotBlank @Email
    private String email;

    private String productType = "ebook";
    private String productId = "free-from-psoriasis-guide";

    public CheckoutRequest() {}

    public CheckoutRequest(String fullName, String email, String productType, String productId) {
        this.fullName = fullName;
        this.email = email;
        this.productType = productType;
        this.productId = productId;
    }

    public @NotBlank String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public @NotBlank @Email String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getProductType() { return productType; }
    public void setProductType(String productType) { this.productType = productType; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }
}
