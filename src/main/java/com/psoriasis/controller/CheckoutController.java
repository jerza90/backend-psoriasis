package com.psoriasis.controller;

import com.psoriasis.dto.CheckoutRequest;
import com.psoriasis.dto.response.CheckoutUrlResponseDTO;
import com.psoriasis.dto.response.DownloadUrlResponseDTO;
import com.psoriasis.dto.response.PaymentStatusResponseDTO;
import com.psoriasis.service.CheckoutService;
import com.psoriasis.service.EbookDeliveryService;
import com.psoriasis.service.ToyyibPayService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
    public CheckoutUrlResponseDTO createSession(@Valid @RequestBody CheckoutRequest request) {
        try {
            if ("bm".equals(request.getProduct())) {
                String url = toyyibPayService.createBill(
                        request.getFullName(),
                        request.getEmail(),
                        request.getReferralCode()
                );
                return new CheckoutUrlResponseDTO(url);
            }
            String url = checkoutService.createCheckoutSession(
                    request.getFullName(),
                    request.getEmail(),
                    request.getProduct(),
                    request.getReferralCode()
            );
            return new CheckoutUrlResponseDTO(url);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e);
        }
    }

    @GetMapping("/session/{sessionId}")
    public PaymentStatusResponseDTO getSession(@PathVariable String sessionId) {
        return checkoutService.getSessionStatus(sessionId);
    }

    @PostMapping("/session/{sessionId}/request-download")
    public DownloadUrlResponseDTO requestDownload(@PathVariable String sessionId) {
        String downloadUrl = checkoutService.requestDownload(sessionId);
        return new DownloadUrlResponseDTO(downloadUrl);
    }
}
