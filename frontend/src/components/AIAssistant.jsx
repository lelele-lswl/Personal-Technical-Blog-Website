import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend, FiCpu } from 'react-icons/fi'

const AI_RESPONSES = {
  greet: [
    '你好！我是AI助手，有什么可以帮你的吗？ 😊',
    '嗨！欢迎来到这个个人网站，想了解什么？',
    '你好呀！我可以回答关于这个网站、技术栈或项目的问题~',
  ],
  tech: [
    '这个网站使用了 React + Vite 作为前端框架，Spring Boot + MySQL 作为后端。3D效果由 Three.js + React Three Fiber 实现，动画使用 Framer Motion。',
    '前端技术栈：React 19, Vite 8, Three.js, React Three Fiber, Framer Motion, TailwindCSS, Axios\n后端技术栈：Spring Boot 3.5, Spring Data JPA, MySQL, Lombok',
  ],
  project: [
    '项目展示区包含多个精选项目，每个项目都有GitHub源码和在线预览链接。你可以点击项目卡片查看详情！',
    '目前展示了4个代表性项目，涵盖AI对话平台、电商后台、3D网站和微服务架构等领域。',
  ],
  contact: [
    '你可以通过页面底部的联系表单给我留言，也可以直接发送邮件到 hello@example.com',
    '在联系区域填写你的姓名、邮箱和留言内容，我会尽快回复你！',
  ],
  skill: [
    '技能雷达图展示了前端、后端和运维三个方向的技能水平。你可以切换雷达图和进度条两种查看模式！',
    '前端擅长 React/Vue/TypeScript，后端精通 Spring Boot/Node.js/Python，运维熟悉 Docker/Git/Linux。',
  ],
  default: [
    '这个问题很有趣！不过我目前还在学习中，你可以问我关于技术栈、项目或联系方式的问题~',
    '我暂时还不太确定这个问题的答案，但你可以尝试问我关于这个网站的技术实现、项目详情等问题！',
    '感谢你的提问！我目前能回答关于技术栈、项目展示、联系方式等方面的问题。',
  ],
}

function getAIResponse(message) {
  const lower = message.toLowerCase()
  if (/你好|hi|hello|嗨|hey/.test(lower)) {
    return AI_RESPONSES.greet[Math.floor(Math.random() * AI_RESPONSES.greet.length)]
  }
  if (/技术|tech|栈|框架|framework|技术栈/.test(lower)) {
    return AI_RESPONSES.tech[Math.floor(Math.random() * AI_RESPONSES.tech.length)]
  }
  if (/项目|project|作品|portfolio/.test(lower)) {
    return AI_RESPONSES.project[Math.floor(Math.random() * AI_RESPONSES.project.length)]
  }
  if (/联系|contact|邮件|email|留言/.test(lower)) {
    return AI_RESPONSES.contact[Math.floor(Math.random() * AI_RESPONSES.contact.length)]
  }
  if (/技能|skill|能力|雷达/.test(lower)) {
    return AI_RESPONSES.skill[Math.floor(Math.random() * AI_RESPONSES.skill.length)]
  }
  return AI_RESPONSES.default[Math.floor(Math.random() * AI_RESPONSES.default.length)]
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '你好！我是AI智能助手 🤖 可以回答关于这个网站的问题，比如技术栈、项目详情、联系方式等。有什么想了解的吗？',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getAIResponse(userMessage.content)
      setMessages((prev) => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 800 + Math.random() * 700)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] flex items-center justify-center text-white shadow-lg shadow-[#6c63ff]/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 180 : 0 }}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[520px] rounded-2xl overflow-hidden border border-[#6c63ff]/20 shadow-2xl shadow-[#6c63ff]/10"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-[#12121a] border-b border-[#6c63ff]/10 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] flex items-center justify-center">
                <FiCpu size={18} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">AI 智能助手</h4>
                <p className="text-[#888] text-xs">在线 · 随时为你解答</p>
              </div>
            </div>

            <div className="bg-[#0a0a0f] h-[340px] overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#6c63ff] text-white rounded-br-md'
                        : 'bg-[#1a1a2e] text-[#e0e0e0] border border-[#6c63ff]/10 rounded-bl-md'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-[#1a1a2e] border border-[#6c63ff]/10 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#6c63ff]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="bg-[#12121a] border-t border-[#6c63ff]/10 p-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入你的问题..."
                  className="flex-1 px-4 py-2.5 bg-[#0a0a0f] border border-[#6c63ff]/20 rounded-xl text-white text-sm placeholder-[#555] focus:outline-none focus:border-[#6c63ff]/50 transition-all"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-[#6c63ff] flex items-center justify-center text-white disabled:opacity-40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiSend size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}