package com.psoriasis.dto.response;

public class PaymentStatusResponseDTO {
    private String paymentStatus;
    private boolean downloadReady;

    public PaymentStatusResponseDTO() {}

    public PaymentStatusResponseDTO(String paymentStatus, boolean downloadReady) {
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
