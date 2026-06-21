package com.psoriasis.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.email.from-email}")
    private String fromEmail;

    @Value("${app.email.from-name:Bebas Psoriasis}")
    private String fromName;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String to, String otpCode, String purpose) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Your OTP Code - " + purpose);
        message.setText("Your OTP code is: " + otpCode + "\n\n"
                + "This code will expire in 10 minutes.\n"
                + "If you did not request this, please ignore this email.");
        mailSender.send(message);
    }

    public void sendReceiptEmail(String to, String productName, String downloadLink) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Your Ebook is Ready — " + productName);

            String html = """
                    <!DOCTYPE html>
                    <html>
                    <body style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #2d6a4f;">Thank You for Your Purchase!</h2>
                        <p>Your ebook <strong>%s</strong> is ready to download.</p>
                        <p style="margin: 24px 0;">
                            <a href="%s"
                               style="background: #2d6a4f; color: white; padding: 12px 28px;
                                      border-radius: 8px; text-decoration: none; font-weight: bold;">
                                Download Your Ebook
                            </a>
                        </p>
                        <p style="color: #666; font-size: 14px;">
                            This link expires in 24 hours and can be used up to 3 times.
                        </p>

                        <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
                            <h3 style="color: #2d6a4f; font-size: 15px; margin: 0 0 8px;">📦 About Your Download</h3>
                            <p style="color: #555; font-size: 13px; margin: 0 0 8px;">
                                The file is a <strong>ZIP folder</strong> containing both the BM and English PDF guides.
                            </p>
                            <p style="color: #555; font-size: 13px; margin: 0;">
                                <strong>After downloading:</strong>
                            </p>
                            <ul style="color: #555; font-size: 13px; margin: 4px 0 0; padding-left: 20px;">
                                <li><strong>On phone (Android/iPhone):</strong> Open your <strong>Downloads</strong> folder or <strong>Files</strong> app. Tap the ZIP file to extract it, then tap any PDF to open.</li>
                                <li><strong>On computer:</strong> Find the ZIP in your <strong>Downloads</strong> folder. Double-click to unzip, then open the PDFs.</li>
                            </ul>
                            <p style="color: #555; font-size: 13px; margin: 8px 0 0;">
                                💡 <strong>Need a PDF reader?</strong> Use <strong>Adobe Acrobat Reader</strong>, <strong>Google PDF Viewer</strong>, or your phone's built-in PDF viewer.
                            </p>
                        </div>

                        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
                        <p style="color: #999; font-size: 12px;">
                            Bebas Psoriasis by Acachiaa &middot; Jika ada masalah, balas email ini.
                        </p>
                    </body>
                    </html>
                    """.formatted(productName, downloadLink);

            helper.setText(html, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send receipt email", e);
        }
    }
}
