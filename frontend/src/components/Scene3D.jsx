import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function ParticleField() {
  const ref = useRef()
  const count = 3000

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#6c63ff"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef()
  const wireframeRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -state.clock.elapsedTime * 0.2
      wireframeRef.current.rotation.z = state.clock.elapsedTime * 0.15
      wireframeRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.2 + 1.5
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={[3, 0, -2]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#6c63ff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={wireframeRef} position={[-3, 1.5, -3]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </>
  )
}

function ConnectionLines() {
  const ref = useRef()
  const lineCount = 15

  const positions = useMemo(() => {
    const pos = new Float32Array(lineCount * 6)
    for (let i = 0; i < lineCount; i++) {
      pos[i * 6] = (Math.random() - 0.5) * 10
      pos[i * 6 + 1] = (Math.random() - 0.5) * 10
      pos[i * 6 + 2] = (Math.random() - 0.5) * 5
      pos[i * 6 + 3] = pos[i * 6] + (Math.random() - 0.5) * 3
      pos[i * 6 + 4] = pos[i * 6 + 1] + (Math.random() - 0.5) * 3
      pos[i * 6 + 5] = pos[i * 6 + 2] + (Math.random() - 0.5) * 2
    }
    return pos
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.03
    }
  })

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={lineCount * 2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#6c63ff" transparent opacity={0.1} />
    </lineSegments>
  )
}

export default function Scene3D({ className }) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#6c63ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#00d4ff" />
        <ParticleField />
        <FloatingGeometry />
        <ConnectionLines />
      </Canvas>
    </div>
  )
}