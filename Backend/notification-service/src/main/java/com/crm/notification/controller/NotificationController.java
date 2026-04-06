package com.crm.notification.controller;

import com.crm.notification.document.NotificationLog;
import com.crm.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    public ResponseEntity<Void> sendNotification(
            @RequestParam Long recipientId, 
            @RequestParam String message, 
            @RequestParam String type) {
        notificationService.saveAndSendNotification(recipientId, message, type);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{recipientId}")
    public ResponseEntity<List<NotificationLog>> getNotifications(@PathVariable Long recipientId) {
        return ResponseEntity.ok(notificationService.getNotificationsByRecipientId(recipientId));
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("ok");
    }
}
