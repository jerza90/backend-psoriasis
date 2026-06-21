package com.psoriasis.controller;

import com.psoriasis.dto.DebugEmailRequest;
import com.psoriasis.dto.response.DebugEmailResponse;
import com.psoriasis.dto.response.ErrorResponse;
import com.psoriasis.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> sendTest(@Valid @RequestBody DebugEmailRequest request,
                                      @RequestHeader(value = "X-Debug-Token", required = false) String token) {
        if (debugEmailToken == null || debugEmailToken.isBlank()) {
            return ResponseEntity.status(503).body(new ErrorResponse("Debug email token is not configured"));
        }
        if (token == null || !debugEmailToken.equals(token)) {
            return ResponseEntity.status(403).body(new ErrorResponse("Invalid debug token"));
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

        return ResponseEntity.ok(new DebugEmailResponse("Test email sent", request.getTo(), type));
    }
}
