import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'

function createParticleGeometry(count) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 20
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20
    pos[i * 3 + 2] = (Math.random() - 0.5) * 20
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return geo
}

function createLineGeometry(lineCount) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(lineCount * 6)
  for (let i = 0; i < lineCount; i++) {
    pos[i * 6] = (Math.random() - 0.5) * 10
    pos[i * 6 + 1] = (Math.random() - 0.5) * 10
    pos[i * 6 + 2] = (Math.random() - 0.5) * 5
    pos[i * 6 + 3] = pos[i * 6] + (Math.random() - 0.5) * 3
    pos[i * 6 + 4] = pos[i * 6 + 1] + (Math.random() - 0.5) * 3
    pos[i * 6 + 5] = pos[i * 6 + 2] + (Math.random() - 0.5) * 2
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return geo
}

export default function Scene3D({ className }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 5

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    const light1 = new THREE.PointLight(0x6c63ff, 0.8, 100)
    light1.position.set(10, 10, 10)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x00d4ff, 0.4, 100)
    light2.position.set(-10, -10, -10)
    scene.add(light2)

    const particleGeo = createParticleGeometry(3000)
    const particleMat = new THREE.PointsMaterial({
      color: 0x6c63ff,
      size: 0.02,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    const icoGeo = new THREE.IcosahedronGeometry(1, 1)
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x6c63ff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    })
    const icoMesh = new THREE.Mesh(icoGeo, icoMat)
    icoMesh.position.set(3, 0, -2)
    scene.add(icoMesh)

    const octaGeo = new THREE.OctahedronGeometry(0.8, 0)
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    })
    const octaMesh = new THREE.Mesh(octaGeo, octaMat)
    octaMesh.position.set(-3, 1.5, -3)
    scene.add(octaMesh)

    const lineGeo = createLineGeometry(15)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.1 })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    let animId
    const clock = new THREE.Clock()

    function animate() {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      particles.rotation.x = Math.sin(elapsed * 0.1) * 0.2
      particles.rotation.y = elapsed * 0.05

      icoMesh.rotation.x = elapsed * 0.3
      icoMesh.rotation.y = elapsed * 0.2
      icoMesh.position.y = Math.sin(elapsed * 0.5) * 0.3

      octaMesh.rotation.x = -elapsed * 0.2
      octaMesh.rotation.z = elapsed * 0.15
      octaMesh.position.y = Math.cos(elapsed * 0.4) * 0.2 + 1.5

      lines.rotation.y = elapsed * 0.03

      renderer.render(scene, camera)
    }

    animate()

    function handleResize() {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      particleGeo.dispose()
      particleMat.dispose()
      icoGeo.dispose()
      icoMat.dispose()
      octaGeo.dispose()
      octaMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
    />
  )
}