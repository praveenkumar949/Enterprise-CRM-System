package com.crm.ticket.service;

import com.crm.ticket.entity.Ticket;
import com.crm.ticket.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private org.springframework.kafka.core.KafkaTemplate<String, String> kafkaTemplate;

    public Ticket createTicket(Ticket ticket) {
        Ticket saved = ticketRepository.save(ticket);
        kafkaTemplate.send("notificationTopic", "ALERT: New Ticket Created - " + saved.getTitle());
        return saved;
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
    }

    public List<Ticket> getTicketsByCustomerId(Long customerId) {
        return ticketRepository.findByCustomerId(customerId);
    }

    public Ticket updateTicketStatus(Long id, String status) {
        Ticket existing = getTicketById(id);
        existing.setStatus(status);
        Ticket saved = ticketRepository.save(existing);
        kafkaTemplate.send("notificationTopic", "ALERT: Ticket Status Updated - " + saved.getTitle() + " to " + status);
        return saved;
    }

    public Ticket updateTicket(Long id, Ticket updatedTicket) {
        Ticket existing = getTicketById(id);
        existing.setTitle(updatedTicket.getTitle());
        existing.setDescription(updatedTicket.getDescription());
        existing.setPriority(updatedTicket.getPriority());
        existing.setStatus(updatedTicket.getStatus());
        existing.setCustomerId(updatedTicket.getCustomerId());
        
        Ticket saved = ticketRepository.save(existing);
        kafkaTemplate.send("notificationTopic", "ALERT: Ticket Updated - " + saved.getTitle());
        return saved;
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}
