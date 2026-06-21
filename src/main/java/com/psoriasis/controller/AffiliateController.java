package com.psoriasis.controller;

import com.psoriasis.dto.AffiliateRegistrationRequest;
import com.psoriasis.dto.AffiliateProfileUpdateRequest;
import com.psoriasis.dto.response.ApiResponse;
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
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody AffiliateRegistrationRequest request) {
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
                .map(profile -> ResponseEntity.ok(profile))
                .orElse(ResponseEntity.ok(new AffiliatePublicResponse()));
    }

    @GetMapping("/public")
    public ResponseEntity<ApiResponse> getPublicProfile(@RequestParam String code) {
        return affiliateService.findByReferralCode(code)
                .<ResponseEntity<ApiResponse>>map(profile -> ResponseEntity.ok((ApiResponse) profile))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/conversions")
    public ResponseEntity<AffiliateConversionsResponse> getConversions(@PathVariable Long id) {
        return ResponseEntity.ok(affiliateService.getConversions(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getAffiliate(@PathVariable Long id) {
        return affiliateService.findById(id)
                .<ResponseEntity<ApiResponse>>map(profile -> ResponseEntity.ok((ApiResponse) profile))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse> getProfileByEmail(@RequestParam String email) {
        return affiliateService.findByEmail(email)
                .<ResponseEntity<ApiResponse>>map(profile -> ResponseEntity.ok((ApiResponse) profile))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse> updateProfile(@RequestParam String email, @RequestBody AffiliateProfileUpdateRequest request) {
        try {
            return ResponseEntity.ok(affiliateService.updateProfile(email, request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
