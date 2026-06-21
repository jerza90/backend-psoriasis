package com.psoriasis.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.BalanceTransaction;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.net.RequestOptions;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionRetrieveParams;
import com.psoriasis.dto.response.PaymentStatusResponseDTO;
import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Map;
import java.util.UUID;

@Service
public class CheckoutService {

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @Value("${stripe.price-bm}")
    private String priceBm;

    @Value("${stripe.price-en}")
    private String priceEn;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${app.ebook.download-base-url}")
    private String downloadBaseUrl;

    private final PaymentOrderRepository orderRepository;
    private final EbookDeliveryService deliveryService;
    private final AffiliateService affiliateService;

    public CheckoutService(PaymentOrderRepository orderRepository, EbookDeliveryService deliveryService, AffiliateService affiliateService) {
        this.orderRepository = orderRepository;
        this.deliveryService = deliveryService;
        this.affiliateService = affiliateService;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public String createCheckoutSession(String fullName, String email, String product, String referralCode) throws StripeException {
        String priceId = "bm".equals(product) ? priceBm : priceEn;
        String orderRef = "EN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String successUrl = frontendUrl + "/thank-you?session_id={CHECKOUT_SESSION_ID}";
        String cancelUrl = frontendUrl + "/checkout";

        Map<String, String> metadata = new java.util.HashMap<>(Map.of(
                "fullName", fullName,
                "email", email,
                "product", product,
                "orderRef", orderRef
        ));
        if (referralCode != null && !referralCode.isBlank()) {
            metadata.put("referralCode", referralCode);
        }

        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl)
                .setCustomerEmail(email)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPrice(priceId)
                                .setQuantity(1L)
                                .build()
                )
                .putAllMetadata(metadata)
                .build();

        Session session = Session.create(params);

        PaymentOrder order = new PaymentOrder();
        order.setOrderRef(orderRef);
        order.setPaymentMethod("STRIPE");
        order.setCustomerName(fullName);
        order.setCustomerEmail(email);
        order.setProductName("en".equals(product) ? "English Guide" : "Panduan Sokongan Psoriasis");
        order.setAmount(new BigDecimal(session.getAmountTotal().doubleValue() / 100, java.math.MathContext.DECIMAL64));
        order.setCurrency("USD");
        order.setPaymentStatus("Unpaid");
        order.setStatus("Active");
        order.setStripeSessionId(session.getId());
        order.setCreatedDate(LocalDateTime.now());
        if (referralCode != null && !referralCode.isBlank()) {
            order.setReferralCode(referralCode);
        }
        orderRepository.save(order);

        return session.getUrl();
    }

    public void handlePaymentSuccess(String sessionId) {
        PaymentOrder order = orderRepository.findByStripeSessionId(sessionId).orElse(null);
        if (order == null || !"Unpaid".equals(order.getPaymentStatus())) return;

        try {
            SessionRetrieveParams params = SessionRetrieveParams.builder()
                    .addExpand("payment_intent")
                    .addExpand("payment_intent.latest_charge")
                    .addExpand("payment_intent.latest_charge.balance_transaction")
                    .build();

            Session session = Session.retrieve(sessionId, params, (RequestOptions) null);
            PaymentIntent pi = session.getPaymentIntentObject();

            order.setStripePaymentIntentId(pi.getId());
            order.setPaymentChannel("Credit Card");
            order.setPaymentStatus("Paid");
            order.setStatus("Completed");

            if (pi.getLatestChargeObject() != null) {
                BalanceTransaction bt = pi.getLatestChargeObject().getBalanceTransactionObject();
                if (bt != null) {
                    long feeCents = bt.getFee();
                    long netCents = bt.getNet();
                    order.setTransactionCharge(new BigDecimal(feeCents).divide(BigDecimal.valueOf(100), 2, java.math.RoundingMode.HALF_UP));
                    order.setNettReceived(new BigDecimal(netCents).divide(BigDecimal.valueOf(100), 2, java.math.RoundingMode.HALF_UP));
                }
            }

            if (pi.getCreated() != null) {
                order.setPaymentDate(LocalDateTime.ofInstant(
                        Instant.ofEpochSecond(pi.getCreated()), ZoneId.systemDefault()));
            }

            orderRepository.save(order);
            if (order.getReferralCode() != null && order.getAffiliateId() == null) {
                affiliateService.trackConversion(order.getReferralCode(), order);
            }
            deliveryService.generateAndSend(order);
        } catch (StripeException e) {
            order.setPaymentStatus("Paid");
            order.setStatus("Completed");
            orderRepository.save(order);
            if (order.getReferralCode() != null && order.getAffiliateId() == null) {
                affiliateService.trackConversion(order.getReferralCode(), order);
            }
            deliveryService.generateAndSend(order);
        }
    }

    public PaymentStatusResponseDTO getSessionStatus(String sessionId) {
        PaymentOrder order = orderRepository.findByStripeSessionId(sessionId).orElse(null);
        if (order == null) {
            return new PaymentStatusResponseDTO("unknown", false);
        }
        return new PaymentStatusResponseDTO(
                "Paid".equals(order.getPaymentStatus()) ? "paid" : "unpaid",
                order.getDownloadToken() != null
        );
    }

    public String requestDownload(String sessionId) {
        PaymentOrder order = orderRepository.findByStripeSessionId(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        if (!"Paid".equals(order.getPaymentStatus())) {
            throw new RuntimeException("Payment not completed");
        }
        if (order.getDownloadToken() == null) {
            deliveryService.generateAndSend(order);
        }
        return downloadBaseUrl + "/" + order.getDownloadToken();
    }
}
