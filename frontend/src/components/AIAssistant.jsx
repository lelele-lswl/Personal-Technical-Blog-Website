import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend, FiCpu, FiZap, FiStar, FiHeart, FiCode } from 'react-icons/fi'
import { aiApi } from '../api'

const BUBBLE_MESSAGES = [
  '👋 嗨！有什么想了解的吗？点击我',
  '💡 想知道博主的技术栈？点我聊聊！',
  '🤖 我是AI助手，随时为你解答~',
]

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [bubbleIndex, setBubbleIndex] = useState(0)
  const [showBubble, setShowBubble] = useState(true)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '你好！我是 LeLeLe 的 AI 智能助手 🤖\n\n我可以回答关于博主、技术栈、项目、技能等问题。试试点击下方的快捷问题，或者直接输入你想了解的内容吧！',
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const bubbleTimerRef = useRef(null)

  const startBubbleCycle = useCallback(() => {
    if (bubbleTimerRef.current) clearInterval(bubbleTimerRef.current)
    bubbleTimerRef.current = setInterval(() => {
      setBubbleIndex((prev) => (prev + 1) % BUBBLE_MESSAGES.length)
    }, 4000)
  }, [])

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setShowBubble(false)
      if (bubbleTimerRef.current) clearInterval(bubbleTimerRef.current)
    }, 15000)
    startBubbleCycle()
    return () => {
      clearTimeout(hideTimer)
      if (bubbleTimerRef.current) clearInterval(bubbleTimerRef.current)
    }
  }, [startBubbleCycle])

  const handleOpenChat = () => {
    setIsOpen(!isOpen)
    setShowBubble(false)
    if (bubbleTimerRef.current) clearInterval(bubbleTimerRef.current)
  }

  const quickQuestions = [
    { icon: FiZap, text: '介绍一下博主', question: '你是谁？' },
    { icon: FiCode, text: '技术栈是什么', question: '用什么技术' },
    { icon: FiStar, text: '展示的项目', question: '做了什么项目' },
    { icon: FiHeart, text: '如何联系', question: '怎么联系你' },
  ]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text) => {
    const messageText = text || input
    if (!messageText.trim() || isTyping) return

    const userMessage = { role: 'user', content: messageText.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const response = await aiApi.chat(messageText.trim())
      if (response.data && response.data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: response.data.reply }])
      } else {
        throw new Error('无效的响应')
      }
    } catch (error) {
      console.error('AI调用失败:', error)
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: '😅 AI服务暂时不可用，请稍后再试~\n\n可能原因：\n• 后端服务未启动\n• MySQL数据库未连接\n• 网络问题\n\n你可以通过页面底部的联系表单留言给 LeLeLe！'
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatMessage = (content) => {
    if (!content || typeof content !== 'string') {
      return <span>消息加载失败...</span>
    }
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    ))
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
        <AnimatePresence mode="wait">
          {showBubble && !isOpen && (
            <motion.div
              key={BUBBLE_MESSAGES[bubbleIndex]}
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={handleOpenChat}
              className="cursor-pointer bg-[#1a1a2e] border border-[#6c63ff]/30 px-4 py-2.5 rounded-2xl rounded-br-md text-sm text-[#e0e0e0] whitespace-nowrap shadow-lg shadow-[#6c63ff]/10 max-w-[220px]"
            >
              {BUBBLE_MESSAGES[bubbleIndex]}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          {!isOpen && showBubble && (
            <motion.span
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00d4ff]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          <motion.button
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] flex items-center justify-center text-white shadow-lg shadow-[#6c63ff]/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpenChat}
            animate={!isOpen && showBubble ? {
              boxShadow: [
                '0 0 0 0 rgba(108,99,255,0.4)',
                '0 0 0 12px rgba(108,99,255,0)',
              ],
            } : {}}
            transition={!isOpen && showBubble ? {
              duration: 1.5,
              repeat: Infinity,
            } : {}}
          >
            {isOpen ? <FiX size={24} /> : <FiMessageCircle size={24} />}
          </motion.button>
        </div>
      </div>

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
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#6c63ff] text-white rounded-br-md'
                        : 'bg-[#1a1a2e] text-[#e0e0e0] border border-[#6c63ff]/10 rounded-bl-md'
                    }`}
                  >
                    {formatMessage(msg.content)}
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

              {messages.length <= 1 && (
                <motion.div
                  className="mt-4 space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xs text-[#888] mb-2 px-1">👆 快捷提问：</p>
                  {quickQuestions.map(({ icon: Icon, text, question }, index) => (
                    <motion.button
                      key={text}
                      onClick={() => handleSend(question)}
                      className="w-full flex items-center gap-2 px-3 py-2 bg-[#6c63ff]/5 hover:bg-[#6c63ff]/10 border border-[#6c63ff]/20 hover:border-[#6c63ff]/40 rounded-xl text-left text-sm text-[#00d4ff] transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Icon size={14} className="text-[#6c63ff]" />
                      <span>{text}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>

            <div className="bg-[#12121a] border-t border-[#6c63ff]/10 p-3">
              <p className="text-xs text-[#666] mb-2 px-1">💡 输入"帮助"查看更多可问的问题</p>
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
                  onClick={() => handleSend()}
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