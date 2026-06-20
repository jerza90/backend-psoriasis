package com.psoriasis.service;

import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class EbookDeliveryService {

    private final PaymentOrderRepository orderRepository;
    private final EmailService emailService;

    @Value("${app.ebook.local-path}")
    private String localPath;

    @Value("${app.ebook.filename}")
    private String ebookFilename;

    @Value("${app.ebook.token-expire-hours}")
    private int tokenExpireHours;

    @Value("${frontend.url}")
    private String frontendUrl;

    public EbookDeliveryService(PaymentOrderRepository orderRepository, EmailService emailService) {
        this.orderRepository = orderRepository;
        this.emailService = emailService;
    }

    public void generateAndSend(PaymentOrder order) {
        String token = UUID.randomUUID().toString();
        order.setDownloadToken(token);
        order.setDownloadCount(0);
        order.setMaxDownloads(3);
        order.setTokenExpiresAt(LocalDateTime.now().plusHours(tokenExpireHours));
        orderRepository.save(order);

        String downloadLink = frontendUrl + "/api/ebook/download/" + token;
        String productName = order.getProductName();

        try {
            emailService.sendReceiptEmail(order.getCustomerEmail(), productName, downloadLink);
        } catch (Exception e) {
            System.err.println("Failed to send email to " + order.getCustomerEmail() + ": " + e.getMessage());
        }
    }

    public void streamPdf(String token, HttpServletResponse response) {
        PaymentOrder order = orderRepository.findByDownloadToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid download token"));

        if (order.getTokenExpiresAt() != null && order.getTokenExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Download token has expired");
        }

        if (order.getDownloadCount() >= order.getMaxDownloads()) {
            throw new RuntimeException("Download limit reached");
        }

        order.setDownloadCount(order.getDownloadCount() + 1);
        orderRepository.save(order);

        Path filePath = Paths.get(localPath, ebookFilename);

        if (!Files.exists(filePath)) {
            throw new RuntimeException("Ebook file not found");
        }

        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + ebookFilename + "\"");

        try (InputStream is = Files.newInputStream(filePath); var os = response.getOutputStream()) {
            is.transferTo(os);
            os.flush();
        } catch (IOException e) {
            throw new RuntimeException("Failed to stream PDF", e);
        }
    }
}
