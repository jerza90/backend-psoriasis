package com.acachiaa.store.controller;

import com.acachiaa.store.exception.DownloadLimitExceededException;
import com.acachiaa.store.exception.TokenExpiredException;
import com.acachiaa.store.exception.TokenInvalidException;
import com.acachiaa.store.service.DownloadService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/download")
public class DownloadController {

    private final DownloadService downloadService;

    public DownloadController(DownloadService downloadService) {
        this.downloadService = downloadService;
    }

    @GetMapping
    public void download(@RequestParam String token, HttpServletResponse response) {
        downloadService.streamPdfDownload(token, response);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(TokenInvalidException.class)
    public ResponseEntity<Map<String, String>> handleTokenInvalid(TokenInvalidException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", e.getMessage()));
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<Map<String, String>> handleTokenExpired(TokenExpiredException e) {
        return ResponseEntity.status(HttpStatus.GONE)
                .body(Map.of("error", e.getMessage()));
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(DownloadLimitExceededException.class)
    public ResponseEntity<Map<String, String>> handleDownloadLimit(DownloadLimitExceededException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("error", e.getMessage()));
    }
}
