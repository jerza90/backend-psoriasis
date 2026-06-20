package com.psoriasis.controller;

import com.psoriasis.dto.CheckoutRequest;
import com.psoriasis.service.CheckoutService;
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

    public CheckoutController(CheckoutService checkoutService, ToyyibPayService toyyibPayService) {
        this.checkoutService = checkoutService;
        this.toyyibPayService = toyyibPayService;
    }

    @PostMapping("/create-session")
    public ResponseEntity<?> createSession(@Valid @RequestBody CheckoutRequest request) {
        try {
            if ("bm".equals(request.getProduct())) {
                String url = toyyibPayService.createBill(
                        request.getFullName(),
                        request.getEmail()
                );
                return ResponseEntity.ok(Map.of("url", url));
            }
            String url = checkoutService.createCheckoutSession(
                    request.getFullName(),
                    request.getEmail(),
                    request.getProduct()
            );
            return ResponseEntity.ok(Map.of("url", url));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
