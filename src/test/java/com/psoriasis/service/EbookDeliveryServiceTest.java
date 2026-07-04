package com.psoriasis.service;

import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class EbookDeliveryServiceTest {

    @Test
    void needsFreshDownloadTokenReturnsTrueForExpiredToken() {
        EbookDeliveryService service = service(mock(PaymentOrderRepository.class), mock(EmailService.class));
        PaymentOrder order = paidOrder();
        order.setDownloadToken("old-token");
        order.setTokenExpiresAt(LocalDateTime.now().minusMinutes(1));

        assertTrue(service.needsFreshDownloadToken(order));
    }

    @Test
    void needsFreshDownloadTokenReturnsFalseForUsableToken() {
        EbookDeliveryService service = service(mock(PaymentOrderRepository.class), mock(EmailService.class));
        PaymentOrder order = paidOrder();
        order.setDownloadToken("fresh-token");
        order.setTokenExpiresAt(LocalDateTime.now().plusHours(1));

        assertFalse(service.needsFreshDownloadToken(order));
    }

    @Test
    void generateAndSendSendsCustomerReceiptEvenWhenAdminNotificationFails() {
        PaymentOrderRepository repository = mock(PaymentOrderRepository.class);
        EmailService emailService = mock(EmailService.class);
        when(repository.save(any(PaymentOrder.class))).thenAnswer(invocation -> invocation.getArgument(0));
        doThrow(new RuntimeException("admin smtp failed"))
                .when(emailService).sendOrderNotificationEmail(any(PaymentOrder.class), any(String.class));
        EbookDeliveryService service = service(repository, emailService);
        PaymentOrder order = paidOrder();

        service.generateAndSend(order);

        assertNotEquals("old-token", order.getDownloadToken());
        verify(emailService).sendReceiptEmail(eq(order.getCustomerEmail()), eq(order.getProductName()), any(String.class));
        verify(emailService).sendOrderNotificationEmail(eq(order), any(String.class));
    }

    private EbookDeliveryService service(PaymentOrderRepository repository, EmailService emailService) {
        EbookDeliveryService service = new EbookDeliveryService(repository, emailService);
        ReflectionTestUtils.setField(service, "tokenExpireHours", 24);
        ReflectionTestUtils.setField(service, "downloadBaseUrl", "https://psoriasis-backend.fly.dev/api/ebook/download");
        return service;
    }

    private PaymentOrder paidOrder() {
        PaymentOrder order = new PaymentOrder();
        order.setOrderRef("BM-TEST123");
        order.setCustomerEmail("customer@example.com");
        order.setProductName("Panduan Sokongan Psoriasis");
        order.setPaymentStatus("Paid");
        order.setDownloadToken("old-token");
        order.setTokenExpiresAt(LocalDateTime.now().plusHours(1));
        return order;
    }
}
