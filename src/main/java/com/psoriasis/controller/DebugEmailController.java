package com.psoriasis.controller;

import com.psoriasis.dto.DebugEmailRequest;
import com.psoriasis.dto.response.DebugEmailResponseDTO;
import com.psoriasis.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/debug/email")
public class DebugEmailController {

    private final EmailService emailService;

    @Value("${app.debug-email-token:}")
    private String debugEmailToken;

    public DebugEmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/test")
    public DebugEmailResponseDTO sendTest(@Valid @RequestBody DebugEmailRequest request,
                                       @RequestHeader(value = "X-Debug-Token", required = false) String token) {
        if (debugEmailToken == null || debugEmailToken.isBlank()) {
            throw new ResponseStatusException(HttpStatus.SERVICE_UNAVAILABLE, "Debug email token is not configured");
        }
        if (token == null || !debugEmailToken.equals(token)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Invalid debug token");
        }

        String type = request.getType() == null ? "generic" : request.getType().trim().toLowerCase();
        switch (type) {
            case "receipt" -> emailService.sendTestReceiptEmail(request.getTo());
            case "otp" -> emailService.sendOtpEmail(request.getTo(), "123456", "Debug Test");
            default -> emailService.sendTestEmail(
                    request.getTo(),
                    request.getSubject(),
                    request.getMessage(),
                    request.getCtaLabel(),
                    request.getCtaUrl()
            );
        }

        return new DebugEmailResponseDTO("Test email sent", request.getTo(), type);
    }
}
