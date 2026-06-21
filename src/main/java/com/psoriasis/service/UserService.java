package com.psoriasis.service;

import com.psoriasis.model.User;
import com.psoriasis.repository.AffiliateRepository;
import com.psoriasis.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final AffiliateRepository affiliateRepository;

    private static final int OTP_EXPIRE_MINUTES = 10;
    private static final int OTP_LENGTH = 6;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, EmailService emailService, AffiliateRepository affiliateRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.affiliateRepository = affiliateRepository;
    }

    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        String passwordHash = passwordEncoder.encode(user.getPasswordHash());
        user.setPasswordHash(passwordHash);
        user.setRole(resolveRoleForEmail(user.getEmail()));

        return userRepository.save(user);
    }

    public void sendRegistrationOtp(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }

        String otp = generateOtp();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setPasswordHash(""); // placeholder, set on verification
        }
        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(OTP_EXPIRE_MINUTES));
        userRepository.save(user);

        emailService.sendOtpEmail(email, otp, "Account Registration");
    }

    public User verifyRegistration(String email, String otpCode, String password, String fullName, String username) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (user.getOtpCode() == null || !user.getOtpCode().equals(otpCode)) {
            throw new RuntimeException("Invalid OTP code");
        }
        if (user.getOtpExpiry() == null || LocalDateTime.now().isAfter(user.getOtpExpiry())) {
            throw new RuntimeException("OTP code has expired");
        }

        String finalUsername = (username != null && !username.isBlank()) ? username : email.split("@")[0];
        if (userRepository.existsByUsername(finalUsername)) {
            throw new RuntimeException("Username already taken");
        }

        user.setUsername(finalUsername);
        user.setFullName(fullName);
        user.setPasswordHash(passwordEncoder.encode(password));
        user.setRole(resolveRoleForEmail(email));
        user.setEnabled(true);
        user.setOtpCode(null);
        user.setOtpExpiry(null);
        return userRepository.save(user);
    }

    public void sendForgotPasswordOtp(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("No account found with this email");
        }

        String otp = generateOtp();
        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(OTP_EXPIRE_MINUTES));
        userRepository.save(user);

        emailService.sendOtpEmail(email, otp, "Password Reset");
    }

    public void resetPassword(String email, String otpCode, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if (user.getOtpCode() == null || !user.getOtpCode().equals(otpCode)) {
            throw new RuntimeException("Invalid OTP code");
        }
        if (user.getOtpExpiry() == null || LocalDateTime.now().isAfter(user.getOtpExpiry())) {
            throw new RuntimeException("OTP code has expired");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setOtpCode(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }
        if (!user.isEnabled()) {
            throw new RuntimeException("Account not activated. Please verify your email.");
        }
        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }
        return user;
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public String resolveRoleForEmail(String email) {
        if (email != null && affiliateRepository.existsByEmail(email)) {
            return "affiliate";
        }
        return "user";
    }

    public void assignRoleByEmail(String email, String role) {
        if (email == null || email.isBlank() || role == null || role.isBlank()) {
            return;
        }
        User user = userRepository.findByEmail(email);
        if (user == null) {
            return;
        }
        user.setRole(role);
        userRepository.save(user);
    }

    private String generateOtp() {
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }
}
