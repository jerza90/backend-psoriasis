package com.psoriasis.controller;

import com.psoriasis.dto.CheckoutRequest;
import com.psoriasis.dto.response.CheckoutUrlResponse;
import com.psoriasis.dto.response.DownloadUrlResponse;
import com.psoriasis.dto.response.ErrorResponse;
import com.psoriasis.dto.response.PaymentStatusResponse;
import com.psoriasis.service.CheckoutService;
import com.psoriasis.service.EbookDeliveryService;
import com.psoriasis.service.ToyyibPayService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
                return ResponseEntity.ok(new CheckoutUrlResponse(url));
            }
            String url = checkoutService.createCheckoutSession(
                    request.getFullName(),
                    request.getEmail(),
                    request.getProduct(),
                    request.getReferralCode()
            );
            return ResponseEntity.ok(new CheckoutUrlResponse(url));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<PaymentStatusResponse> getSession(@PathVariable String sessionId) {
        try {
            return ResponseEntity.ok(checkoutService.getSessionStatus(sessionId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new PaymentStatusResponse("unknown", false));
        }
    }

    @PostMapping("/session/{sessionId}/request-download")
    public ResponseEntity<?> requestDownload(@PathVariable String sessionId) {
        try {
            String downloadUrl = checkoutService.requestDownload(sessionId);
            return ResponseEntity.ok(new DownloadUrlResponse(downloadUrl));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
