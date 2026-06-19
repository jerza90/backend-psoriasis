package com.psoriasis.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ResetPasswordRequest {

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 6, max = 6)
    private String otpCode;

    @NotBlank @Size(min = 8)
    private String newPassword;

    public ResetPasswordRequest() {}

    public @NotBlank @Email String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public @NotBlank @Size(min = 6, max = 6) String getOtpCode() { return otpCode; }
    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }

    public @NotBlank @Size(min = 8) String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
