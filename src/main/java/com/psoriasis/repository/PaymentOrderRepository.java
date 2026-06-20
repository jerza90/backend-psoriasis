package com.psoriasis.repository;

import com.psoriasis.model.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {
    Optional<PaymentOrder> findByBillCode(String billCode);
    Optional<PaymentOrder> findByStripeSessionId(String stripeSessionId);
    Optional<PaymentOrder> findByOrderRef(String orderRef);
    Optional<PaymentOrder> findByStripePaymentIntentId(String stripePaymentIntentId);
    Optional<PaymentOrder> findByDownloadToken(String downloadToken);
}
