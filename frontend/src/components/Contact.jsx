import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiUser, FiMessageSquare, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { messageApi } from '../api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', content: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await messageApi.create(form)
      setStatus('success')
      setForm({ name: '', email: '', content: '' })
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
    <section id="contact" className="section-container">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          联系 <span className="gradient-text">我</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] mx-auto rounded-full" />
        <p className="text-[#888] mt-6 max-w-lg mx-auto">
          有任何问题或合作意向？欢迎留言，我会尽快回复你！
        </p>
      </motion.div>

      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#888] mb-2">
                姓名
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6c63ff]" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="你的名字"
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f]/50 border border-[#6c63ff]/20 rounded-xl text-white placeholder-[#555] focus:outline-none focus:border-[#6c63ff]/60 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#888] mb-2">
                邮箱
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6c63ff]" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f]/50 border border-[#6c63ff]/20 rounded-xl text-white placeholder-[#555] focus:outline-none focus:border-[#6c63ff]/60 transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#888] mb-2">
              留言内容
            </label>
            <div className="relative">
              <FiMessageSquare className="absolute left-4 top-4 text-[#6c63ff]" />
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={5}
                placeholder="写下你想说的..."
                className="w-full pl-12 pr-4 py-3 bg-[#0a0a0f]/50 border border-[#6c63ff]/20 rounded-xl text-white placeholder-[#555] focus:outline-none focus:border-[#6c63ff]/60 transition-all resize-none"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            className="glow-button w-full flex items-center justify-center gap-2 text-base disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === 'sending' && (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                发送中...
              </>
            )}
            {status === 'idle' && (
              <>
                <FiSend size={18} />
                发送留言
              </>
            )}
            {status === 'success' && (
              <>
                <FiCheck size={18} />
                发送成功！
              </>
            )}
            {status === 'error' && (
              <>
                <FiAlertCircle size={18} />
                发送失败，请重试
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  )
}