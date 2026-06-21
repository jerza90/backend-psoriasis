package com.psoriasis.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public LoginRequest() {}

    public @NotBlank String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public @NotBlank String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
