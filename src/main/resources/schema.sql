CREATE DATABASE IF NOT EXISTS personal_web
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE personal_web;

INSERT INTO profiles (name, title, bio, avatar_url, resume_url, github, email, linkedin, location, motto)
VALUES (
    'LeLeLe',
    'Full Stack Developer',
    '热爱编程，专注于全栈开发。擅长前后端技术，追求代码的优雅与高效。喜欢探索新技术，将创意转化为现实。拥有5年以上开发经验，参与过多个大型项目的设计与开发。',
    '',
    '',
    'https://github.com',
    'hello@example.com',
    'https://linkedin.com',
    'China',
    'Code is poetry, build with passion.'
) ON DUPLICATE KEY UPDATE name=name;

INSERT INTO skills (name, category, level, icon) VALUES
('React', 'Frontend', 90, 'SiReact'),
('Vue.js', 'Frontend', 85, 'SiVuedotjs'),
('TypeScript', 'Frontend', 88, 'SiTypescript'),
('JavaScript', 'Frontend', 95, 'SiJavascript'),
('HTML/CSS', 'Frontend', 92, 'SiHtml5'),
('Three.js', 'Frontend', 75, 'SiThreedotjs'),
('TailwindCSS', 'Frontend', 88, 'SiTailwindcss'),
('Spring Boot', 'Backend', 85, 'SiSpringboot'),
('Java', 'Backend', 88, 'SiOpenjdk'),
('Node.js', 'Backend', 82, 'SiNodedotjs'),
('Python', 'Backend', 78, 'SiPython'),
('MySQL', 'Backend', 80, 'SiMysql'),
('Redis', 'Backend', 72, 'SiRedis'),
('Docker', 'DevOps', 78, 'SiDocker'),
('Git', 'DevOps', 90, 'SiGit'),
('Linux', 'DevOps', 75, 'SiLinux'),
('Nginx', 'DevOps', 70, 'SiNginx'),
('AWS', 'DevOps', 65, 'SiAmazon');

INSERT INTO projects (title, description, tech_stack, github_url, preview_url, image_url, sort_order) VALUES
('AI Chat Platform', '基于大语言模型的智能对话平台，支持多轮对话、上下文记忆、代码高亮等功能。采用流式输出，响应迅速。', 'React, Spring Boot, OpenAI API, WebSocket, MySQL', 'https://github.com', 'https://example.com', '', 1),
('E-Commerce Dashboard', '全功能电商管理后台，包含数据可视化、订单管理、用户分析、库存追踪等模块。支持实时数据推送。', 'Vue.js, Node.js, ECharts, MongoDB, Socket.io', 'https://github.com', 'https://example.com', '', 2),
('3D Portfolio Website', '个人作品展示网站，使用Three.js打造沉浸式3D体验，包含粒子系统、模型交互、动态光影等效果。', 'React, Three.js, Framer Motion, TailwindCSS', 'https://github.com', 'https://example.com', '', 3),
('Microservice Architecture', '基于Spring Cloud的微服务架构项目，包含服务注册、配置中心、网关路由、链路追踪等核心组件。', 'Spring Cloud, Docker, Kubernetes, Redis, RabbitMQ', 'https://github.com', '', '', 4);