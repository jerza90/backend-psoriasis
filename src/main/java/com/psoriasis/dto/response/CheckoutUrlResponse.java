package com.psoriasis.dto.response;

public class CheckoutUrlResponse implements ApiResponse {
    private String url;

    public CheckoutUrlResponse() {}

    public CheckoutUrlResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
