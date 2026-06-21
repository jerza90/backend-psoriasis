package com.psoriasis.dto.response;

public class CheckoutUrlResponseDTO {
    private String url;

    public CheckoutUrlResponseDTO() {}

    public CheckoutUrlResponseDTO(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
