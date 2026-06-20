package com.psoriasis.controller;

import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import com.psoriasis.service.ToyyibPayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    private final ToyyibPayService toyyibPayService;
    private final PaymentOrderRepository orderRepository;

    public PaymentController(ToyyibPayService toyyibPayService, PaymentOrderRepository orderRepository) {
        this.toyyibPayService = toyyibPayService;
        this.orderRepository = orderRepository;
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
            return ResponseEntity.ok(Map.of(
                    "status", order.getPaymentStatus(),
                    "billCode", order.getBillCode()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
