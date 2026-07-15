import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function heartPoint(t: number, scale: number, z: number) {
  const x = 16 * Math.pow(Math.sin(t), 3)
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
  return new THREE.Vector3(x * scale, y * scale, z)
}

function NetworkHeart() {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  const { lineGeometry, nodeGeometry } = useMemo(() => {
    const segments: number[] = []
    const colors: number[] = []
    const nodes: number[] = []
    const palette = ['#F28CB1', '#F5C84C', '#48C9B0', '#8B6FE8'].map((color) => new THREE.Color(color))
    const rings = 7
    const count = 42
    for (let ring = 1; ring <= rings; ring++) {
      const scale = 0.025 + ring * 0.009
      const z = (ring - rings / 2) * 0.06
      for (let index = 0; index < count; index++) {
        const t1 = (index / count) * Math.PI * 2
        const t2 = ((index + 1) / count) * Math.PI * 2
        const p1 = heartPoint(t1, scale, z + Math.sin(t1 * 3) * 0.035)
        const p2 = heartPoint(t2, scale, z + Math.sin(t2 * 3) * 0.035)
        segments.push(...p1.toArray(), ...p2.toArray())
        const color = palette[Math.floor((index / count) * palette.length) % palette.length]
        colors.push(...color.toArray(), ...color.toArray())
        if (index % 6 === 0) nodes.push(...p1.toArray())
      }
    }
    for (let index = 0; index < count; index += 3) {
      const t = (index / count) * Math.PI * 2
      const a = heartPoint(t, 0.034, -0.15)
      const b = heartPoint(t + 0.42, 0.087, 0.16)
      segments.push(...a.toArray(), ...b.toArray())
      const c = palette[index % palette.length]
      colors.push(...c.toArray(), ...c.toArray())
    }
    const line = new THREE.BufferGeometry()
    line.setAttribute('position', new THREE.Float32BufferAttribute(segments, 3))
    line.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    const node = new THREE.BufferGeometry()
    node.setAttribute('position', new THREE.Float32BufferAttribute(nodes, 3))
    return { lineGeometry: line, nodeGeometry: node }
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * 0.35, 3.4, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.y * 0.18, 3.4, delta)
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.45) * 0.035
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.035
  })

  return (
    <group ref={group} scale={2.65} rotation={[0, -0.18, 0]}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.82} />
      </lineSegments>
      <points geometry={nodeGeometry}>
        <pointsMaterial color="#ffffff" size={0.038} sizeAttenuation />
      </points>
    </group>
  )
}

function ClayPebbles() {
  return (
    <group>
      <mesh position={[1.75, 1.2, -0.5]} scale={[0.3, 0.22, 0.26]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#F5C84C" roughness={0.85} />
      </mesh>
      <mesh position={[-1.7, -1.1, -0.3]} scale={[0.18, 0.28, 0.22]} rotation={[0.2, 0, 0.4]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#F28CB1" roughness={0.82} />
      </mesh>
      <mesh position={[1.5, -1.45, 0.1]} scale={[0.16, 0.16, 0.16]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#48C9B0" roughness={0.85} />
      </mesh>
    </group>
  )
}

export function HeartScene() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 4.2], fov: 42 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={2.1} />
      <directionalLight position={[3, 5, 4]} intensity={3} />
      <NetworkHeart />
      <ClayPebbles />
    </Canvas>
  )
}
