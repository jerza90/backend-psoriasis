package com.psoriasis.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterRequest {

    @NotBlank @Email
    private String email;

    public RegisterRequest() {}

    public RegisterRequest(String email) {
        this.email = email;
    }

    public @NotBlank @Email String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
