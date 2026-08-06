package com.psoriasis.dto.response;

import java.math.BigDecimal;

public class DiscountValidationResponseDTO {
    private boolean valid;
    private String code;
    private BigDecimal discountedAmount;
    private BigDecimal originalAmount;
    private String currency;

    public DiscountValidationResponseDTO() {}

    public DiscountValidationResponseDTO(boolean valid, String code, BigDecimal discountedAmount, BigDecimal originalAmount, String currency) {
        this.valid = valid;
        this.code = code;
        this.discountedAmount = discountedAmount;
        this.originalAmount = originalAmount;
        this.currency = currency;
    }

    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public BigDecimal getDiscountedAmount() { return discountedAmount; }
    public void setDiscountedAmount(BigDecimal discountedAmount) { this.discountedAmount = discountedAmount; }

    public BigDecimal getOriginalAmount() { return originalAmount; }
    public void setOriginalAmount(BigDecimal originalAmount) { this.originalAmount = originalAmount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
}
