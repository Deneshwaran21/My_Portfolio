import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, Torus } from '@react-three/drei';

function DataLattice() {
  const groupRef = useRef();
  const torusRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.x += delta * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.rotation.z -= delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Torus Data Ring */}
      <Torus ref={torusRef} args={[1.5, 0.04, 16, 64]}>
        <meshStandardMaterial
          color="#06b6d4"
          wireframe
          emissive="#0284c7"
          emissiveIntensity={0.5}
        />
      </Torus>

      {/* Central Floating Data Cube */}
      <Box args={[1.1, 1.1, 1.1]}>
        <meshStandardMaterial
          color="#1e293b"
          wireframe
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          roughness={0.3}
        />
      </Box>

      {/* Small corner data accent nodes */}
      {[
        [-0.8, -0.8, -0.8],
        [0.8, 0.8, 0.8],
        [-0.8, 0.8, -0.8],
        [0.8, -0.8, 0.8],
      ].map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
}

export default function About3DVisual() {
  return (
    <div className="w-full h-[260px] sm:h-[300px] relative flex items-center justify-center">
      <div className="absolute inset-0 bg-cyan-500/10 rounded-full filter blur-2xl opacity-40" />
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <DataLattice />
        </Float>
      </Canvas>
    </div>
  );
}
