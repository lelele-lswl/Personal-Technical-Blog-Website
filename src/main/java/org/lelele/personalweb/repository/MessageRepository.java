package org.lelele.personalweb.repository;

import org.lelele.personalweb.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByOrderByCreatedAtDesc();
    long countByIsReadFalse();
}