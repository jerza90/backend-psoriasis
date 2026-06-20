package com.psoriasis.controller;

import com.psoriasis.service.EbookDeliveryService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ebook")
public class EbookDownloadController {

    private final EbookDeliveryService deliveryService;

    public EbookDownloadController(EbookDeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @GetMapping("/download/{token}")
    public void download(@PathVariable String token, HttpServletResponse response) {
        deliveryService.streamPdf(token, response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException e) {
        String msg = e.getMessage();
        HttpStatus status = msg.contains("expired") ? HttpStatus.GONE
                : msg.contains("limit") ? HttpStatus.FORBIDDEN
                : msg.contains("Invalid") ? HttpStatus.NOT_FOUND
                : HttpStatus.INTERNAL_SERVER_ERROR;
        return ResponseEntity.status(status).body(Map.of("error", msg));
    }
}
