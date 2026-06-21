import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiGithub, FiLinkedin, FiMail, FiChevronDown } from 'react-icons/fi'
import Scene3D from './Scene3D'

export default function Hero() {
  const titles = [
    'Full Stack Developer',
    2000,
    'Frontend Engineer',
    2000,
    'Backend Developer',
    2000,
    'Creative Coder',
    2000,
  ]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Scene3D className="hero-3d" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f] z-[1]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="inline-block mb-6 px-5 py-2 rounded-full border border-[#6c63ff]/30 bg-[#6c63ff]/10 text-[#6c63ff] text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            ✨ Welcome to my world
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-white">Hi, I'm </span>
          <span className="gradient-text">LeLeLe</span>
        </motion.h1>

        <motion.div
          className="text-xl md:text-2xl text-[#888] mb-8 h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <TypeAnimation
            sequence={titles}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-[#00d4ff]"
          />
        </motion.div>

        <motion.p
          className="text-lg text-[#888] max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          用代码构建数字世界，以创意点亮技术之美
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.a
            href="#projects"
            className="glow-button text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            查看作品
          </motion.a>
          <motion.a
            href="#contact"
            className="px-8 py-3 rounded-full border border-[#6c63ff]/40 text-white font-semibold hover:bg-[#6c63ff]/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            联系我
          </motion.a>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
            { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
            { icon: FiMail, href: 'mailto:hello@example.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-[#6c63ff]/20 flex items-center justify-center text-[#888] hover:text-white hover:border-[#6c63ff]/60 hover:bg-[#6c63ff]/10 transition-all"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about" className="text-[#888] hover:text-white transition-colors">
          <FiChevronDown size={28} />
        </a>
      </motion.div>
    </section>
  )
}