package com.psoriasis.dto;

import java.math.BigDecimal;

public class CheckoutResponse {

    private String sessionId;
    private String url;
    private BigDecimal amount;
    private BigDecimal surcharge;
    private BigDecimal total;
    private String currency;

    public CheckoutResponse() {}

    public CheckoutResponse(String sessionId, String url, BigDecimal amount, BigDecimal surcharge, BigDecimal total, String currency) {
        this.sessionId = sessionId;
        this.url = url;
        this.amount = amount;
        this.surcharge = surcharge;
        this.total = total;
        this.currency = currency;
    }

    public String getSessionId() { return sessionId; }
    public void setSessionId(String sessionId) { this.sessionId = sessionId; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public BigDecimal getSurcharge() { return surcharge; }
    public void setSurcharge(BigDecimal surcharge) { this.surcharge = surcharge; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
}
