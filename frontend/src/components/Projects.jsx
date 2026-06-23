import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi'
import { DEFAULT_PROJECTS } from '../constants'

const techColors = {
  React: '#61dafb',
  'Vue.js': '#42b883',
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  'Spring Boot': '#6db33f',
  'Node.js': '#339933',
  Python: '#3776ab',
  MySQL: '#4479a1',
  Docker: '#2496ed',
  MongoDB: '#47a248',
  Three: '#ffffff',
  TailwindCSS: '#06b6d4',
  ECharts: '#e43961',
  Redis: '#dc382d',
  RabbitMQ: '#ff6600',
  WebSocket: '#ffffff',
  'Socket.io': '#010101',
  'OpenAI': '#412991',
  Kubernetes: '#326ce5',
  'Spring Cloud': '#6db33f',
  'Nginx': '#009639',
}

function getTechColor(tech) {
  const trimmed = tech.trim()
  for (const [key, color] of Object.entries(techColors)) {
    if (trimmed.toLowerCase().includes(key.toLowerCase())) return color
  }
  return '#6c63ff'
}

export default function Projects() {
  const [projects] = useState(DEFAULT_PROJECTS)
  const [hoveredId, setHoveredId] = useState(null)
  const [imgErrors, setImgErrors] = useState({})

  return (
    <section id="projects" className="section-container">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          项目 <span className="gradient-text">作品</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] mx-auto rounded-full" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="glass-card overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredId(index)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative h-48 bg-gradient-to-br from-[#1a1a2e] to-[#12121a] overflow-hidden flex items-center justify-center">
              {imgErrors[index] ? (
                <motion.div
                  animate={{
                    rotate: hoveredId === index ? 360 : 0,
                    scale: hoveredId === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 8, ease: 'linear' }}
                >
                  <FiFolder size={60} className="text-[#6c63ff]/20" />
                </motion.div>
              ) : (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  onError={() => setImgErrors((prev) => ({ ...prev, [index]: true }))}
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

              <AnimatePresence>
                {hoveredId === index && (
                  <motion.div
                    className="absolute inset-0 bg-[#0a0a0f]/60 backdrop-blur-sm flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiGithub size={20} />
                      </motion.a>
                    )}
                    {project.previewUrl && (
                      <motion.a
                        href={project.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiExternalLink size={20} />
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#6c63ff] transition-colors">
                {project.title}
              </h3>
              <p className="text-[#888] text-sm leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.split(',').map((tech) => (
                  <span
                    key={tech.trim()}
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      color: getTechColor(tech),
                      borderColor: `${getTechColor(tech)}33`,
                      backgroundColor: `${getTechColor(tech)}0d`,
                    }}
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}