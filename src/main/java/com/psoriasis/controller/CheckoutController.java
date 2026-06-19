package com.psoriasis.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.psoriasis.dto.CheckoutRequest;
import com.psoriasis.dto.CheckoutResponse;
import com.psoriasis.service.CheckoutService;
import jakarta.validation.Valid;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/create-session")
    public ResponseEntity<?> createSession(@Valid @RequestBody CheckoutRequest request) {
        try {
            CheckoutResponse response = checkoutService.createCheckoutSession(request);
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.internalServerError()
                    .body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/session/{sessionId}")
    public ResponseEntity<?> getSession(@PathVariable String sessionId) {
        try {
            var session = checkoutService.retrieveSession(sessionId);
            return ResponseEntity.ok(session);
        } catch (StripeException e) {
            return ResponseEntity.internalServerError()
                    .body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/session/{sessionId}/download")
    public ResponseEntity<?> downloadEbook(@PathVariable String sessionId) {
        try {
            Session session = checkoutService.retrieveSession(sessionId);
            if (!"paid".equals(session.getPaymentStatus())) {
                return ResponseEntity.status(402)
                        .body(java.util.Map.of("error", "Payment not completed"));
            }

            checkoutService.handlePaymentSuccess(sessionId);

            Resource resource = new ClassPathResource("static/ebook/FreeFromPsoriasis-Guide.pdf");
            if (!resource.exists()) {
                return ResponseEntity.status(404)
                        .body(java.util.Map.of("error", "Ebook file not found"));
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"FreeFromPsoriasis-2021-Guide.pdf\"")
                    .body(resource);
        } catch (StripeException e) {
            return ResponseEntity.internalServerError()
                    .body(java.util.Map.of("error", e.getMessage()));
        }
    }
}
