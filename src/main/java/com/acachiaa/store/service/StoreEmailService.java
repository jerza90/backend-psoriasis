package com.acachiaa.store.service;

import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class StoreEmailService {

    private static final Logger log = LoggerFactory.getLogger(StoreEmailService.class);

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Value("${acachiaa.support.email}")
    private String fromEmail;

    @Value("${acachiaa.brand.name}")
    private String brandName;

    public StoreEmailService(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    public void sendDownloadEmail(String toEmail, String customerName, String downloadUrl) {
        try {
            Context ctx = new Context();
            ctx.setVariable("customerName", customerName);
            ctx.setVariable("downloadUrl", downloadUrl);

            String html = templateEngine.process("email/download-email", ctx);

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(new jakarta.mail.internet.InternetAddress(fromEmail, brandName));
            helper.setTo(toEmail);
            helper.setSubject("\uD83C\uDF3F E-Book Kau Sudah Sedia! | Bebas Psoriasis by Acachiaa");
            helper.setText(html, true);

            mailSender.send(message);
            log.info("Download email sent to {}", toEmail);
        } catch (Exception e) {
            log.error("Failed to send download email to {}: {}", toEmail, e.getMessage(), e);
        }
    }
}
