package org.lelele.personalweb.controller;

import lombok.RequiredArgsConstructor;
import org.lelele.personalweb.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AIController {

    private final AIService aiService;

    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> chat(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        
        if (message == null || message.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "消息不能为空"
            ));
        }

        try {
            String response = aiService.chat(message.trim());
            return ResponseEntity.ok(Map.of(
                    "reply", response
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "error", "AI服务异常: " + e.getMessage()
            ));
        }
    }
}