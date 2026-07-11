package com.psoriasis.controller;

import com.psoriasis.dto.UserCreateRequest;
import com.psoriasis.dto.response.UserResponseDTO;
import com.psoriasis.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public UserResponseDTO createUser(@RequestBody UserCreateRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists");
        }
        if (userService.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        var user = new com.psoriasis.model.User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(request.getPassword());
        user.setFullName(request.getFullName());
        return userService.registerUser(user);
    }

    @GetMapping("/username/{username}")
    public UserResponseDTO getUserByUsername(@PathVariable String username) {
        UserResponseDTO user = userService.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return user;
    }

    @GetMapping("/email/{email}")
    public UserResponseDTO getUserByEmail(@PathVariable String email) {
        UserResponseDTO user = userService.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return user;
    }

    @GetMapping("/{id}")
    public UserResponseDTO getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PutMapping("/{id}/avatar")
    public ResponseEntity<UserResponseDTO> updateAvatar(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String avatarUrl = body.get("avatarUrl");
        if (avatarUrl == null || avatarUrl.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        UserResponseDTO updated = userService.updateAvatar(id, avatarUrl);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/exists/username/{username}")
    public Boolean existsByUsername(@PathVariable String username) {
        return userService.existsByUsername(username);
    }

    @GetMapping("/exists/email/{email}")
    public Boolean existsByEmail(@PathVariable String email) {
        return userService.existsByEmail(email);
    }
}
