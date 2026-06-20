package com.acachiaa.store.service;

import com.acachiaa.store.exception.DownloadLimitExceededException;
import com.acachiaa.store.exception.TokenExpiredException;
import com.acachiaa.store.exception.TokenInvalidException;
import com.acachiaa.store.model.DownloadToken;
import com.acachiaa.store.model.Order;
import com.acachiaa.store.repository.DownloadTokenRepository;
import com.acachiaa.store.storage.FileStorageService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class DownloadService {

    private final DownloadTokenRepository tokenRepository;
    private final FileStorageService storageService;
    private final int tokenExpireHours;

    public DownloadService(DownloadTokenRepository tokenRepository,
                           FileStorageService storageService,
                           @Value("${app.ebook.token-expire-hours:24}") int tokenExpireHours) {
        this.tokenRepository = tokenRepository;
        this.storageService = storageService;
        this.tokenExpireHours = tokenExpireHours;
    }

    @Transactional
    public String generateDownloadToken(Order order) {
        DownloadToken token = DownloadToken.builder()
                .order(order)
                .token(UUID.randomUUID().toString())
                .expiresAt(LocalDateTime.now().plusHours(tokenExpireHours))
                .downloadCount(0)
                .maxDownloads(3)
                .build();
        tokenRepository.save(token);
        return token.getToken();
    }

    @Transactional
    public void streamPdfDownload(String tokenStr, HttpServletResponse response) {
        DownloadToken token = tokenRepository.findByToken(tokenStr)
                .orElseThrow(() -> new TokenInvalidException("Invalid download token"));

        if (token.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new TokenExpiredException("Download token has expired");
        }

        if (token.getDownloadCount() >= token.getMaxDownloads()) {
            throw new DownloadLimitExceededException(
                    "Download limit reached (" + token.getMaxDownloads() + " downloads)");
        }

        token.setDownloadCount(token.getDownloadCount() + 1);
        tokenRepository.save(token);

        String r2FileKey = token.getOrder().getProduct().getR2FileKey();
        if (r2FileKey == null || r2FileKey.isBlank()) {
            throw new RuntimeException("Product file key is not configured");
        }

        InputStream pdfStream = storageService.downloadFile(r2FileKey);

        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"AcachiaaEbook.pdf\"");

        try (InputStream is = pdfStream; var os = response.getOutputStream()) {
            is.transferTo(os);
            os.flush();
        } catch (IOException e) {
            throw new RuntimeException("Failed to stream PDF", e);
        }
    }
}
