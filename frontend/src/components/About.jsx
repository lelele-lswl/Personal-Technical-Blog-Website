import { motion } from 'framer-motion'
import { FiMapPin, FiMail, FiGithub, FiCode } from 'react-icons/fi'
import { DEFAULT_PROFILE } from '../constants'

const stats = [
  { label: '年经验', value: '1' },
  { label: '项目完成', value: '10+' },
  { label: '技术栈', value: '20+' },
  { label: '开源贡献', value: '5+' },
]

export default function About() {
  const profile = DEFAULT_PROFILE

  return (
    <section id="about" className="section-container">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          关于 <span className="gradient-text">我</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative w-72 h-72 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6c63ff] to-[#00d4ff] opacity-20 blur-2xl" />
            <div className="relative w-full h-full rounded-full border-2 border-[#6c63ff]/30 overflow-hidden bg-[#1a1a2e] flex items-center justify-center">
              <FiCode size={80} className="text-[#6c63ff]/50" />
            </div>
            <motion.div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-[#6c63ff]/10 border border-[#6c63ff]/20 flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="text-2xl">🚀</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-4 w-16 h-16 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-xl">💡</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">{profile.name}</h3>
          <p className="text-[#00d4ff] font-medium mb-4">{profile.title}</p>
          <p className="text-[#888] leading-relaxed mb-6">{profile.bio}</p>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-[#888]">
              <FiMapPin className="text-[#6c63ff]" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-3 text-[#888]">
              <FiMail className="text-[#6c63ff]" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-[#888]">
              <FiGithub className="text-[#6c63ff]" />
              <span>{profile.github}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-3 rounded-xl bg-[#1a1a2e]/50 border border-[#6c63ff]/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              >
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-[#888] mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}