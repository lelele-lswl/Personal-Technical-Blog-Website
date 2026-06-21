package org.lelele.personalweb.service;

import lombok.RequiredArgsConstructor;
import org.lelele.personalweb.entity.Message;
import org.lelele.personalweb.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public List<Message> getAllMessages() {
        return messageRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }

    @Transactional
    public Message markAsRead(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setIsRead(true);
        return messageRepository.save(message);
    }

    public long getUnreadCount() {
        return messageRepository.countByIsReadFalse();
    }
}