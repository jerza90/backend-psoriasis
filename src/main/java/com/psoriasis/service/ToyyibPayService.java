package com.psoriasis.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class ToyyibPayService {

    @Value("${toyyipay.user-secret-key}")
    private String userSecretKey;

    @Value("${toyyipay.category-code}")
    private String categoryCode;

    @Value("${toyyipay.base-url}")
    private String baseUrl;

    @Value("${toyyipay.callback-url}")
    private String callbackUrl;

    @Value("${frontend.url}")
    private String frontendUrl;

    private final PaymentOrderRepository orderRepository;
    private final EbookDeliveryService deliveryService;
    private final AffiliateService affiliateService;
    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ToyyibPayService(PaymentOrderRepository orderRepository, EbookDeliveryService deliveryService, AffiliateService affiliateService) {
        this.orderRepository = orderRepository;
        this.deliveryService = deliveryService;
        this.affiliateService = affiliateService;
    }

    public String createBill(String fullName, String email) throws Exception {
        return createBill(fullName, email, null);
    }

    public String createBill(String fullName, String email, String referralCode) throws Exception {
        String billRef = "BM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String returnUrl = frontendUrl + "/thank-you?billcode={billcode}&status_id={status_id}";
        String billAmount = "3900";

        String body = "userSecretKey=" + encode(userSecretKey)
                + "&categoryCode=" + encode(categoryCode)
                + "&billName=" + encode("Panduan Sokongan Psoriasis")
                + "&billDescription=" + encode("PDF ebook — akses segera")
                + "&billAmount=" + encode(billAmount)
                + "&billPayorInfo=" + encode("1")
                + "&billReturnUrl=" + encode(returnUrl)
                + "&billCallbackUrl=" + encode(callbackUrl)
                + "&billExternalReferenceNo=" + encode(billRef)
                + "&billTo=" + encode(fullName)
                + "&billEmail=" + encode(email)
                + "&billPhone=" + encode("0000000000")
                + "&billPriceSetting=" + encode("1")
                + "&billPaymentChannel=" + encode("0");

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/index.php/api/createBill"))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("ToyyibPay API error: " + response.statusCode());
        }

        String raw = response.body().trim();

        if (raw.startsWith("{")) {
            Map<String, Object> err = objectMapper.readValue(raw, Map.class);
            throw new RuntimeException("ToyyibPay error: " + err.getOrDefault("msg", raw));
        }

        List<Map<String, Object>> result = objectMapper.readValue(raw, List.class);

        if (result.isEmpty() || result.get(0).get("BillCode") == null) {
            throw new RuntimeException("ToyyibPay failed to create bill: " + raw);
        }

        String billCode = (String) result.get(0).get("BillCode");

        PaymentOrder order = new PaymentOrder();
        order.setOrderRef(billRef);
        order.setPaymentMethod("TOYYIBPAY");
        order.setCustomerName(fullName);
        order.setCustomerEmail(email);
        order.setCustomerPhone("0000000000");
        order.setProductName("Panduan Sokongan Psoriasis");
        order.setAmount(new BigDecimal("39.00"));
        order.setCurrency("RM");
        order.setPaymentStatus("Unpaid");
        order.setStatus("Active");
        order.setBillCode(billCode);
        order.setCreatedDate(LocalDateTime.now());
        order.setExpiredDate(LocalDateTime.now().plusDays(1));
        if (referralCode != null && !referralCode.isBlank()) {
            order.setReferralCode(referralCode);
        }
        orderRepository.save(order);

        return baseUrl + "/" + billCode;
    }

    public PaymentOrder checkPaymentStatus(String billCode) throws Exception {
        String body = "userSecretKey=" + encode(userSecretKey)
                + "&billCode=" + encode(billCode);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(baseUrl + "/index.php/api/getBillTransactions"))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(body))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new RuntimeException("ToyyibPay API error: " + response.statusCode());
        }

        String raw = response.body().trim();

        PaymentOrder order = orderRepository.findByBillCode(billCode)
                .orElseThrow(() -> new RuntimeException("Order not found: " + billCode));

        if (raw.startsWith("No") || raw.startsWith("{")) {
            return order;
        }

        List<Map<String, Object>> transactions = objectMapper.readValue(raw, new TypeReference<List<Map<String, Object>>>() {});

        if (transactions.isEmpty()) {
            return order;
        }

        Map<String, Object> tx = transactions.get(0);

        order.setRefNo((String) tx.get("billpaymentInvoiceNo"));
        order.setPaymentChannel((String) tx.get("billpaymentChannel"));

        Object paidAmount = tx.get("billpaymentAmount");
        if (paidAmount != null) {
            order.setAmount(new BigDecimal(paidAmount.toString()));
        }

        Object charge = tx.get("transactionCharge");
        if (charge != null) {
            order.setTransactionCharge(new BigDecimal(charge.toString()));
        }

        String statusId = String.valueOf(tx.getOrDefault("billpaymentStatus", "0"));
        boolean wasUnpaid = "Unpaid".equals(order.getPaymentStatus());
        boolean isPaid = "1".equals(statusId);
        order.setPaymentStatus(isPaid ? "Paid" : "Unpaid");

        if (tx.containsKey("billTo")) order.setCustomerName((String) tx.get("billTo"));
        if (tx.containsKey("billEmail")) order.setCustomerEmail((String) tx.get("billEmail"));
        if (tx.containsKey("billPhone")) order.setCustomerPhone((String) tx.get("billPhone"));

        Object paymentDateObj = tx.get("billPaymentDate");
        if (paymentDateObj != null) {
            String paymentDate = paymentDateObj.toString();
            if (!paymentDate.isEmpty()) {
                try {
                    order.setPaymentDate(LocalDateTime.parse(paymentDate, DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));
                } catch (Exception ignored) {}
            }
        }

        if (wasUnpaid && isPaid) {
            order.setStatus("Completed");
            orderRepository.save(order);
            if (order.getReferralCode() != null && order.getAffiliateId() == null) {
                affiliateService.trackConversion(order.getReferralCode(), order);
            }
            deliveryService.generateAndSend(order);
            return order;
        }

        orderRepository.save(order);
        return order;
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
