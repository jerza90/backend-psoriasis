package com.psoriasis.dto.response;

public class DebugPurchaseResponseDTO {
    private String message;
    private String orderRef;
    private String customerEmail;
    private String downloadUrl;

    public DebugPurchaseResponseDTO() {}

    public DebugPurchaseResponseDTO(String message, String orderRef, String customerEmail, String downloadUrl) {
        this.message = message;
        this.orderRef = orderRef;
        this.customerEmail = customerEmail;
        this.downloadUrl = downloadUrl;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getOrderRef() { return orderRef; }
    public void setOrderRef(String orderRef) { this.orderRef = orderRef; }
    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
    public String getDownloadUrl() { return downloadUrl; }
    public void setDownloadUrl(String downloadUrl) { this.downloadUrl = downloadUrl; }
}
