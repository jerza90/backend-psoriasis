package com.psoriasis.service;

import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class EbookDeliveryService {
    private static final Logger log = LoggerFactory.getLogger(EbookDeliveryService.class);

    private final PaymentOrderRepository orderRepository;
    private final EmailService emailService;

    @Value("${app.ebook.local-path}")
    private String localPath;

    @Value("${app.ebook.filename}")
    private String ebookFilename;

    @Value("${app.ebook.token-expire-hours}")
    private int tokenExpireHours;

    @Value("${app.ebook.download-base-url}")
    private String downloadBaseUrl;

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

        String downloadLink = downloadBaseUrl + "/" + token;

        try {
            emailService.sendReceiptEmail(order.getCustomerEmail(), order.getProductName(), downloadLink);
        } catch (Exception e) {
            log.error("Failed to send customer purchase email for order {} to {}", order.getOrderRef(), order.getCustomerEmail(), e);
        }

        try {
            emailService.sendOrderNotificationEmail(order, downloadLink);
        } catch (Exception e) {
            log.error("Failed to send admin order notification for order {}", order.getOrderRef(), e);
        }
    }

    public boolean needsFreshDownloadToken(PaymentOrder order) {
        return order.getDownloadToken() == null
                || order.getTokenExpiresAt() == null
                || order.getTokenExpiresAt().isBefore(LocalDateTime.now());
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

        Path dir = Paths.get(localPath);
        if (!Files.exists(dir)) {
            throw new RuntimeException("Ebook directory not found");
        }

        List<Path> pdfs;
        try (Stream<Path> walk = Files.walk(dir, 1)) {
            pdfs = walk.filter(p -> p.toString().endsWith(".pdf"))
                       .sorted()
                       .toList();
        } catch (IOException e) {
            throw new RuntimeException("Failed to list ebook files", e);
        }

        if (pdfs.isEmpty()) {
            throw new RuntimeException("No ebook files found");
        }

        String zipName = ebookFilename.replace(".pdf", ".zip");
        response.setContentType("application/zip");
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + zipName + "\"");

        try (ZipOutputStream zos = new ZipOutputStream(response.getOutputStream())) {
            for (Path pdf : pdfs) {
                ZipEntry entry = new ZipEntry(pdf.getFileName().toString());
                zos.putNextEntry(entry);
                try (InputStream is = Files.newInputStream(pdf)) {
                    is.transferTo(zos);
                }
                zos.closeEntry();
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to stream ZIP", e);
        }
    }
}
