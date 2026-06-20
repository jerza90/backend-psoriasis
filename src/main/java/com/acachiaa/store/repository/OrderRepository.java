package com.acachiaa.store.repository;

import com.acachiaa.store.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OrderRepository extends JpaRepository<Order, UUID> {
    Optional<Order> findByStripeSessionId(String stripeSessionId);
    Optional<Order> findByStripePaymentIntentId(String stripePaymentIntentId);
}
