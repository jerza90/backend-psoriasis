package com.psoriasis.repository;

import com.psoriasis.model.Affiliate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AffiliateRepository extends JpaRepository<Affiliate, Long> {
    Optional<Affiliate> findByReferralCode(String referralCode);
    Optional<Affiliate> findByEmail(String email);
    boolean existsByReferralCode(String referralCode);
    boolean existsByEmail(String email);
}
