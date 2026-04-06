package com.crm.notification.repository;

import com.crm.notification.document.NotificationLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<NotificationLog, String> {
    List<NotificationLog> findByRecipientIdOrderByTimestampDesc(Long recipientId);
}
