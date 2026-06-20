package com.acachiaa.store.storage;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;

@Component
@ConditionalOnProperty(name = "app.ebook.storage-mode", havingValue = "local", matchIfMissing = true)
public class LocalFileStorage implements FileStorageService {

    private final String localPath;

    public LocalFileStorage(@Value("${app.ebook.local-path}") String localPath) {
        this.localPath = localPath;
    }

    @Override
    public InputStream downloadFile(String key) {
        java.nio.file.Path filePath = java.nio.file.Paths.get(localPath, key);
        FileSystemResource resource = new FileSystemResource(filePath);
        if (!resource.exists()) {
            throw new RuntimeException("Ebook file not found at: " + filePath);
        }
        try {
            return resource.getInputStream();
        } catch (Exception e) {
            throw new RuntimeException("Failed to read ebook file", e);
        }
    }
}
