package com.psoriasis.dto.response;

public class PaymentStatusResponse {
    private String paymentStatus;
    private boolean downloadReady;

    public PaymentStatusResponse() {}

    public PaymentStatusResponse(String paymentStatus, boolean downloadReady) {
        this.paymentStatus = paymentStatus;
        this.downloadReady = downloadReady;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public boolean isDownloadReady() {
        return downloadReady;
    }

    public void setDownloadReady(boolean downloadReady) {
        this.downloadReady = downloadReady;
    }
}
