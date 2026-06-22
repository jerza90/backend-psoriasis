package com.psoriasis.controller;

import com.psoriasis.dto.AffiliateRegistrationRequest;
import com.psoriasis.dto.AffiliateProfileUpdateRequest;
import com.psoriasis.dto.response.AffiliateConversionsResponseDTO;
import com.psoriasis.dto.response.AffiliatePublicResponseDTO;
import com.psoriasis.dto.response.AffiliateResponseDTO;
import com.psoriasis.service.AffiliateService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/affiliate")
public class AffiliateController {

    private final AffiliateService affiliateService;

    public AffiliateController(AffiliateService affiliateService) {
        this.affiliateService = affiliateService;
    }

    @PostMapping("/register")
    public AffiliateResponseDTO register(@Valid @RequestBody AffiliateRegistrationRequest request) {
        return affiliateService.register(
                request.getName(),
                request.getEmail(),
                request.getBio(),
                request.getConditionLabel(),
                request.getSocialLinks(),
                request.getPaymentInfo()
        );
    }

    @GetMapping("/lookup")
    public AffiliatePublicResponseDTO lookup(@RequestParam("code") String code) {
        return affiliateService.findByReferralCode(code)
                .orElse(new AffiliatePublicResponseDTO());
    }

    @GetMapping("/public")
    public AffiliatePublicResponseDTO getPublicProfile(@RequestParam("code") String code) {
        return affiliateService.findByReferralCode(code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Affiliate profile not found"));
    }

    @GetMapping("/{id}/conversions")
    public AffiliateConversionsResponseDTO getConversions(@PathVariable Long id) {
        return affiliateService.getConversions(id);
    }

    @GetMapping("/{id}")
    public AffiliateResponseDTO getAffiliate(@PathVariable Long id) {
        return affiliateService.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Affiliate not found"));
    }

    @GetMapping("/profile")
    public AffiliateResponseDTO getProfileByEmail(@RequestParam("email") String email) {
        return affiliateService.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Affiliate profile not found"));
    }

    @PutMapping("/profile")
    public AffiliateResponseDTO updateProfile(@RequestParam("email") String email, @RequestBody AffiliateProfileUpdateRequest request) {
        return affiliateService.updateProfile(email, request);
    }
}
