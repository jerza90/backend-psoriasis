package com.psoriasis.controller;

import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import com.psoriasis.service.EbookDeliveryService;
import com.psoriasis.service.ToyyibPayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final ToyyibPayService toyyibPayService;
    private final PaymentOrderRepository orderRepository;
    private final EbookDeliveryService deliveryService;

    public PaymentController(ToyyibPayService toyyibPayService, PaymentOrderRepository orderRepository, EbookDeliveryService deliveryService) {
        this.toyyibPayService = toyyibPayService;
        this.orderRepository = orderRepository;
        this.deliveryService = deliveryService;
    }

    @PostMapping("/toyyipay-callback")
    public ResponseEntity<String> handleCallback(@RequestParam Map<String, String> params) {
        String billCode = params.get("billcode");
        if (billCode != null) {
            try {
                toyyibPayService.checkPaymentStatus(billCode);
            } catch (Exception e) {
                return ResponseEntity.ok("OK");
            }
        }
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/toyyipay-status")
    public ResponseEntity<?> getStatus(@RequestParam String billCode) {
        try {
            PaymentOrder order = toyyibPayService.checkPaymentStatus(billCode);
            String status = "Paid".equals(order.getPaymentStatus()) ? "paid" : "unpaid";
            return ResponseEntity.ok(Map.of(
                    "payment_status", status,
                    "download_ready", order.getDownloadToken() != null
            ));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("payment_status", "unknown"));
        }
    }

    @PostMapping("/toyyipay-download")
    public ResponseEntity<?> requestDownload(@RequestParam String billCode) {
        PaymentOrder order = orderRepository.findByBillCode(billCode)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if (!"Paid".equals(order.getPaymentStatus())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Payment not completed"));
        }
        if (order.getDownloadToken() == null) {
            deliveryService.generateAndSend(order);
        }
        return ResponseEntity.ok(Map.of(
                "downloadUrl", order.getDownloadToken()
        ));
    }
}
