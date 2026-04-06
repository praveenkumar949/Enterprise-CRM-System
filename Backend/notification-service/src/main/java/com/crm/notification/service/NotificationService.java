package com.crm.notification.service;

import com.crm.notification.document.NotificationLog;
import com.crm.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.kafka.annotation.KafkaListener;
import java.util.List;

@Service
public class NotificationService {

    @KafkaListener(topics = "notificationTopic", groupId = "notification-group")
    public void listenForNotifications(String message) {
        saveAndSendNotification(0L, message, "KAFKA_BROKER_ALERT");
        System.out.println("Received Kafka Alert: " + message);
    }

    @Autowired
    private NotificationRepository notificationRepository;

    public void saveAndSendNotification(Long recipientId, String message, String type) {
        NotificationLog log = new NotificationLog(recipientId, message, type);
        notificationRepository.save(log);

        // If type == WEBSOCKET, we would inject SimpMessagingTemplate and push it to "/topic/notifications/{recipientId}"
        // example: messagingTemplate.convertAndSend("/topic/notifications/" + recipientId, message);
    }

    public List<NotificationLog> getNotificationsByRecipientId(Long recipientId) {
        return notificationRepository.findByRecipientIdOrderByTimestampDesc(recipientId);
    }
}
