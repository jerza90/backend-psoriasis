package com.psoriasis.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class VerifyRegistrationRequest {

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 6, max = 6)
    private String otpCode;

    @NotBlank @Size(min = 8)
    private String password;

    @NotBlank
    private String fullName;

    private String username;

    public VerifyRegistrationRequest() {}

    public @NotBlank @Email String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public @NotBlank @Size(min = 6, max = 6) String getOtpCode() { return otpCode; }
    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }

    public @NotBlank @Size(min = 8) String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public @NotBlank String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
}
