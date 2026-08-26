import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron } from '@react-three/drei';

function AcademicGeometry() {
  const outerRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.y += delta * 0.3;
      outerRef.current.rotation.x += delta * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.4;
    }
  });

  return (
    <group>
      <Icosahedron ref={outerRef} args={[1.2, 0]}>
        <meshStandardMaterial
          color="#8b5cf6"
          wireframe
          transparent
          opacity={0.6}
          emissive="#6366f1"
          emissiveIntensity={0.4}
        />
      </Icosahedron>

      <Octahedron ref={innerRef} args={[0.7, 0]}>
        <meshStandardMaterial
          color="#06b6d4"
          roughness={0.2}
          metalness={0.9}
          emissive="#0284c7"
          emissiveIntensity={0.5}
        />
      </Octahedron>
    </group>
  );
}

export default function Education3DVisual() {
  return (
    <div className="w-full h-[180px] sm:h-[220px] relative flex items-center justify-center">
      <div className="absolute inset-0 bg-violet-500/10 rounded-full filter blur-xl opacity-40" />
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-5, -5, -2]} intensity={0.8} color="#06b6d4" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.7}>
          <AcademicGeometry />
        </Float>
      </Canvas>
    </div>
  );
}
