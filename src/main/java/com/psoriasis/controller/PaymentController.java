package com.psoriasis.controller;

import com.psoriasis.dto.response.DownloadUrlResponseDTO;
import com.psoriasis.dto.response.PaymentStatusResponseDTO;
import com.psoriasis.model.PaymentOrder;
import com.psoriasis.repository.PaymentOrderRepository;
import com.psoriasis.service.EbookDeliveryService;
import com.psoriasis.service.ToyyibPayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

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
    public PaymentStatusResponseDTO getStatus(@RequestParam String billCode) {
        try {
            PaymentOrder order = toyyibPayService.checkPaymentStatus(billCode);
            String status = "Paid".equals(order.getPaymentStatus()) ? "paid" : "unpaid";
            return new PaymentStatusResponseDTO(status, order.getDownloadToken() != null);
        } catch (Exception e) {
            return new PaymentStatusResponseDTO("unknown", false);
        }
    }

    @PostMapping("/toyyipay-download")
    public DownloadUrlResponseDTO requestDownload(@RequestParam String billCode) {
        PaymentOrder order = orderRepository.findByBillCode(billCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
        if (!"Paid".equals(order.getPaymentStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Payment not completed");
        }
        if (order.getDownloadToken() == null) {
            deliveryService.generateAndSend(order);
        }
        return new DownloadUrlResponseDTO(order.getDownloadToken());
    }
}
