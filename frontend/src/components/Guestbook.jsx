import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiUser, FiMessageSquare, FiCheck, FiAlertCircle, FiClock, FiMessageCircle, FiChevronDown } from 'react-icons/fi'
import { messageApi } from '../api'

function MessageCard({ message, index }) {
  const colors = [
    'from-[#6c63ff]/20 to-[#00d4ff]/10',
    'from-[#00d4ff]/20 to-[#6c63ff]/10',
    'from-[#ff6b9d]/20 to-[#6c63ff]/10',
    'from-[#6c63ff]/20 to-[#ff6b9d]/10',
  ]

  const avatarColors = [
    'from-[#6c63ff] to-[#8b83ff]',
    'from-[#00d4ff] to-[#00a8cc]',
    'from-[#ff6b9d] to-[#ff4785]',
    'from-[#8b83ff] to-[#6c63ff]',
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} backdrop-blur-sm border border-[#6c63ff]/10 p-5 hover:border-[#6c63ff]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#6c63ff]/10`}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
          {message.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold text-white text-sm">{message.name}</span>
            <span className="text-[#555] text-xs flex items-center gap-1">
              <FiClock size={10} />
              {new Date(message.createdAt).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <p className="text-[#bbb] text-sm leading-relaxed break-words">{message.content}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Guestbook() {
  const [messages, setMessages] = useState([])
  const [form, setForm] = useState({ name: '', content: '' })
  const [status, setStatus] = useState('idle')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await messageApi.getAll()
      setMessages(res.data)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await messageApi.create(form)
      setStatus('success')
      setForm({ name: '', content: '' })
      fetchMessages()
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="guestbook" className="section-container">
      <div>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            留言 <span className="gradient-text">板</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] mx-auto rounded-full" />
          <p className="text-[#888] mt-6">
            ✨ 路过留个脚印吧，期待与你的交流~
          </p>
        </motion.div>

        <div className="text-center mb-8">
          <motion.button
            onClick={() => {
              setShowForm(!showForm)
              setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
            }}
            className="glow-button inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMessageCircle size={18} />
            {showForm ? '收起留言框' : '写留言'}
            <motion.span
              animate={{ rotate: showForm ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown size={16} />
            </motion.span>
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
                <div className="group">
                  <label className="block text-xs font-medium text-[#6c63ff] mb-2 uppercase tracking-wider flex items-center justify-center gap-2">
                    <FiUser size={14} />
                    姓名
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="你的名字"
                    className="w-full px-4 py-3.5 bg-[#0a0a0f]/60 border border-[#6c63ff]/15 rounded-xl text-white placeholder-[#555] focus:outline-none focus:border-[#6c63ff]/50 focus:bg-[#0a0a0f]/80 transition-all duration-300"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-medium text-[#6c63ff] mb-2 uppercase tracking-wider flex items-center justify-center gap-2">
                    <FiMessageSquare size={14} />
                    留言内容
                  </label>
                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="写下你想说的..."
                    className="w-full px-4 py-3.5 bg-[#0a0a0f]/60 border border-[#6c63ff]/15 rounded-xl text-white placeholder-[#555] focus:outline-none focus:border-[#6c63ff]/50 focus:bg-[#0a0a0f]/80 transition-all duration-300 resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="glow-button w-full flex items-center justify-center gap-2 text-sm disabled:opacity-50 py-3.5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'sending' && (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      发送中...
                    </>
                  )}
                  {status === 'idle' && (
                    <>
                      <FiSend size={16} />
                      发送留言
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <FiCheck size={16} />
                      发送成功！
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      <FiAlertCircle size={16} />
                      发送失败，请重试
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-6 flex items-center justify-center gap-3">
          <FiMessageCircle className="text-[#6c63ff]" size={20} />
          <span className="text-[#888] text-sm">
            共 <span className="text-white font-semibold">{messages.length}</span> 条留言
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#6c63ff]/30 border-t-[#6c63ff] rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-5xl mb-4">📝</div>
            <p className="text-[#555]">还没有留言，来做第一个吧~</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <MessageCard key={msg.id} message={msg} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}