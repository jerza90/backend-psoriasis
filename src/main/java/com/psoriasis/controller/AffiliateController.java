package com.psoriasis.controller;

import com.psoriasis.dto.AffiliateRegistrationRequest;
import com.psoriasis.model.Affiliate;
import com.psoriasis.model.ReferralConversion;
import com.psoriasis.service.AffiliateService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
            Affiliate affiliate = affiliateService.register(
                    request.getName(),
                    request.getEmail(),
                    request.getBio(),
                    request.getSocialLinks(),
                    request.getPaymentInfo()
            );
            return ResponseEntity.ok(Map.of(
                    "id", affiliate.getId(),
                    "name", affiliate.getName(),
                    "referralCode", affiliate.getReferralCode(),
                    "commissionRate", affiliate.getCommissionRate(),
                    "referralLink", buildReferralLink(affiliate.getReferralCode())
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/lookup")
    public ResponseEntity<?> lookup(@RequestParam String code) {
        return affiliateService.findByReferralCode(code)
                .map(a -> ResponseEntity.ok(Map.of(
                        "id", a.getId(),
                        "name", a.getName(),
                        "bio", a.getBio() != null ? a.getBio() : "",
                        "avatarUrl", a.getAvatarUrl() != null ? a.getAvatarUrl() : ""
                )))
                .orElse(ResponseEntity.ok(Map.of()));
    }

    @GetMapping("/{id}/conversions")
    public ResponseEntity<?> getConversions(@PathVariable Long id) {
        List<ReferralConversion> conversions = affiliateService.getConversions(id);
        return ResponseEntity.ok(Map.of(
                "count", conversions.size(),
                "conversions", conversions.stream().map(c -> Map.of(
                        "id", c.getId(),
                        "orderAmount", c.getOrderAmount(),
                        "commissionAmount", c.getCommissionAmount(),
                        "status", c.getStatus(),
                        "createdAt", c.getCreatedAt().toString()
                )).toList()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAffiliate(@PathVariable Long id) {
        return affiliateService.findById(id)
                .map(a -> {
                    Map<String, Object> data = new java.util.HashMap<>();
                    data.put("id", a.getId());
                    data.put("name", a.getName());
                    data.put("email", a.getEmail());
                    data.put("referralCode", a.getReferralCode());
                    data.put("bio", a.getBio());
                    data.put("avatarUrl", a.getAvatarUrl());
                    data.put("commissionRate", a.getCommissionRate());
                    data.put("totalEarned", a.getTotalEarned());
                    data.put("totalPaid", a.getTotalPaid());
                    data.put("status", a.getStatus());
                    data.put("referralLink", buildReferralLink(a.getReferralCode()));
                    data.put("createdAt", a.getCreatedAt().toString());
                    return ResponseEntity.ok(data);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private String buildReferralLink(String code) {
        return "https://frontend-eta-seven-55.vercel.app/checkout?ref=" + code;
    }
}
