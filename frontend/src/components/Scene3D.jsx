import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function createParticleGeometry(count, spread) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread
    pos[i * 3 + 2] = (Math.random() - 0.5) * (spread * 0.5)
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return geo
}

function createLineGeometry(lineCount, spread) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(lineCount * 6)
  for (let i = 0; i < lineCount; i++) {
    pos[i * 6] = (Math.random() - 0.5) * spread
    pos[i * 6 + 1] = (Math.random() - 0.5) * spread
    pos[i * 6 + 2] = (Math.random() - 0.5) * (spread * 0.3)
    pos[i * 6 + 3] = pos[i * 6] + (Math.random() - 0.5) * 2
    pos[i * 6 + 4] = pos[i * 6 + 1] + (Math.random() - 0.5) * 2
    pos[i * 6 + 5] = pos[i * 6 + 2] + (Math.random() - 0.5) * 1
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

    scene.add(new THREE.AmbientLight(0xffffff, 0.4))

    const light1 = new THREE.PointLight(0x6c63ff, 1.2, 100)
    light1.position.set(10, 10, 10)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x00d4ff, 0.8, 100)
    light2.position.set(-10, -8, -8)
    scene.add(light2)

    const light3 = new THREE.PointLight(0xff6b9d, 0.5, 80)
    light3.position.set(0, -10, 5)
    scene.add(light3)

    const mainParticlesGeo = createParticleGeometry(2000, 20)
    const mainParticlesMat = new THREE.PointsMaterial({
      color: 0x6c63ff,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const mainParticles = new THREE.Points(mainParticlesGeo, mainParticlesMat)
    scene.add(mainParticles)

    const secondaryParticlesGeo = createParticleGeometry(1500, 25)
    const secondaryParticlesMat = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const secondaryParticles = new THREE.Points(secondaryParticlesGeo, secondaryParticlesMat)
    scene.add(secondaryParticles)

    const starGeo = createParticleGeometry(500, 30)
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.01,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
      depthWrite: false,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1)
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x6c63ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      emissive: 0x6c63ff,
      emissiveIntensity: 0.15,
    })
    const icoMesh = new THREE.Mesh(icoGeo, icoMat)
    icoMesh.position.set(3.5, 0.5, -2)
    scene.add(icoMesh)

    const octaGeo = new THREE.OctahedronGeometry(1, 0)
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.12,
    })
    const octaMesh = new THREE.Mesh(octaGeo, octaMat)
    octaMesh.position.set(-3.5, 2, -3)
    scene.add(octaMesh)

    const torusGeo = new THREE.TorusGeometry(0.7, 0.08, 16, 50)
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0xff6b9d,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      emissive: 0xff6b9d,
      emissiveIntensity: 0.1,
    })
    const torusMesh = new THREE.Mesh(torusGeo, torusMat)
    torusMesh.position.set(0, -2.5, -1)
    scene.add(torusMesh)

    const dodecaGeo = new THREE.DodecahedronGeometry(0.6, 0)
    const dodecaMat = new THREE.MeshStandardMaterial({
      color: 0xaa66ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })
    const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat)
    dodecaMesh.position.set(4, -1.5, 1)
    scene.add(dodecaMesh)

    const lineGeo = createLineGeometry(20, 12)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.08 })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    const lineGeo2 = createLineGeometry(12, 16)
    const lineMat2 = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.06 })
    const lines2 = new THREE.LineSegments(lineGeo2, lineMat2)
    lines2.rotation.x = Math.PI / 4
    scene.add(lines2)

    let animId
    const clock = new THREE.Clock()

    function animate() {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      mainParticles.rotation.x = Math.sin(elapsed * 0.08) * 0.15
      mainParticles.rotation.y = elapsed * 0.04

      secondaryParticles.rotation.x = Math.cos(elapsed * 0.06) * 0.2
      secondaryParticles.rotation.y = -elapsed * 0.03
      secondaryParticles.rotation.z = elapsed * 0.02

      stars.rotation.y = elapsed * 0.01

      icoMesh.rotation.x = elapsed * 0.25
      icoMesh.rotation.y = elapsed * 0.18
      icoMesh.position.y = Math.sin(elapsed * 0.45) * 0.35
      icoMesh.position.z = -2 + Math.cos(elapsed * 0.3) * 0.3

      octaMesh.rotation.x = -elapsed * 0.18
      octaMesh.rotation.z = elapsed * 0.12
      octaMesh.position.y = 2 + Math.cos(elapsed * 0.38) * 0.25
      octaMesh.position.x = -3.5 + Math.sin(elapsed * 0.22) * 0.2

      torusMesh.rotation.x = elapsed * 0.3
      torusMesh.rotation.y = elapsed * 0.2
      torusMesh.position.y = -2.5 + Math.sin(elapsed * 0.55) * 0.3

      dodecaMesh.rotation.x = elapsed * 0.15
      dodecaMesh.rotation.y = elapsed * 0.22
      dodecaMesh.position.y = -1.5 + Math.cos(elapsed * 0.42) * 0.2

      lines.rotation.y = elapsed * 0.025
      lines.rotation.z = Math.sin(elapsed * 0.05) * 0.1

      lines2.rotation.y = -elapsed * 0.018
      lines2.rotation.x = Math.PI / 4 + Math.cos(elapsed * 0.04) * 0.08

      light1.position.x = 10 * Math.cos(elapsed * 0.2)
      light1.position.z = 10 * Math.sin(elapsed * 0.2)

      light2.position.x = -10 * Math.cos(elapsed * 0.15)
      light2.position.y = -8 + Math.sin(elapsed * 0.25) * 3

      camera.position.x = Math.sin(elapsed * 0.08) * 0.3
      camera.position.y = Math.cos(elapsed * 0.06) * 0.2
      camera.lookAt(0, 0, 0)

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
      mainParticlesGeo.dispose()
      mainParticlesMat.dispose()
      secondaryParticlesGeo.dispose()
      secondaryParticlesMat.dispose()
      starGeo.dispose()
      starMat.dispose()
      icoGeo.dispose()
      icoMat.dispose()
      octaGeo.dispose()
      octaMat.dispose()
      torusGeo.dispose()
      torusMat.dispose()
      dodecaGeo.dispose()
      dodecaMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
      lineGeo2.dispose()
      lineMat2.dispose()
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