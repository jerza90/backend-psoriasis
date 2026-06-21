package com.psoriasis.controller;

import com.psoriasis.dto.ForgotPasswordRequest;
import com.psoriasis.dto.LoginRequest;
import com.psoriasis.dto.RegisterRequest;
import com.psoriasis.dto.ResetPasswordRequest;
import com.psoriasis.dto.VerifyRegistrationRequest;
import com.psoriasis.dto.response.AuthResponseDTO;
import com.psoriasis.dto.response.MessageResponseDTO;
import com.psoriasis.dto.response.RegistrationResponseDTO;
import com.psoriasis.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@Valid @RequestBody LoginRequest request) {
        var user = userService.login(request.getEmail(), request.getPassword());
        return new AuthResponseDTO(
                user.getId(),
                user.getEmail(),
                user.getFullName() != null ? user.getFullName() : "",
                user.getUsername(),
                user.getRole()
        );
    }

    @PostMapping("/register")
    public MessageResponseDTO register(@Valid @RequestBody RegisterRequest request) {
        userService.sendRegistrationOtp(request.getEmail());
        return new MessageResponseDTO("OTP sent to your email");
    }

    @PostMapping("/verify-registration")
    public RegistrationResponseDTO verifyRegistration(@Valid @RequestBody VerifyRegistrationRequest request) {
        var user = userService.verifyRegistration(
                request.getEmail(),
                request.getOtpCode(),
                request.getPassword(),
                request.getFullName(),
                request.getUsername()
        );
        return new RegistrationResponseDTO("Registration successful", user.getId(), user.getRole());
    }

    @PostMapping("/forgot-password")
    public MessageResponseDTO forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        userService.sendForgotPasswordOtp(request.getEmail());
        return new MessageResponseDTO("OTP sent to your email");
    }

    @PostMapping("/reset-password")
    public MessageResponseDTO resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.getEmail(), request.getOtpCode(), request.getNewPassword());
        return new MessageResponseDTO("Password reset successful");
    }
}
