package com.psoriasis.controller;

import com.psoriasis.dto.MockPurchaseRequest;
import com.psoriasis.dto.response.DebugPurchaseResponseDTO;
import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import com.psoriasis.service.EbookDeliveryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/api/debug/purchase")
public class DebugPurchaseController {

    private final EbookDeliveryService deliveryService;
    private final PaymentOrderRepository orderRepository;

    @Value("${app.debug-email-token:}")
    private String debugEmailToken;

    @Value("${app.ebook.download-base-url}")
    private String downloadBaseUrl;

    public DebugPurchaseController(EbookDeliveryService deliveryService, PaymentOrderRepository orderRepository) {
        this.deliveryService = deliveryService;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/mock")
    public DebugPurchaseResponseDTO mockPurchase(@Valid @RequestBody MockPurchaseRequest request,
                                              @RequestHeader(value = "X-Debug-Token", required = false) String token) {
        if (debugEmailToken == null || debugEmailToken.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Debug email token is not configured");
        }
        if (token == null || !debugEmailToken.equals(token)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid debug token");
        }

        PaymentOrder order = new PaymentOrder();
        order.setOrderRef(request.getOrderRef() == null || request.getOrderRef().isBlank()
                ? "MOCK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase()
                : request.getOrderRef());
        order.setPaymentMethod(request.getPaymentMethod() == null || request.getPaymentMethod().isBlank()
                ? "MOCK"
                : request.getPaymentMethod().trim());
        order.setCustomerName(request.getCustomerName());
        order.setCustomerEmail(request.getCustomerEmail());
        order.setCustomerPhone(request.getCustomerPhone() == null || request.getCustomerPhone().isBlank()
                ? "-"
                : request.getCustomerPhone().trim());
        order.setProductName(request.getProductName() == null || request.getProductName().isBlank()
                ? "E-Book Bebas Psoriasis"
                : request.getProductName().trim());
        order.setAmount(request.getAmount() == null ? new BigDecimal("35.90") : request.getAmount());
        order.setCurrency(request.getCurrency() == null || request.getCurrency().isBlank()
                ? "RM"
                : request.getCurrency().trim().toUpperCase());
        order.setPaymentStatus("Paid");
        order.setStatus("Completed");
        order.setCreatedDate(LocalDateTime.now());
        order.setPaymentDate(LocalDateTime.now());
        if (request.getReferralCode() != null && !request.getReferralCode().isBlank()) {
            order.setReferralCode(request.getReferralCode().trim());
        }

        orderRepository.save(order);
        deliveryService.generateAndSend(order);

        return new DebugPurchaseResponseDTO(
                "Mock purchase created and emails sent",
                order.getOrderRef(),
                order.getCustomerEmail(),
                downloadBaseUrl + "/" + order.getDownloadToken()
        );
    }
}
