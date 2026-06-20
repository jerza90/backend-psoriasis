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
    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public ToyyibPayService(PaymentOrderRepository orderRepository, EbookDeliveryService deliveryService) {
        this.orderRepository = orderRepository;
        this.deliveryService = deliveryService;
    }

    public String createBill(String fullName, String email) throws Exception {
        String billRef = "BM-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String returnUrl = frontendUrl + "/thank-you?billcode={billcode}&status_id={status_id}";

        String body = "userSecretKey=" + encode(userSecretKey)
                + "&categoryCode=" + encode(categoryCode)
                + "&billName=" + encode("Panduan Sokongan Psoriasis")
                + "&billDescription=" + encode("PDF ebook — akses segera")
                + "&billAmount=" + encode("3900")
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

        if (raw.startsWith("No")) {
            return order;
        }

        if (raw.startsWith("{")) {
            return order;
        }

        List<Map<String, Object>> transactions = objectMapper.readValue(raw, new TypeReference<List<Map<String, Object>>>() {});

        if (!transactions.isEmpty()) {
            Map<String, Object> tx = transactions.get(0);
            order.setRefNo((String) tx.get("ref_no"));
            order.setPaymentChannel((String) tx.get("payment_channel"));

            String paidAmount = tx.get("paid_amount").toString();
            order.setAmount(new BigDecimal(paidAmount));
            order.setTransactionCharge(new BigDecimal(tx.get("transaction_charge").toString()));
            order.setNettReceived(new BigDecimal(tx.get("nett_received").toString()));

            Object payerInfo = tx.get("bill_payer_info");
            if (payerInfo instanceof Map) {
                Map<String, Object> payer = (Map<String, Object>) payerInfo;
                order.setCustomerName((String) payer.get("name"));
                order.setCustomerPhone((String) payer.get("phone_no"));
                order.setCustomerEmail((String) payer.get("email"));
            }

            String statusId = tx.get("status_id").toString();
            boolean wasUnpaid = "Unpaid".equals(order.getPaymentStatus());
            order.setPaymentStatus("1".equals(statusId) ? "Paid" : "Unpaid");
            order.setStatusReason((String) tx.get("status_reason"));

            String paymentDate = (String) tx.get("payment_date");
            if (paymentDate != null && !paymentDate.isEmpty()) {
                order.setPaymentDate(LocalDateTime.parse(paymentDate, DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));
            }

            if (wasUnpaid && "Paid".equals(order.getPaymentStatus())) {
                orderRepository.save(order);
                deliveryService.generateAndSend(order);
                return order;
            }
        }

        orderRepository.save(order);
        return order;
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
