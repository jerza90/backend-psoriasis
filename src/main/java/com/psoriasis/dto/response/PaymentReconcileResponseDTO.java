package com.psoriasis.dto.response;

import java.util.List;

public class PaymentReconcileResponseDTO {
    private int total;
    private int paid;
    private int errors;
    private int skippedTests;
    private List<PaymentReconcileResponseDTO.Item> items;

    public PaymentReconcileResponseDTO() {}

    public PaymentReconcileResponseDTO(int total, int paid, int errors, int skippedTests, List<PaymentReconcileResponseDTO.Item> items) {
        this.total = total;
        this.paid = paid;
        this.errors = errors;
        this.skippedTests = skippedTests;
        this.items = items;
    }

    public int getTotal() { return total; }
    public void setTotal(int total) { this.total = total; }
    public int getPaid() { return paid; }
    public void setPaid(int paid) { this.paid = paid; }
    public int getErrors() { return errors; }
    public void setErrors(int errors) { this.errors = errors; }
    public int getSkippedTests() { return skippedTests; }
    public void setSkippedTests(int skippedTests) { this.skippedTests = skippedTests; }
    public List<PaymentReconcileResponseDTO.Item> getItems() { return items; }
    public void setItems(List<PaymentReconcileResponseDTO.Item> items) { this.items = items; }

    public static class Item {
        private String orderRef;
        private String billCode;
        private String customerEmail;
        private String status;
        private String message;

        public Item() {}

        public Item(String orderRef, String billCode, String customerEmail, String status, String message) {
            this.orderRef = orderRef;
            this.billCode = billCode;
            this.customerEmail = customerEmail;
            this.status = status;
            this.message = message;
        }

        public String getOrderRef() { return orderRef; }
        public void setOrderRef(String orderRef) { this.orderRef = orderRef; }
        public String getBillCode() { return billCode; }
        public void setBillCode(String billCode) { this.billCode = billCode; }
        public String getCustomerEmail() { return customerEmail; }
        public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}