package com.psoriasis.controller;

import com.psoriasis.dto.response.DownloadUrlResponse;
import com.psoriasis.dto.response.ErrorResponse;
import com.psoriasis.dto.response.PaymentStatusResponse;
import com.psoriasis.dto.response.ApiResponse;
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
    public ResponseEntity<PaymentStatusResponse> getStatus(@RequestParam String billCode) {
        try {
            PaymentOrder order = toyyibPayService.checkPaymentStatus(billCode);
            String status = "Paid".equals(order.getPaymentStatus()) ? "paid" : "unpaid";
            return ResponseEntity.ok(new PaymentStatusResponse(status, order.getDownloadToken() != null));
        } catch (Exception e) {
            return ResponseEntity.ok(new PaymentStatusResponse("unknown", false));
        }
    }

    @PostMapping("/toyyipay-download")
    public ResponseEntity<ApiResponse> requestDownload(@RequestParam String billCode) {
        PaymentOrder order = orderRepository.findByBillCode(billCode)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if (!"Paid".equals(order.getPaymentStatus())) {
            return ResponseEntity.badRequest().body(new ErrorResponse("Payment not completed"));
        }
        if (order.getDownloadToken() == null) {
            deliveryService.generateAndSend(order);
        }
        return ResponseEntity.ok(new DownloadUrlResponse(order.getDownloadToken()));
    }
}
