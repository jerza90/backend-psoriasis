package com.psoriasis.repository;

import com.psoriasis.model.ReferralConversion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReferralConversionRepository extends JpaRepository<ReferralConversion, Long> {
    List<ReferralConversion> findByAffiliateId(Long affiliateId);
    Optional<ReferralConversion> findByPaymentOrderId(Long paymentOrderId);
    long countByAffiliateIdAndStatus(Long affiliateId, String status);
}
