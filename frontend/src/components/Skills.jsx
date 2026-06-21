import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { DEFAULT_SKILLS } from '../constants'

const CATEGORY_COLORS = {
  Frontend: '#6c63ff',
  Backend: '#00d4ff',
  DevOps: '#ff6b9d',
}

const CATEGORY_LABELS = {
  Frontend: '前端',
  Backend: '后端',
  DevOps: '运维',
}

function RadarChart({ skills }) {
  const canvasRef = useRef(null)
  const animRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const size = Math.min(canvas.parentElement.offsetWidth, 500)
    canvas.width = size
    canvas.height = size
    const cx = size / 2
    const cy = size / 2
    const maxR = size * 0.38

    const categories = Object.keys(skills)
    const allSkills = categories.flatMap((c) => skills[c])
    const totalAxes = allSkills.length
    if (totalAxes === 0) return

    let progress = 0
    const animate = () => {
      progress = Math.min(progress + 0.02, 1)
      ctx.clearRect(0, 0, size, size)

      for (let ring = 1; ring <= 5; ring++) {
        const r = (maxR * ring) / 5
        ctx.beginPath()
        for (let i = 0; i < totalAxes; i++) {
          const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.strokeStyle = `rgba(108, 99, 255, ${0.08 + ring * 0.02})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      for (let i = 0; i < totalAxes; i++) {
        const angle = (Math.PI * 2 * i) / totalAxes - Math.PI / 2
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + maxR * Math.cos(angle), cy + maxR * Math.sin(angle))
        ctx.strokeStyle = 'rgba(108, 99, 255, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      categories.forEach((category) => {
        const catSkills = skills[category]
        const color = CATEGORY_COLORS[category] || '#6c63ff'
        const startIdx = categories.slice(0, categories.indexOf(category)).reduce((acc, c) => acc + skills[c].length, 0)

        ctx.beginPath()
        catSkills.forEach((skill, i) => {
          const idx = startIdx + i
          const angle = (Math.PI * 2 * idx) / totalAxes - Math.PI / 2
          const r = (maxR * skill.level * progress) / 100
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.closePath()

        const r = parseInt(color.slice(1, 3), 16)
        const g = parseInt(color.slice(3, 5), 16)
        const b = parseInt(color.slice(5, 7), 16)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.12)`
        ctx.fill()
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()

        catSkills.forEach((skill, i) => {
          const idx = startIdx + i
          const angle = (Math.PI * 2 * idx) / totalAxes - Math.PI / 2
          const r = (maxR * skill.level * progress) / 100
          const x = cx + r * Math.cos(angle)
          const y = cy + r * Math.sin(angle)

          ctx.beginPath()
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()

          const labelR = maxR + 20
          const lx = cx + labelR * Math.cos(angle)
          const ly = cy + labelR * Math.sin(angle)
          ctx.fillStyle = '#888'
          ctx.font = `${size < 400 ? 9 : 11}px Inter, sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(skill.name, lx, ly)
        })
      })

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      }
    }
    animate()

    return () => cancelAnimationFrame(animRef.current)
  }, [skills])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  )
}

function SkillBar({ skill, index }) {
  const color = CATEGORY_COLORS[skill.category] || '#6c63ff'

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-white">{skill.name}</span>
        <span className="text-xs text-[#888]">{skill.level}%</span>
      </div>
      <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [viewMode, setViewMode] = useState('radar')
  const [skills, setSkills] = useState({})

  useEffect(() => {
    const grouped = {}
    DEFAULT_SKILLS.forEach((skill) => {
      if (!grouped[skill.category]) grouped[skill.category] = []
      grouped[skill.category].push(skill)
    })
    setSkills(grouped)
  }, [])

  return (
    <section id="skills" className="section-container">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          技术 <span className="gradient-text">技能</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#6c63ff] to-[#00d4ff] mx-auto rounded-full" />
      </motion.div>

      <div className="flex justify-center gap-3 mb-12">
        {[
          { mode: 'radar', label: '雷达图' },
          { mode: 'bars', label: '进度条' },
        ].map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              viewMode === mode
                ? 'bg-[#6c63ff] text-white'
                : 'bg-[#1a1a2e]/50 text-[#888] border border-[#6c63ff]/20 hover:border-[#6c63ff]/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-6 mb-8">
        {Object.keys(CATEGORY_COLORS).map((cat) => (
          <div key={cat} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[cat] }}
            />
            <span className="text-sm text-[#888]">{CATEGORY_LABELS[cat] || cat}</span>
          </div>
        ))}
      </div>

      {viewMode === 'radar' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8"
        >
          <RadarChart skills={skills} />
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, catSkills]) => (
            <motion.div
              key={category}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-2 h-8 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[category] }}
                />
                <h3 className="text-lg font-bold text-white">
                  {CATEGORY_LABELS[category] || category}
                </h3>
              </div>
              {catSkills.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}