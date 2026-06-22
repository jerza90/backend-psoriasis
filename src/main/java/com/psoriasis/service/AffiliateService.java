package com.psoriasis.service;

import com.psoriasis.dto.response.AffiliateConversionsResponseDTO;
import com.psoriasis.dto.response.AffiliatePublicResponseDTO;
import com.psoriasis.dto.response.AffiliateResponseDTO;
import com.psoriasis.mapper.AffiliateMapper;
import com.psoriasis.model.Affiliate;
import com.psoriasis.model.PaymentOrder;
import com.psoriasis.model.ReferralConversion;
import com.psoriasis.repository.AffiliateRepository;
import com.psoriasis.repository.PaymentOrderRepository;
import com.psoriasis.repository.ReferralConversionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AffiliateService {

    private final AffiliateRepository affiliateRepository;
    private final ReferralConversionRepository conversionRepository;
    private final PaymentOrderRepository paymentOrderRepository;
    private final UserService userService;
    private final AffiliateMapper affiliateMapper;
    @Value("${frontend.url}")
    private String frontendUrl;

    public AffiliateService(AffiliateRepository affiliateRepository,
                            ReferralConversionRepository conversionRepository,
                            PaymentOrderRepository paymentOrderRepository,
                            UserService userService,
                            AffiliateMapper affiliateMapper) {
        this.affiliateRepository = affiliateRepository;
        this.conversionRepository = conversionRepository;
        this.paymentOrderRepository = paymentOrderRepository;
        this.userService = userService;
        this.affiliateMapper = affiliateMapper;
    }

    public AffiliateResponseDTO register(String name, String email, String bio, String socialLinks, String paymentInfo) {
        if (affiliateRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered as affiliate");
        }

        String referralCode = generateReferralCode(name);

        Affiliate affiliate = new Affiliate();
        affiliate.setName(name);
        affiliate.setEmail(email);
        affiliate.setReferralCode(referralCode);
        affiliate.setBio(bio);
        affiliate.setSocialLinks(socialLinks);
        affiliate.setPaymentInfo(paymentInfo);
        affiliate.setCommissionRate(new BigDecimal("0.5000"));
        affiliate.setStatus("active");
        affiliate.setCreatedAt(LocalDateTime.now());
        affiliate.setUpdatedAt(LocalDateTime.now());

        Affiliate saved = affiliateRepository.save(affiliate);
        userService.assignRoleByEmail(email, "affiliate");
        return affiliateMapper.toResponse(saved, buildReferralLink(saved.getReferralCode()));
    }

    public Optional<AffiliatePublicResponseDTO> findByReferralCode(String code) {
        return affiliateRepository.findByReferralCode(code)
                .map(a -> affiliateMapper.toPublicResponse(a, buildReferralLink(a.getReferralCode())));
    }

    public Optional<AffiliateResponseDTO> findById(Long id) {
        return affiliateRepository.findById(id)
                .map(a -> affiliateMapper.toResponse(a, buildReferralLink(a.getReferralCode())));
    }

    public Optional<AffiliateResponseDTO> findByEmail(String email) {
        return affiliateRepository.findByEmail(email)
                .map(a -> affiliateMapper.toResponse(a, buildReferralLink(a.getReferralCode())));
    }

    @Transactional
    public AffiliateResponseDTO updateProfile(String email, com.psoriasis.dto.AffiliateProfileUpdateRequest request) {
        Affiliate affiliate = affiliateRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Affiliate profile not found"));

        if (request.getName() != null) affiliate.setName(request.getName());
        if (request.getAvatarUrl() != null) affiliate.setAvatarUrl(request.getAvatarUrl());
        if (request.getBio() != null) affiliate.setBio(request.getBio());
        if (request.getPageTitle() != null) affiliate.setPageTitle(request.getPageTitle());
        if (request.getPageIntro() != null) affiliate.setPageIntro(request.getPageIntro());
        if (request.getStoryTitle() != null) affiliate.setStoryTitle(request.getStoryTitle());
        if (request.getStorySummary() != null) affiliate.setStorySummary(request.getStorySummary());
        if (request.getStoryBody() != null) affiliate.setStoryBody(request.getStoryBody());
        if (request.getSocialLinks() != null) affiliate.setSocialLinks(request.getSocialLinks());
        if (request.getPaymentInfo() != null) affiliate.setPaymentInfo(request.getPaymentInfo());
        if (request.getBlogTitle() != null) affiliate.setBlogTitle(request.getBlogTitle());
        if (request.getBlogExcerpt() != null) affiliate.setBlogExcerpt(request.getBlogExcerpt());
        if (request.getBlogUrl() != null) affiliate.setBlogUrl(request.getBlogUrl());
        if (request.getBlogImageUrl() != null) affiliate.setBlogImageUrl(request.getBlogImageUrl());
        if (request.getTipsTitle() != null) affiliate.setTipsTitle(request.getTipsTitle());
        if (request.getTipsText() != null) affiliate.setTipsText(request.getTipsText());
        if (request.getGuideTitle() != null) affiliate.setGuideTitle(request.getGuideTitle());
        if (request.getGuideText() != null) affiliate.setGuideText(request.getGuideText());
        if (request.getProgressTitle() != null) affiliate.setProgressTitle(request.getProgressTitle());
        if (request.getProgressText() != null) affiliate.setProgressText(request.getProgressText());
        if (request.getProgressImages() != null) affiliate.setProgressImages(request.getProgressImages());
        affiliate.setUpdatedAt(LocalDateTime.now());
        Affiliate saved = affiliateRepository.save(affiliate);
        return affiliateMapper.toResponse(saved, buildReferralLink(saved.getReferralCode()));
    }

    public List<AffiliateResponseDTO> findAllActive() {
        return affiliateRepository.findAll().stream()
                .filter(a -> "active".equals(a.getStatus()))
                .map(a -> affiliateMapper.toResponse(a, buildReferralLink(a.getReferralCode())))
                .toList();
    }

    @Transactional
    public void trackConversion(String referralCode, PaymentOrder order) {
        if (referralCode == null || referralCode.isBlank()) return;

        Affiliate affiliate = affiliateRepository.findByReferralCode(referralCode).orElse(null);
        if (affiliate == null || !"active".equals(affiliate.getStatus())) return;

        BigDecimal commissionRate = affiliate.getCommissionRate();
        BigDecimal orderAmount = order.getAmount() != null ? order.getAmount() : BigDecimal.ZERO;
        BigDecimal commissionAmount = orderAmount.multiply(commissionRate).setScale(2, RoundingMode.HALF_UP);

        order.setReferralCode(referralCode);
        order.setAffiliateId(affiliate.getId());
        order.setCommissionRate(commissionRate);
        order.setCommissionAmount(commissionAmount);
        paymentOrderRepository.save(order);

        ReferralConversion conversion = new ReferralConversion();
        conversion.setAffiliateId(affiliate.getId());
        conversion.setPaymentOrderId(order.getId());
        conversion.setOrderAmount(orderAmount);
        conversion.setCommissionRate(commissionRate);
        conversion.setCommissionAmount(commissionAmount);
        conversion.setStatus("pending");
        conversion.setCreatedAt(LocalDateTime.now());
        conversionRepository.save(conversion);

        affiliate.setTotalEarned(affiliate.getTotalEarned().add(commissionAmount));
        affiliate.setUpdatedAt(LocalDateTime.now());
        affiliateRepository.save(affiliate);
    }

    public AffiliateConversionsResponseDTO getConversions(Long affiliateId) {
        return affiliateMapper.toConversionsResponse(conversionRepository.findByAffiliateId(affiliateId));
    }

    public long getConversionCount(Long affiliateId) {
        return conversionRepository.countByAffiliateIdAndStatus(affiliateId, "pending");
    }

    private String generateReferralCode(String name) {
        String prefix = name.replaceAll("[^a-zA-Z0-9]", "").toUpperCase();
        prefix = prefix.length() > 6 ? prefix.substring(0, 6) : prefix;
        String suffix = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        String code = prefix + suffix;
        while (affiliateRepository.existsByReferralCode(code)) {
            suffix = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
            code = prefix + suffix;
        }
        return code;
    }

    public String buildReferralLink(String code) {
        return frontendUrl + "/checkout?ref=" + code;
    }
}
