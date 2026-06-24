import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiSend, FiMail, FiMapPin, FiGithub, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { SiBilibili } from 'react-icons/si'
import { DEFAULT_PROFILE } from '../constants'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', content: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
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

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: DEFAULT_PROFILE.email, href: `mailto:${DEFAULT_PROFILE.email}` },
    { icon: FiGithub, label: 'GitHub', value: 'lelele-lswl', href: DEFAULT_PROFILE.github },
    { icon: SiBilibili, label: 'Bilibili', value: '个人空间', href: DEFAULT_PROFILE.bilibili },
    { icon: FiMapPin, label: 'Location', value: DEFAULT_PROFILE.location, href: null },
  ]

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
          📬 随时欢迎联系，期待与你的合作与交流
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8">
        <motion.div
          className="lg:col-span-2 space-y-4"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="glass-card p-5 flex items-center gap-4 group cursor-pointer block"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6c63ff]/20 to-[#00d4ff]/10 flex items-center justify-center group-hover:from-[#6c63ff]/40 group-hover:to-[#00d4ff]/20 transition-all duration-300">
                    <item.icon className="text-[#6c63ff] group-hover:text-[#00d4ff] transition-colors" size={20} />
                  </div>
                  <div>
                    <div className="text-[#555] text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-white text-sm font-medium group-hover:text-[#00d4ff] transition-colors">{item.value}</div>
                  </div>
                </a>
              ) : (
                <div className="glass-card p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6c63ff]/20 to-[#00d4ff]/10 flex items-center justify-center">
                    <item.icon className="text-[#6c63ff]" size={20} />
                  </div>
                  <div>
                    <div className="text-[#555] text-xs uppercase tracking-wider mb-0.5">{item.label}</div>
                    <div className="text-white text-sm font-medium">{item.value}</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="group">
                <label className="block text-xs font-medium text-[#6c63ff] mb-2 uppercase tracking-wider">
                  姓名
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="你的名字"
                  className="w-full px-4 py-3.5 bg-[#0a0a0f]/60 border border-[#6c63ff]/15 rounded-xl text-white placeholder-[#444] focus:outline-none focus:border-[#6c63ff]/50 focus:bg-[#0a0a0f]/80 transition-all duration-300"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-medium text-[#6c63ff] mb-2 uppercase tracking-wider">
                  邮箱
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 bg-[#0a0a0f]/60 border border-[#6c63ff]/15 rounded-xl text-white placeholder-[#444] focus:outline-none focus:border-[#6c63ff]/50 focus:bg-[#0a0a0f]/80 transition-all duration-300"
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-xs font-medium text-[#6c63ff] mb-2 uppercase tracking-wider">
                内容
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={5}
                placeholder="写下你想说的..."
                className="w-full px-4 py-3.5 bg-[#0a0a0f]/60 border border-[#6c63ff]/15 rounded-xl text-white placeholder-[#444] focus:outline-none focus:border-[#6c63ff]/50 focus:bg-[#0a0a0f]/80 transition-all duration-300 resize-none"
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
                  发送消息
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
      </div>
    </section>
  )
}