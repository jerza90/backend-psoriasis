package com.acachiaa.store.storage;

import com.acachiaa.store.storage.FileStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;

import java.io.InputStream;

@Component
@ConditionalOnProperty(name = "app.ebook.storage-mode", havingValue = "r2")
public class R2FileStorage implements FileStorageService {

    private final S3Client s3Client;
    private final String bucketName;

    public R2FileStorage(S3Client s3Client,
                         @Value("${cloudflare.r2.bucket-name}") String bucketName) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
    }

    @Override
    public InputStream downloadFile(String key) {
        GetObjectRequest request = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        return s3Client.getObject(request);
    }
}
