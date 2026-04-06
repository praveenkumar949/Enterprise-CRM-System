package com.crm.auth.controller;

import com.crm.auth.dto.AuthRequest;
import com.crm.auth.dto.AuthResponse;
import com.crm.auth.entity.Role;
import com.crm.auth.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register/customer")
    public ResponseEntity<AuthResponse> registerCustomer(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.register(request, Role.CUSTOMER));
    }

    @PostMapping("/register/agent")
    public ResponseEntity<AuthResponse> registerAgent(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.register(request, Role.SUPPORT_AGENT));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/otp/verify")
    public ResponseEntity<AuthResponse> verifyOtp(@RequestParam String email, @RequestParam String otp) {
        return ResponseEntity.ok(authService.verifyOtp(email, otp));
    }

    @PostMapping("/password/forgot")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        authService.forgotPassword(email);
        return ResponseEntity.ok("Reset code sent to console.");
    }

    @PostMapping("/password/reset")
    public ResponseEntity<String> resetPassword(@RequestParam String email, @RequestParam String resetCode, @RequestParam String newPassword) {
        authService.resetPassword(email, resetCode, newPassword);
        return ResponseEntity.ok("Password reset successfully.");
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("ok");
    }
}
