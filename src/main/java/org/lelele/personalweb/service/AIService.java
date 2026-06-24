package org.lelele.personalweb.service;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class AIService {

    @Value("${zhipuai.api.key}")
    private String apiKey;

    @Value("${zhipuai.model}")
    private String model;

    @Value("${zhipuai.max-tokens}")
    private int maxTokens;

    @Value("${zhipuai.temperature}")
    private double temperature;

    private final OkHttpClient client = new OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(60, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build();

    private final Gson gson = new Gson();

    private static final String SYSTEM_PROMPT = """ 
        你是 LeLeLe 的个人博客AI助手。你的职责是：

        ## 基本信息
        - 博主姓名：LeLeLe
        - 身份：全栈开发工程师 / 技术博主 / 开源爱好者
        - 坐标：中国
        - 专业：计算机科学与技术
        - 经验：1年+ 全栈开发经验

        ## 技术栈
        ### 前端（精通）：
        - JavaScript/TypeScript (95%)
        - React/Vue.js (90%/85%)
        - HTML/CSS/TailwindCSS (92%/88%)
        - Three.js (75%)

        ### 后端（熟练）：
        - Java/Spring Boot (88%/85%)
        - Node.js/Python (82%/78%)
        - MySQL/Redis (80%/72%)

        ### 运维（熟悉）：
        - Docker/Git/Linux (78%/90%/75%)

        ## 项目展示
        1. SlaySeed - 杀戮尖塔种子平台（React+Spring Boot）
        2. School Take Out - 电商后台（Vue.js+Node.js）
        3. 3D Portfolio Website - 个人网站（Three.js）
        4. Book Note Manager - 笔记管理系统（Spring Cloud微服务）

        ## 联系方式
        - 邮箱：3054793058@qq.com
        - GitHub：https://github.com/lelele-lswl
        - Bilibili：https://space.bilibili.com/493506164

        ## 兴趣爱好
        Web开发、开源项目、技术写作、3D可视化、人工智能

        ## 回答要求
        1. 使用中文回答，语气友好热情
        适当使用emoji增加亲和力
        回答要详细但不冗长
        如果不确定的信息，诚实说明
        保持专业但平易近人的风格
        """;

    public String chat(String userMessage) {
        try {
            List<Map<String, String>> messages = new ArrayList<>();

            Map<String, String> systemMessage = new HashMap<>();
            systemMessage.put("role", "system");
            systemMessage.put("content", SYSTEM_PROMPT);
            messages.add(systemMessage);

            Map<String, String> userMsg = new HashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", userMessage);
            messages.add(userMsg);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", model);
            requestBody.put("messages", messages);
            requestBody.put("max_tokens", maxTokens);
            requestBody.put("temperature", temperature);

            String jsonBody = gson.toJson(requestBody);

            Request request = new Request.Builder()
                    .url("https://open.bigmodel.cn/api/paas/v4/chat/completions")
                    .addHeader("Authorization", "Bearer " + apiKey)
                    .addHeader("Content-Type", "application/json")
                    .post(RequestBody.create(jsonBody, MediaType.parse("application/json")))
                    .build();

            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    log.error("智谱API调用失败: {}", response.code());
                    return getFallbackResponse(userMessage);
                }

                String responseBody = response.body().string();
                Map<String, Object> result = gson.fromJson(responseBody, Map.class);

                @SuppressWarnings("unchecked")
                List<Map<String, Object>> choices = (List<Map<String, Object>>) result.get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map<String, Object> choice = choices.get(0);
                    Map<String, Object> message = (Map<String, Object>) choice.get("message");
                    return (String) message.get("content");
                }

                return getFallbackResponse(userMessage);
            }
        } catch (Exception e) {
            log.error("调用智谱AI异常: ", e);
            return getFallbackResponse(userMessage);
        }
    }

    private String getFallbackResponse(String userMessage) {
        String lower = userMessage.toLowerCase();
        
        if (lower.contains("你好") || lower.contains("hi") || lower.contains("hello")) {
            return "你好！我是 LeLeLe 的 AI 助手 🤖 很高兴见到你！有什么想了解的吗？";
        }
        
        if (lower.contains("技术") || lower.contains("框架")) {
            return "这个网站使用了 React + Spring Boot 全栈架构。前端采用 React 19 + TypeScript + Three.js，后端使用 Spring Boot 3.5 + MySQL + Redis 💻";
        }
        
        if (lower.contains("项目")) {
            return "目前展示了 4 个精选项目：SlaySeed、School Take Out、3D Portfolio Website 和 Book Note Manager 📦";
        }
        
        if (lower.contains("联系") || lower.contains("邮箱")) {
            return "你可以通过邮件 3054793058@qq.com 或 GitHub 联系我 📧";
        }
        
        return "抱歉，AI服务暂时不可用 😅 你可以稍后再试，或者通过页面底部的联系表单留言给我~";
    }
}