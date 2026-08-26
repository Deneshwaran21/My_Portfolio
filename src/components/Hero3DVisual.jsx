import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function NeuralNetworkCore({ mouse }) {
  const meshRef = useRef();
  const nodesRef = useRef();
  const linesRef = useRef();

  // Generate node positions for a neural network sphere
  const { positions, lineGeometry } = useMemo(() => {
    const count = 35;
    const pos = new Float32Array(count * 3);
    const linePositions = [];

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.8 + Math.random() * 0.4;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }

    // Connect nearby nodes with lines
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 1.6) {
          linePositions.push(
            pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
            pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
          );
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    return { positions: pos, lineGeometry: geometry };
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;

      // Mouse responsive parallax
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;
      meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central AI glowing organic core */}
      <Sphere args={[1.1, 32, 32]} scale={1}>
        <MeshDistortMaterial
          color="#06b6d4"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2}
          wireframe={false}
        />
      </Sphere>

      {/* Wireframe outer shell */}
      <Sphere args={[1.9, 16, 16]}>
        <meshStandardMaterial
          color="#3b82f6"
          wireframe
          transparent
          opacity={0.25}
        />
      </Sphere>

      {/* Neural Network Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#38bdf8"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Connected Neural Pathways */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

export default function Hero3DVisual() {
  return (
    <div className="w-full h-[320px] sm:h-[400px] md:h-[480px] relative flex items-center justify-center">
      {/* Glow background backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-violet-500/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow" />
      
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#06b6d4" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <NeuralNetworkCore />
        </Float>
      </Canvas>

      {/* Subtle indicator overlay */}
      <div className="absolute bottom-2 text-center pointer-events-none">
        <span className="text-[11px] font-mono text-cyan-400/60 bg-slate-900/60 px-3 py-1 rounded-full border border-cyan-500/20 backdrop-blur-sm">
          Interactive AI Neural Sphere • Move Cursor
        </span>
      </div>
    </div>
  );
}
