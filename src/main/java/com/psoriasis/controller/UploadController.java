package com.psoriasis.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageInputStream;
import javax.imageio.stream.ImageOutputStream;
import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
public class UploadController {
    private static final int MAX_FILES = 5;
    private static final long MAX_FILE_BYTES = 10L * 1024L * 1024L;
    private static final long MAX_PIXELS = 16_000_000L;
    private static final int MAX_DIMENSION = 1800;
    private static final long COMPRESS_ABOVE_BYTES = 1_500_000L;
    private static final float JPEG_QUALITY = 0.82f;

    private final Path uploadDir;

    public UploadController(@Value("${app.upload.dir:local-ebooks/affiliate-uploads}") String uploadDirPath) {
        this.uploadDir = Paths.get(uploadDirPath);
        try {
            Files.createDirectories(this.uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> upload(
            @RequestParam(value = "files", required = false) MultipartFile[] files,
            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        List<MultipartFile> incoming = new ArrayList<>();
        if (files != null) {
            for (MultipartFile item : files) {
                incoming.add(item);
            }
        }
        if (file != null) {
            incoming.add(file);
        }

        if (incoming.isEmpty()) {
            return badRequest("No files were uploaded");
        }
        if (incoming.size() > MAX_FILES) {
            return badRequest("You can upload up to " + MAX_FILES + " photos at a time");
        }

        List<String> urls = new ArrayList<>();

        try {
            for (MultipartFile item : incoming) {
                urls.add(storeImage(item));
            }
        } catch (IllegalArgumentException e) {
            return badRequest(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Upload failed"));
        }

        Map<String, Object> body = new java.util.LinkedHashMap<>();
        body.put("urls", urls);
        if (!urls.isEmpty()) {
            body.put("url", urls.get(0));
        }
        return ResponseEntity.ok(body);
    }

    private String storeImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        if (file.getSize() > MAX_FILE_BYTES) {
            throw new IllegalArgumentException("Each photo must be 10MB or smaller");
        }

        byte[] bytes = file.getBytes();
        if (!hasAllowedMagic(bytes) || !hasAllowedContentType(file.getContentType())) {
            throw new IllegalArgumentException("Only JPEG and PNG photos are allowed");
        }

        BufferedImage image = readSafeImage(bytes);
        byte[] output = compressToJpeg(image, bytes.length > COMPRESS_ABOVE_BYTES || needsResize(image));

        String filename = UUID.randomUUID() + ".jpg";
        Path target = uploadDir.resolve(filename).normalize();
        if (!target.startsWith(uploadDir.normalize())) {
            throw new IllegalArgumentException("Invalid upload path");
        }
        Files.write(target, output, StandardOpenOption.CREATE_NEW);
        return "/uploads/" + filename;
    }

    private BufferedImage readSafeImage(byte[] bytes) throws IOException {
        try (ImageInputStream input = ImageIO.createImageInputStream(new ByteArrayInputStream(bytes))) {
            Iterator<ImageReader> readers = ImageIO.getImageReaders(input);
            if (!readers.hasNext()) {
                throw new IllegalArgumentException("Uploaded file is not a valid photo");
            }

            ImageReader reader = readers.next();
            try {
                reader.setInput(input, true, true);
                int width = reader.getWidth(0);
                int height = reader.getHeight(0);
                if (width < 1 || height < 1 || ((long) width * height) > MAX_PIXELS) {
                    throw new IllegalArgumentException("Photo dimensions are too large");
                }
                return reader.read(0);
            } finally {
                reader.dispose();
            }
        }
    }

    private byte[] compressToJpeg(BufferedImage original, boolean shouldResize) throws IOException {
        BufferedImage image = shouldResize ? resize(original) : original;
        BufferedImage rgb = new BufferedImage(image.getWidth(), image.getHeight(), BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = rgb.createGraphics();
        try {
            graphics.setColor(Color.WHITE);
            graphics.fillRect(0, 0, rgb.getWidth(), rgb.getHeight());
            graphics.drawImage(image, 0, 0, null);
        } finally {
            graphics.dispose();
        }

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpeg");
        if (!writers.hasNext()) {
            throw new IOException("JPEG writer unavailable");
        }
        ImageWriter writer = writers.next();
        try (ImageOutputStream imageOutput = ImageIO.createImageOutputStream(output)) {
            ImageWriteParam params = writer.getDefaultWriteParam();
            params.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
            params.setCompressionQuality(JPEG_QUALITY);
            writer.setOutput(imageOutput);
            writer.write(null, new IIOImage(rgb, null, null), params);
        } finally {
            writer.dispose();
        }
        return output.toByteArray();
    }

    private BufferedImage resize(BufferedImage image) {
        int width = image.getWidth();
        int height = image.getHeight();
        int largest = Math.max(width, height);
        if (largest <= MAX_DIMENSION) {
            return image;
        }

        double scale = (double) MAX_DIMENSION / largest;
        int targetWidth = Math.max(1, (int) Math.round(width * scale));
        int targetHeight = Math.max(1, (int) Math.round(height * scale));

        BufferedImage resized = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = resized.createGraphics();
        try {
            graphics.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            graphics.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
            graphics.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            graphics.drawImage(image, 0, 0, targetWidth, targetHeight, null);
        } finally {
            graphics.dispose();
        }
        return resized;
    }

    private boolean needsResize(BufferedImage image) {
        return Math.max(image.getWidth(), image.getHeight()) > MAX_DIMENSION;
    }

    private boolean hasAllowedContentType(String contentType) {
        return "image/jpeg".equalsIgnoreCase(contentType)
                || "image/png".equalsIgnoreCase(contentType);
    }

    private boolean hasAllowedMagic(byte[] bytes) {
        if (bytes.length < 8) {
            return false;
        }
        boolean jpeg = (bytes[0] & 0xff) == 0xff && (bytes[1] & 0xff) == 0xd8 && (bytes[2] & 0xff) == 0xff;
        boolean png = (bytes[0] & 0xff) == 0x89
                && bytes[1] == 0x50
                && bytes[2] == 0x4e
                && bytes[3] == 0x47
                && bytes[4] == 0x0d
                && bytes[5] == 0x0a
                && bytes[6] == 0x1a
                && bytes[7] == 0x0a;
        return jpeg || png;
    }

    private ResponseEntity<Map<String, Object>> badRequest(String message) {
        return ResponseEntity.badRequest().body(Map.of("error", message));
    }
}
