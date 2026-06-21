package com.psoriasis.controller;

import com.psoriasis.dto.AffiliateRegistrationRequest;
import com.psoriasis.dto.AffiliateProfileUpdateRequest;
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
            return ResponseEntity.ok(buildAffiliateResponse(affiliate));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/lookup")
    public ResponseEntity<?> lookup(@RequestParam String code) {
        return affiliateService.findByReferralCode(code)
                .map(a -> ResponseEntity.ok(buildPublicAffiliateResponse(a)))
                .orElse(ResponseEntity.ok(Map.of()));
    }

    @GetMapping("/public")
    public ResponseEntity<?> getPublicProfile(@RequestParam String code) {
        return affiliateService.findByReferralCode(code)
                .map(a -> ResponseEntity.ok(buildPublicAffiliateResponse(a)))
                .orElse(ResponseEntity.notFound().build());
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
                .map(a -> ResponseEntity.ok(buildAffiliateResponse(a)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfileByEmail(@RequestParam String email) {
        return affiliateService.findByEmail(email)
                .map(a -> ResponseEntity.ok(buildAffiliateResponse(a)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestParam String email, @RequestBody AffiliateProfileUpdateRequest request) {
        try {
            Affiliate affiliate = affiliateService.updateProfile(email, request);
            return ResponseEntity.ok(buildAffiliateResponse(affiliate));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    private Map<String, Object> buildAffiliateResponse(Affiliate a) {
        Map<String, Object> data = new java.util.HashMap<>();
        data.put("id", a.getId());
        data.put("name", a.getName());
        data.put("email", a.getEmail());
        data.put("referralCode", a.getReferralCode());
        data.put("bio", a.getBio());
        data.put("pageTitle", a.getPageTitle());
        data.put("pageIntro", a.getPageIntro());
        data.put("storyTitle", a.getStoryTitle());
        data.put("storySummary", a.getStorySummary());
        data.put("storyBody", a.getStoryBody());
        data.put("blogTitle", a.getBlogTitle());
        data.put("blogExcerpt", a.getBlogExcerpt());
        data.put("blogUrl", a.getBlogUrl());
        data.put("blogImageUrl", a.getBlogImageUrl());
        data.put("tipsTitle", a.getTipsTitle());
        data.put("tipsText", a.getTipsText());
        data.put("guideTitle", a.getGuideTitle());
        data.put("guideText", a.getGuideText());
        data.put("progressTitle", a.getProgressTitle());
        data.put("progressText", a.getProgressText());
        data.put("avatarUrl", a.getAvatarUrl());
        data.put("socialLinks", a.getSocialLinks());
        data.put("paymentInfo", a.getPaymentInfo());
        data.put("commissionRate", a.getCommissionRate());
        data.put("totalEarned", a.getTotalEarned());
        data.put("totalPaid", a.getTotalPaid());
        data.put("status", a.getStatus());
        data.put("referralLink", affiliateService.buildReferralLink(a.getReferralCode()));
        data.put("createdAt", a.getCreatedAt().toString());
        return data;
    }

    private Map<String, Object> buildPublicAffiliateResponse(Affiliate a) {
        Map<String, Object> data = new java.util.HashMap<>();
        data.put("id", a.getId());
        data.put("name", a.getName());
        data.put("bio", a.getBio());
        data.put("pageTitle", a.getPageTitle());
        data.put("pageIntro", a.getPageIntro());
        data.put("storyTitle", a.getStoryTitle());
        data.put("storySummary", a.getStorySummary());
        data.put("storyBody", a.getStoryBody());
        data.put("blogTitle", a.getBlogTitle());
        data.put("blogExcerpt", a.getBlogExcerpt());
        data.put("blogUrl", a.getBlogUrl());
        data.put("blogImageUrl", a.getBlogImageUrl());
        data.put("tipsTitle", a.getTipsTitle());
        data.put("tipsText", a.getTipsText());
        data.put("guideTitle", a.getGuideTitle());
        data.put("guideText", a.getGuideText());
        data.put("progressTitle", a.getProgressTitle());
        data.put("progressText", a.getProgressText());
        data.put("avatarUrl", a.getAvatarUrl());
        data.put("socialLinks", a.getSocialLinks());
        data.put("referralCode", a.getReferralCode());
        data.put("referralLink", affiliateService.buildReferralLink(a.getReferralCode()));
        return data;
    }
}
