package com.acachiaa.store.storage;

import java.io.InputStream;

public interface FileStorageService {
    InputStream downloadFile(String key);
}
