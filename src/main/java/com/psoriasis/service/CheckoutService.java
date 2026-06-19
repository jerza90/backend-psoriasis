package com.psoriasis.service;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.psoriasis.dto.CheckoutRequest;
import com.psoriasis.dto.CheckoutResponse;
import com.psoriasis.model.Order;
import com.psoriasis.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CheckoutService {

    private final OrderRepository orderRepository;

    @Value("${app.stripe.surcharge-rate}")
    private double surchargeRate;

    @Value("${app.stripe.surcharge-fixed}")
    private double surchargeFixed;

    @Value("${app.stripe.currency}")
    private String currency;

    @Value("${app.stripe.success-url}")
    private String successUrl;

    @Value("${app.stripe.cancel-url}")
    private String cancelUrl;

    public CheckoutService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public CheckoutResponse createCheckoutSession(CheckoutRequest req) throws StripeException {
        BigDecimal baseAmount = new BigDecimal("27.00");
        BigDecimal fixed = BigDecimal.valueOf(surchargeFixed);
        BigDecimal rate = BigDecimal.valueOf(surchargeRate);

        BigDecimal surcharge = baseAmount.multiply(rate).add(fixed)
                .setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = baseAmount.add(surcharge).setScale(2, RoundingMode.HALF_UP);
        long totalCents = total.multiply(new BigDecimal("100")).longValue();

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl)
                .putAllMetadata(java.util.Map.of(
                        "product_type", req.getProductType(),
                        "product_id", req.getProductId(),
                        "full_name", req.getFullName() != null ? req.getFullName() : ""
                ))
                .setCustomerEmail(req.getEmail())
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency(currency)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Free From Psoriasis Since 2021")
                                        .setDescription("BM guide — healing crisis & food restrictions")
                                        .build())
                                .setUnitAmount(totalCents)
                                .build())
                        .setQuantity(1L)
                        .build())
                .build();

        Session session = Session.create(params);

        Order order = new Order();
        order.setEmail(req.getEmail());
        order.setFullName(req.getFullName());
        order.setProductType(req.getProductType());
        order.setProductId(req.getProductId());
        order.setAmount(baseAmount);
        order.setSurcharge(surcharge);
        order.setTotal(total);
        order.setCurrency(currency.toUpperCase());
        order.setStatus("pending");
        order.setStripeSessionId(session.getId());
        orderRepository.save(order);

        return new CheckoutResponse(session.getId(), session.getUrl(), baseAmount, surcharge, total, currency.toUpperCase());
    }

    public Session retrieveSession(String sessionId) throws StripeException {
        return Session.retrieve(sessionId);
    }

    public void handlePaymentSuccess(String sessionId) {
        Order order = orderRepository.findByStripeSessionId(sessionId).orElse(null);
        if (order != null && "pending".equals(order.getStatus())) {
            order.setStatus("completed");
            orderRepository.save(order);
        }
    }
}
