package com.psoriasis.controller;

import com.psoriasis.dto.AffiliateRegistrationRequest;
import com.psoriasis.dto.AffiliateProfileUpdateRequest;
import com.psoriasis.dto.response.AffiliateConversionsResponse;
import com.psoriasis.dto.response.AffiliatePublicResponse;
import com.psoriasis.dto.response.AffiliateResponse;
import com.psoriasis.dto.response.ErrorResponse;
import com.psoriasis.service.AffiliateService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/affiliate")
public class AffiliateController {

    private final AffiliateService affiliateService;

    public AffiliateController(AffiliateService affiliateService) {
        this.affiliateService = affiliateService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody AffiliateRegistrationRequest request) {
        try {
            return ResponseEntity.ok(affiliateService.register(
                    request.getName(),
                    request.getEmail(),
                    request.getBio(),
                    request.getSocialLinks(),
                    request.getPaymentInfo()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/lookup")
    public ResponseEntity<AffiliatePublicResponse> lookup(@RequestParam String code) {
        return affiliateService.findByReferralCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(new AffiliatePublicResponse()));
    }

    @GetMapping("/public")
    public ResponseEntity<?> getPublicProfile(@RequestParam String code) {
        return affiliateService.findByReferralCode(code)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/conversions")
    public ResponseEntity<AffiliateConversionsResponse> getConversions(@PathVariable Long id) {
        return ResponseEntity.ok(affiliateService.getConversions(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAffiliate(@PathVariable Long id) {
        return affiliateService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfileByEmail(@RequestParam String email) {
        return affiliateService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestParam String email, @RequestBody AffiliateProfileUpdateRequest request) {
        try {
            return ResponseEntity.ok(affiliateService.updateProfile(email, request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
