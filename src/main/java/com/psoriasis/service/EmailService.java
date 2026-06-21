package com.psoriasis.service;

import com.psoriasis.model.PaymentOrder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.Locale;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.email.from-email}")
    private String fromEmail;

    @Value("${app.email.from-name:Bebas Psoriasis}")
    private String fromName;

    @Value("${acachiaa.support.email:}")
    private String adminEmail;

    @Value("${app.telegram.support-url:https://t.me/+wurfqXKLzOczODg1}")
    private String telegramSupportUrl;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOtpEmail(String to, String otpCode, String purpose) {
        String subject = "Your OTP Code - " + purpose;
        String plainText = "Your OTP code is: " + otpCode + "\n\n"
                + "This code will expire in 10 minutes.\n"
                + "If you did not request this, please ignore this email.";
        String html = """
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; background: #f7faf8; padding: 24px;">
                    <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; padding: 24px; border: 1px solid #e5efe8;">
                        <p style="margin: 0 0 8px; color: #2d6a4f; font-size: 12px; font-weight: bold; letter-spacing: 0.12em; text-transform: uppercase;">%s</p>
                        <h2 style="margin: 0 0 16px; color: #173326;">Your OTP Code</h2>
                        <p style="margin: 0 0 20px; color: #456; line-height: 1.6;">Use this code to continue your request. It expires in 10 minutes.</p>
                        <div style="font-size: 28px; letter-spacing: 0.35em; font-weight: 800; text-align: center; padding: 18px 16px; border-radius: 12px; background: #edf7f2; color: #173326; margin-bottom: 20px;">%s</div>
                        <p style="margin: 0; color: #6b7280; font-size: 13px;">If you did not request this, you can safely ignore this email.</p>
                    </div>
                </body>
                </html>
                """.formatted(purpose, otpCode);
        sendHtmlEmail(to, subject, plainText, html);
    }

    public void sendReceiptEmail(String to, String productName, String downloadLink) {
        String subject = "Terima kasih, eBook anda sudah sedia";
        String plainText = "Terima kasih. E-Book anda sudah sedia untuk dimuat turun: " + downloadLink;
        String html = """
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; background: #f7faf8; padding: 24px; color: #1f2937;">
                    <div style="max-width: 640px; margin: 0 auto; background: white; border-radius: 18px; padding: 28px; border: 1px solid #e5efe8; box-shadow: 0 10px 30px rgba(17, 34, 17, 0.06);">
                    <p style="margin: 0 0 12px; color: #2d6a4f; font-size: 12px; font-weight: bold; letter-spacing: 0.12em; text-transform: uppercase;">%s</p>
                    <h2 style="margin: 0 0 16px; color: #173326; font-size: 26px; line-height: 1.2;">Terima kasih</h2>
                    <p style="margin: 0 0 16px; line-height: 1.7;">😃 Ini adalah E-Book Bebas Psoriasis yang ditulis Kak Achaa - seorang pejuang psoriasis yang berkongsi pengalaman pemulihan.</p>
                    <p style="margin: 0 0 16px; line-height: 1.7;">📌 <strong>%s</strong></p>
                    <p style="margin: 0 0 16px; line-height: 1.7;">📌 Dengan membeli E-Book ini, resipi pantang psoriasis & eczema disediakan (sila rujuk selepas muat turun).</p>
                    <p style="margin: 0 0 20px; line-height: 1.7;">Jangan lupa join Telegram group & komuniti bebas psoriasis:</p>
                    <p style="margin: 0 0 8px; line-height: 1.7;">Invitation link Telegram Suport Group:</p>
                    <p style="margin: 0 0 20px; word-break: break-word;"><a href="%s" style="color: #2d6a4f; font-weight: bold;">%s</a></p>
                    <p style="margin: 0 0 16px; line-height: 1.7;">Ada ramai kawan-kawan pengidap psoriasis dan ekzema. Di dalam Telegram group ini, kami berkongsi info, tips, pengalaman dan soal jawab yang membantu pengidap psoriasis & eczema.</p>
                    <p style="margin: 0 0 20px; line-height: 1.7;">"Psoriasis bukan penyakit kulit"</p>
                    <p style="margin: 24px 0;">
                        <a href="%s"
                           style="display:inline-block;background: #2d6a4f; color: white; padding: 12px 28px;
                                  border-radius: 8px; text-decoration: none; font-weight: bold;">
                            Muat Turun E-Book
                        </a>
                    </p>
                    <p style="color: #666; font-size: 14px; line-height: 1.6;">
                        Pautan ini sah untuk tempoh terhad dan boleh digunakan beberapa kali mengikut tetapan sistem.
                    </p>

                    <div style="background: #f9f9f9; border-radius: 8px; padding: 16px; margin: 20px 0;">
                        <h3 style="color: #2d6a4f; font-size: 15px; margin: 0 0 8px;">📦 Tentang Muat Turun</h3>
                        <p style="color: #555; font-size: 13px; margin: 0 0 8px; line-height: 1.6;">
                            Fail muat turun anda mengandungi bahan digital untuk rujukan anda.
                        </p>
                        <p style="color: #555; font-size: 13px; margin: 0;">
                            <strong>Selepas muat turun:</strong>
                        </p>
                        <ul style="color: #555; font-size: 13px; margin: 4px 0 0; padding-left: 20px;">
                            <li><strong>Di telefon:</strong> Buka folder <strong>Downloads</strong> atau <strong>Files</strong>, kemudian buka fail yang dimuat turun.</li>
                            <li><strong>Di komputer:</strong> Cari fail dalam <strong>Downloads</strong>, kemudian buka atau ekstrak jika perlu.</li>
                        </ul>
                        <p style="color: #555; font-size: 13px; margin: 8px 0 0; line-height: 1.6;">
                            💡 Jika perlukan bantuan, anda boleh hubungi Telegram support group di atas.
                        </p>
                    </div>

                    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
                    <p style="color: #999; font-size: 12px;">
                        Bebas Psoriasis by Acachiaa &middot; Jika ada masalah, balas email ini.
                    </p>
                    </div>
                </body>
                </html>
                """.formatted(
                escapeHtml(fromName),
                escapeHtml(productName),
                escapeAttribute(telegramSupportUrl),
                escapeHtml(telegramSupportUrl),
                escapeAttribute(downloadLink)
        );

        sendHtmlEmail(to, subject, plainText, html);
    }

    public void sendOrderNotificationEmail(PaymentOrder order, String downloadLink) {
        String subject = "Salinan Tempahan - " + safe(order.getOrderRef());
        String currencySymbol = "USD".equalsIgnoreCase(order.getCurrency()) ? "$" : "RM";
        String amount = formatMoney(order.getAmount(), order.getCurrency());
        String commission = order.getCommissionAmount() != null
                ? formatMoney(order.getCommissionAmount(), order.getCurrency())
                : "-";
        String targetEmail = (adminEmail == null || adminEmail.isBlank()) ? fromEmail : adminEmail;

        String html = """
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; background: #f7faf8; padding: 24px; color: #1f2937;">
                    <div style="max-width: 720px; margin: 0 auto; background: white; border-radius: 18px; padding: 28px; border: 1px solid #e5efe8; box-shadow: 0 10px 30px rgba(17, 34, 17, 0.06);">
                        <p style="margin: 0 0 8px; color: #2d6a4f; font-size: 12px; font-weight: bold; letter-spacing: 0.12em; text-transform: uppercase;">Salinan Tempahan</p>
                        <h2 style="margin: 0 0 16px; color: #173326;">Selamat sejahtera %s.</h2>
                        <p style="line-height: 1.7; margin: 0 0 16px;">Anda telah menerima tempahan untuk %s, bernombor invois %s.</p>
                        <p style="line-height: 1.7; margin: 0 0 18px;">Berikut adalah butiran-butiran maklumat berkaitan tempahan yang telah dikirimkan oleh pelanggan:</p>

                        <div style="background: #f9f9f9; border-radius: 12px; padding: 18px; margin: 20px 0;">
                            <h3 style="margin: 0 0 12px; color: #2d6a4f; font-size: 16px;">Butiran Pelanggan</h3>
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <tr><td style="padding: 6px 0; width: 160px; color: #6b7280;">Nama</td><td style="padding: 6px 0;">%s</td></tr>
                                <tr><td style="padding: 6px 0; color: #6b7280;">Emel</td><td style="padding: 6px 0;">%s</td></tr>
                                <tr><td style="padding: 6px 0; color: #6b7280;">No. Telefon</td><td style="padding: 6px 0;">%s</td></tr>
                                <tr><td style="padding: 6px 0; color: #6b7280;">Alamat</td><td style="padding: 6px 0;">Belum dikumpulkan dalam checkout semasa</td></tr>
                            </table>
                        </div>

                        <div style="background: #f9f9f9; border-radius: 12px; padding: 18px; margin: 20px 0;">
                            <h3 style="margin: 0 0 12px; color: #2d6a4f; font-size: 16px;">Butiran Pembelian</h3>
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <tr>
                                    <th align="left" style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">Produk</th>
                                    <th align="right" style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">Harga (%s)</th>
                                    <th align="right" style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">Kuantiti</th>
                                    <th align="right" style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">Sub Jumlah (%s)</th>
                                </tr>
                                <tr>
                                    <td style="padding: 10px 0;">%s</td>
                                    <td align="right" style="padding: 10px 0;">%s</td>
                                    <td align="right" style="padding: 10px 0;">1</td>
                                    <td align="right" style="padding: 10px 0;">%s</td>
                                </tr>
                            </table>
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 8px;">
                                <tr>
                                    <td style="padding: 6px 0; color: #6b7280;">Jumlah</td>
                                    <td align="right" style="padding: 6px 0;">1</td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; color: #6b7280;">Diskaun</td>
                                    <td align="right" style="padding: 6px 0;">%s</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold;">JUMLAH KESELURUHAN (%s)</td>
                                    <td align="right" style="padding: 8px 0; font-weight: bold;">%s</td>
                                </tr>
                            </table>
                        </div>

                        <div style="background: #f9f9f9; border-radius: 12px; padding: 18px; margin: 20px 0;">
                            <h3 style="margin: 0 0 12px; color: #2d6a4f; font-size: 16px;">Butiran Pembayaran</h3>
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                                <tr><td style="padding: 6px 0; width: 160px; color: #6b7280;">Jumlah</td><td style="padding: 6px 0;">%s</td></tr>
                                <tr><td style="padding: 6px 0; color: #6b7280;">Kaedah</td><td style="padding: 6px 0;">%s</td></tr>
                                <tr><td style="padding: 6px 0; color: #6b7280;">Affiliate</td><td style="padding: 6px 0;">%s</td></tr>
                                <tr><td style="padding: 6px 0; color: #6b7280;">Komisen</td><td style="padding: 6px 0;">%s</td></tr>
                            </table>
                        </div>

                        <div style="background: #f7fcf9; border: 1px solid #d9efe2; border-radius: 12px; padding: 18px; margin: 20px 0;">
                            <h3 style="margin: 0 0 12px; color: #2d6a4f; font-size: 16px;">Cadangan senarai tugas untuk anda lakukan:</h3>
                            <ul style="margin: 0; padding-left: 20px; line-height: 1.8; color: #374151;">
                                <li>Menyemak transaksi ke dalam akaun anda.</li>
                                <li>Menyemak data affiliate yang terlibat.</li>
                                <li>Sahkan rekod jualan untuk pembeli.</li>
                                <li>Kirimkan produk kepada pembeli.</li>
                                <li>Sila simpan emel ini untuk rujukan anda di masa akan datang.</li>
                            </ul>
                        </div>

                        <p style="color: #999; font-size: 12px; margin-top: 20px;">Sekian, Sistem Bebas Psoriasis by Acachiaa</p>
                    </div>
                </body>
                </html>
                """.formatted(
                escapeHtml(fromName),
                escapeHtml(order.getProductName()),
                escapeHtml(order.getOrderRef()),
                escapeHtml(order.getCustomerName()),
                escapeHtml(order.getCustomerEmail()),
                escapeHtml(order.getCustomerPhone()),
                escapeHtml(currencySymbol),
                escapeHtml(currencySymbol),
                escapeHtml(order.getProductName()),
                escapeHtml(amount),
                escapeHtml(amount),
                escapeHtml(formatMoney(BigDecimal.ZERO, order.getCurrency())),
                escapeHtml(currencySymbol),
                escapeHtml(amount),
                escapeHtml(amount),
                escapeHtml(order.getPaymentMethod()),
                escapeHtml(order.getReferralCode() == null || order.getReferralCode().isBlank() ? "-" : order.getReferralCode()),
                escapeHtml(commission)
        );

        String plainText = "Salinan tempahan " + safe(order.getOrderRef()) + " untuk " + safe(order.getCustomerName()) +
                ". Jumlah: " + amount + ". Kaedah: " + safe(order.getPaymentMethod()) + ".";
        sendHtmlEmail(targetEmail, subject, plainText, html);
    }

    public void sendMockPurchaseBundle(PaymentOrder order, String downloadLink) {
        sendOrderNotificationEmail(order, downloadLink);
        sendReceiptEmail(order.getCustomerEmail(), order.getProductName(), downloadLink);
    }

    public void sendTestEmail(String to, String subject, String message, String ctaLabel, String ctaUrl) {
        String safeSubject = subject == null || subject.isBlank() ? "Psoriasis test email" : subject;
        String safeMessage = message == null || message.isBlank()
                ? "This is a test email from the Psoriasis backend."
                : message;
        String plainText = safeMessage + (ctaUrl != null && !ctaUrl.isBlank() ? "\n\n" + ctaUrl : "");
        String html = """
                <!DOCTYPE html>
                <html>
                <body style="font-family: Arial, sans-serif; background: #f7faf8; padding: 24px;">
                    <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 16px; padding: 24px; border: 1px solid #e5efe8;">
                        <p style="margin: 0 0 8px; color: #2d6a4f; font-size: 12px; font-weight: bold; letter-spacing: 0.12em; text-transform: uppercase;">Psoriasis test email</p>
                        <h2 style="margin: 0 0 16px; color: #173326;">%s</h2>
                        <p style="margin: 0 0 20px; color: #456; line-height: 1.6;">%s</p>
                        %s
                    </div>
                </body>
                </html>
                """.formatted(
                escapeHtml(safeSubject),
                escapeHtml(safeMessage),
                ctaUrl != null && !ctaUrl.isBlank()
                        ? "<p style=\"margin: 24px 0;\"><a href=\"" + escapeAttribute(ctaUrl) + "\" style=\"display:inline-block;background:#2d6a4f;color:white;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:bold;\">" + escapeHtml(ctaLabel == null || ctaLabel.isBlank() ? "Open link" : ctaLabel) + "</a></p>"
                        : ""
        );
        sendHtmlEmail(to, safeSubject, plainText, html);
    }

    public void sendTestReceiptEmail(String to) {
        sendReceiptEmail(to, "Psoriasis Support Ebook", "https://example.com/test-download");
    }

    private void sendHtmlEmail(String to, String subject, String plainText, String html) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(plainText, html);
            helper.setReplyTo(fromEmail);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private String formatMoney(BigDecimal amount, String currency) {
        if (amount == null) {
            amount = BigDecimal.ZERO;
        }
        NumberFormat format = NumberFormat.getNumberInstance(Locale.US);
        format.setMinimumFractionDigits(2);
        format.setMaximumFractionDigits(2);
        String symbol = "USD".equalsIgnoreCase(currency) ? "$" : "RM";
        return symbol + " " + format.format(amount);
    }

    private String safe(String input) {
        return input == null || input.isBlank() ? "-" : input;
    }

    private String escapeHtml(String input) {
        return input == null ? "" : input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#39;");
    }

    private String escapeAttribute(String input) {
        return escapeHtml(input);
    }
}
