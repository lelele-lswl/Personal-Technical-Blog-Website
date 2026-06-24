import { motion } from 'framer-motion'
import { FiGithub, FiHeart } from 'react-icons/fi'
import { SiBilibili } from 'react-icons/si'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[#6c63ff]/10 bg-[#0a0a0f]/80">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">{"LeLeLe's blog"}</h3>
            <p className="text-[#888] text-sm leading-relaxed">
              🚀 热爱全栈开发，专注于构建优雅的Web应用。分享技术心得，记录成长历程。保持好奇，持续学习！
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">快速导航</h4>
            <div className="space-y-2">
              {['首页', '关于', '技能', '项目', '留言板'].map((item) => (
                <a
                  key={item}
                  href={`#${item === '首页' ? 'hero' : item === '留言板' ? 'guestbook' : item === '技能' ? 'skills' : item === '项目' ? 'projects' : 'about'}`}
                  className="block text-[#888] text-sm hover:text-[#6c63ff] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">社交媒体</h4>
            <div className="flex gap-3">
              {[
                { icon: FiGithub, href: 'https://github.com/lelele-lswl', label: 'GitHub' },
                { icon: SiBilibili, href: 'https://space.bilibili.com/493506164', label: 'Bilibili' },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg border border-[#6c63ff]/20 flex items-center justify-center text-[#888] hover:text-white hover:border-[#6c63ff]/60 hover:bg-[#6c63ff]/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#6c63ff]/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#888] text-sm">
            © {currentYear} LeLeLe. All rights reserved.
          </p>
          <p className="text-[#888] text-sm flex items-center gap-1">
            Made with <FiHeart className="text-[#ff6b9d]" size={14} /> using React & Spring Boot | © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}