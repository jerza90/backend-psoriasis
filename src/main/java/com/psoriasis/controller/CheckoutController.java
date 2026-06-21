package com.psoriasis.controller;

import com.psoriasis.dto.CheckoutRequest;
import com.psoriasis.service.CheckoutService;
import com.psoriasis.service.EbookDeliveryService;
import com.psoriasis.service.ToyyibPayService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final CheckoutService checkoutService;
    private final ToyyibPayService toyyibPayService;
    private final EbookDeliveryService deliveryService;

    public CheckoutController(CheckoutService checkoutService, ToyyibPayService toyyibPayService, EbookDeliveryService deliveryService) {
        this.checkoutService = checkoutService;
        this.toyyibPayService = toyyibPayService;
        this.deliveryService = deliveryService;
    }

    @PostMapping("/create-session")
    public ResponseEntity<?> createSession(@Valid @RequestBody CheckoutRequest request) {
        try {
            if ("bm".equals(request.getProduct())) {
                String url = toyyibPayService.createBill(
                        request.getFullName(),
                        request.getEmail(),
                        request.getReferralCode()
                );
                return ResponseEntity.ok(Map.of("url", url));
            }
            String url = checkoutService.createCheckoutSession(
                    request.getFullName(),
                    request.getEmail(),
                    request.getProduct(),
                    request.getReferralCode()
            );
            return ResponseEntity.ok(Map.of("url", url));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<?> getSession(@PathVariable String sessionId) {
        try {
            return checkoutService.getSessionStatus(sessionId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/session/{sessionId}/request-download")
    public ResponseEntity<?> requestDownload(@PathVariable String sessionId) {
        try {
            String downloadUrl = checkoutService.requestDownload(sessionId);
            return ResponseEntity.ok(Map.of("downloadUrl", downloadUrl));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
