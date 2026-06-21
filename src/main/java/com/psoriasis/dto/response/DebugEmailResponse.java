package com.psoriasis.dto.response;

public class DebugEmailResponse {
    private String message;
    private String to;
    private String type;

    public DebugEmailResponse() {}

    public DebugEmailResponse(String message, String to, String type) {
        this.message = message;
        this.to = to;
        this.type = type;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getTo() { return to; }
    public void setTo(String to) { this.to = to; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
