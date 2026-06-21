package com.psoriasis.service;

import com.psoriasis.model.Affiliate;
import com.psoriasis.model.PaymentOrder;
import com.psoriasis.model.ReferralConversion;
import com.psoriasis.repository.AffiliateRepository;
import com.psoriasis.repository.PaymentOrderRepository;
import com.psoriasis.repository.ReferralConversionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public AffiliateService(AffiliateRepository affiliateRepository,
                            ReferralConversionRepository conversionRepository,
                            PaymentOrderRepository paymentOrderRepository) {
        this.affiliateRepository = affiliateRepository;
        this.conversionRepository = conversionRepository;
        this.paymentOrderRepository = paymentOrderRepository;
    }

    public Affiliate register(String name, String email, String bio, String socialLinks, String paymentInfo) {
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

        return affiliateRepository.save(affiliate);
    }

    public Optional<Affiliate> findByReferralCode(String code) {
        return affiliateRepository.findByReferralCode(code);
    }

    public Optional<Affiliate> findById(Long id) {
        return affiliateRepository.findById(id);
    }

    public List<Affiliate> findAllActive() {
        return affiliateRepository.findAll().stream()
                .filter(a -> "active".equals(a.getStatus()))
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

    public List<ReferralConversion> getConversions(Long affiliateId) {
        return conversionRepository.findByAffiliateId(affiliateId);
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
}
