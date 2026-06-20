package com.psoriasis.controller;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Charge;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import com.psoriasis.service.CheckoutService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@RestController
@RequestMapping("/api/webhooks")
public class WebhookController {

    private final CheckoutService checkoutService;
    private final PaymentOrderRepository orderRepository;

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    public WebhookController(CheckoutService checkoutService, PaymentOrderRepository orderRepository) {
        this.checkoutService = checkoutService;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        try {
            Event event = Webhook.constructEvent(payload, sigHeader, webhookSecret);

            switch (event.getType()) {
                case "checkout.session.completed" -> {
                    Session session = (Session) event.getDataObjectDeserializer()
                            .getObject().orElse(null);
                    if (session != null) {
                        checkoutService.handlePaymentSuccess(session.getId());
                    }
                }
                case "charge.refunded" -> {
                    Charge charge = (Charge) event.getDataObjectDeserializer()
                            .getObject().orElse(null);
                    if (charge != null && charge.getPaymentIntent() != null) {
                        String paymentIntentId = charge.getPaymentIntent();
                        PaymentOrder order = orderRepository.findByStripePaymentIntentId(paymentIntentId).orElse(null);
                        if (order != null) {
                            order.setPaymentStatus("Refunded");
                            order.setStatus("Refunded");
                            if (charge.getCreated() != null) {
                                order.setRefundedDate(LocalDateTime.ofInstant(
                                        Instant.ofEpochSecond(charge.getCreated()), ZoneId.systemDefault()));
                            }
                            orderRepository.save(order);
                        }
                    }
                }
                case "payment_intent.payment_failed" -> {
                    PaymentIntent pi = (PaymentIntent) event.getDataObjectDeserializer()
                            .getObject().orElse(null);
                    if (pi != null && pi.getLastPaymentError() != null) {
                        PaymentOrder order = orderRepository.findByStripePaymentIntentId(pi.getId()).orElse(null);
                        if (order != null) {
                            order.setPaymentStatus("Failed");
                            order.setStatus("Failed");
                            order.setDeclineReason(pi.getLastPaymentError().getMessage());
                            orderRepository.save(order);
                        }
                    }
                }
            }

            return ResponseEntity.ok("received");
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        }
    }
}
