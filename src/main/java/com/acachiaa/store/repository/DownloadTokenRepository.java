package com.acachiaa.store.repository;

import com.acachiaa.store.model.DownloadToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface DownloadTokenRepository extends JpaRepository<DownloadToken, UUID> {
    Optional<DownloadToken> findByToken(String token);
}
