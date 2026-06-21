package com.psoriasis.dto.response;

public class DownloadUrlResponseDTO {
    private String downloadUrl;

    public DownloadUrlResponseDTO() {}

    public DownloadUrlResponseDTO(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }

    public String getDownloadUrl() {
        return downloadUrl;
    }

    public void setDownloadUrl(String downloadUrl) {
        this.downloadUrl = downloadUrl;
    }
}
