package com.acachiaa.store.service;

import com.acachiaa.store.model.Order;
import com.acachiaa.store.model.Product;
import com.acachiaa.store.repository.OrderRepository;
import com.acachiaa.store.repository.ProductRepository;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class StripeWebhookService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final DownloadService downloadService;
    private final StoreEmailService storeEmailService;

    @Value("${app.ebook.download-base-url}")
    private String downloadBaseUrl;

    public StripeWebhookService(OrderRepository orderRepository,
                                ProductRepository productRepository,
                                DownloadService downloadService,
                                StoreEmailService storeEmailService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.downloadService = downloadService;
        this.storeEmailService = storeEmailService;
    }

    @Transactional
    public void handlePaymentSuccess(Session session) {
        Order order = orderRepository.findByStripeSessionId(session.getId()).orElse(null);
        if (order == null) {
            order = createOrderFromSession(session);
        }
        if (!"PAID".equals(order.getStatus())) {
            order.setStatus("PAID");
            order.setStripePaymentIntentId(session.getPaymentIntent());
            orderRepository.save(order);

            String token = downloadService.generateDownloadToken(order);

            String customerEmail = order.getCustomerEmail();
            String customerName = extractNameFromEmail(customerEmail);
            String downloadLink = downloadBaseUrl + "?token=" + token;

            storeEmailService.sendDownloadEmail(customerEmail, customerName, downloadLink);
        }
    }

    private String extractNameFromEmail(String email) {
        String name = email.contains("@") ? email.substring(0, email.indexOf('@')) : email;
        if (!name.isEmpty()) {
            name = name.substring(0, 1).toUpperCase() + name.substring(1);
        }
        return name;
    }

    private Order createOrderFromSession(Session session) {
        String slug = session.getMetadata().get("product_id");
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new RuntimeException("Product not found: " + slug));

        BigDecimal amount = BigDecimal.valueOf(session.getAmountTotal(), 2);

        Order order = Order.builder()
                .stripeSessionId(session.getId())
                .customerEmail(session.getCustomerEmail())
                .product(product)
                .amountPaid(amount)
                .currency(session.getCurrency().toUpperCase())
                .status("PENDING")
                .build();
        return orderRepository.save(order);
    }
}
