package com.psoriasis.controller;

import com.psoriasis.dto.ForgotPasswordRequest;
import com.psoriasis.dto.LoginRequest;
import com.psoriasis.dto.RegisterRequest;
import com.psoriasis.dto.ResetPasswordRequest;
import com.psoriasis.dto.VerifyRegistrationRequest;
import com.psoriasis.dto.response.ApiResponse;
import com.psoriasis.dto.response.AuthResponse;
import com.psoriasis.dto.response.ErrorResponse;
import com.psoriasis.dto.response.MessageResponse;
import com.psoriasis.dto.response.RegistrationResponse;
import com.psoriasis.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            var user = userService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(new AuthResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFullName() != null ? user.getFullName() : "",
                    user.getUsername(),
                    user.getRole()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        try {
            userService.sendRegistrationOtp(request.getEmail());
            return ResponseEntity.ok(new MessageResponse("OTP sent to your email"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/verify-registration")
    public ResponseEntity<ApiResponse> verifyRegistration(@Valid @RequestBody VerifyRegistrationRequest request) {
        try {
            var user = userService.verifyRegistration(
                    request.getEmail(),
                    request.getOtpCode(),
                    request.getPassword(),
                    request.getFullName(),
                    request.getUsername()
            );
            return ResponseEntity.ok(new RegistrationResponse("Registration successful", user.getId(), user.getRole()));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            userService.sendForgotPasswordOtp(request.getEmail());
            return ResponseEntity.ok(new MessageResponse("OTP sent to your email"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        try {
            userService.resetPassword(request.getEmail(), request.getOtpCode(), request.getNewPassword());
            return ResponseEntity.ok(new MessageResponse("Password reset successful"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
}
