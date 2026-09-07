import React, { useRef, useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sphere, Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 40 Major World Countries dataset
const WORLD_COUNTRIES = [
  { name: "India", flag: "🇮🇳", code: "IN", lat: 20.5937, lng: 78.9629 },
  { name: "United States", flag: "🇺🇸", code: "US", lat: 37.0902, lng: -95.7129 },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB", lat: 55.3781, lng: -3.4360 },
  { name: "Germany", flag: "🇩🇪", code: "DE", lat: 51.1657, lng: 10.4515 },
  { name: "France", flag: "🇫🇷", code: "FR", lat: 46.2276, lng: 2.2137 },
  { name: "Japan", flag: "🇯🇵", code: "JP", lat: 36.2048, lng: 138.2529 },
  { name: "Australia", flag: "🇦🇺", code: "AU", lat: -25.2744, lng: 133.7751 },
  { name: "Brazil", flag: "🇧🇷", code: "BR", lat: -14.2350, lng: -51.9253 },
  { name: "Canada", flag: "🇨🇦", code: "CA", lat: 56.1304, lng: -106.3468 },
  { name: "China", flag: "🇨🇳", code: "CN", lat: 35.8617, lng: 104.1954 },
  { name: "Russia", flag: "🇷🇺", code: "RU", lat: 61.5240, lng: 105.3188 },
  { name: "South Africa", flag: "🇿🇦", code: "ZA", lat: -30.5595, lng: 22.9375 },
  { name: "UAE", flag: "🇦🇪", code: "AE", lat: 23.4241, lng: 53.8478 },
  { name: "Singapore", flag: "🇸🇬", code: "SG", lat: 1.3521, lng: 103.8198 },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "SA", lat: 23.8859, lng: 45.0792 },
  { name: "Italy", flag: "🇮🇹", code: "IT", lat: 41.8719, lng: 12.5674 },
  { name: "Spain", flag: "🇪🇸", code: "ES", lat: 40.4637, lng: -3.7492 },
  { name: "Mexico", flag: "🇲🇽", code: "MX", lat: 23.6345, lng: -102.5528 },
  { name: "Argentina", flag: "🇦🇷", code: "AR", lat: -38.4161, lng: -63.6167 },
  { name: "South Korea", flag: "🇰🇷", code: "KR", lat: 35.9078, lng: 127.7669 },
  { name: "Indonesia", flag: "🇮🇩", code: "ID", lat: -0.7893, lng: 113.9213 },
  { name: "Turkey", flag: "🇹🇷", code: "TR", lat: 38.9637, lng: 35.2433 },
  { name: "Egypt", flag: "🇪🇬", code: "EG", lat: 26.8206, lng: 30.8025 },
  { name: "Nigeria", flag: "🇳🇬", code: "NG", lat: 9.0820, lng: 8.6753 },
  { name: "Kenya", flag: "🇰🇪", code: "KE", lat: -0.0236, lng: 37.9062 },
  { name: "Netherlands", flag: "🇳🇱", code: "NL", lat: 52.1326, lng: 5.2913 },
  { name: "Sweden", flag: "🇸🇪", code: "SE", lat: 60.1282, lng: 18.6435 },
  { name: "Switzerland", flag: "🇨🇭", code: "CH", lat: 46.8182, lng: 8.2275 },
  { name: "New Zealand", flag: "🇳🇿", code: "NZ", lat: -40.9006, lng: 174.8860 },
  { name: "Malaysia", flag: "🇲🇾", code: "MY", lat: 4.2105, lng: 101.9758 },
  { name: "Thailand", flag: "🇹🇭", code: "TH", lat: 15.8700, lng: 100.9925 },
  { name: "Vietnam", flag: "🇻🇳", code: "VN", lat: 14.0583, lng: 108.2772 },
  { name: "Poland", flag: "🇵🇱", code: "PL", lat: 51.9194, lng: 19.1451 },
  { name: "Ukraine", flag: "🇺🇦", code: "UA", lat: 48.3794, lng: 31.1656 },
  { name: "Norway", flag: "🇳🇴", code: "NO", lat: 60.4720, lng: 8.4689 },
  { name: "Denmark", flag: "🇩🇰", code: "DK", lat: 56.2639, lng: 9.5018 },
  { name: "Finland", flag: "🇫🇮", code: "FI", lat: 61.9241, lng: 25.7482 },
  { name: "Chile", flag: "🇨🇱", code: "CL", lat: -35.6751, lng: -71.5430 },
  { name: "Colombia", flag: "🇨🇴", code: "CO", lat: 4.5709, lng: -74.2973 },
  { name: "Peru", flag: "🇵🇪", code: "PE", lat: -9.1900, lng: -75.0152 }
];

// Helper to convert lat/lng to 3D Cartesian coordinates on sphere radius R
function latLngToVector3(lat, lng, radius = 2.0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return [x, y, z];
}

// Generate realistic continent particles matching high-resolution 3D dot map
function generateRealisticWorldMapParticles(radius = 2.0) {
  const width = 360;
  const height = 180;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new Float32Array();

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#ffffff';

  const drawPoly = (coords) => {
    ctx.beginPath();
    coords.forEach(([lng, lat], idx) => {
      const x = lng + 180;
      const y = 90 - lat;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
  };

  // North America
  drawPoly([[-168,65], [-140,70], [-125,72], [-85,75], [-60,60], [-55,48], [-65,44], [-75,35], [-80,25], [-90,16], [-95,16], [-105,20], [-110,30], [-120,34], [-125,48], [-140,60], [-168,65]]);
  drawPoly([[-118,32], [-105,20], [-90,14], [-82,8], [-77,8], [-82,15], [-98,19], [-108,27], [-118,32]]);
  drawPoly([[-55,60], [-40,65], [-20,78], [-30,83], [-60,82], [-70,75], [-55,60]]);

  // South America
  drawPoly([[-80,10], [-66,12], [-50,0], [-35,-5], [-35,-15], [-42,-23], [-53,-33], [-68,-55], [-75,-48], [-72,-35], [-80,-5], [-80,10]]);

  // Europe
  drawPoly([[-10,36], [0,38], [10,38], [15,40], [25,35], [35,42], [30,55], [20,55], [30,70], [20,71], [10,60], [5,62], [-5,50], [-10,42], [-10,36]]);
  drawPoly([[5,58], [10,65], [25,71], [30,60], [18,55], [5,58]]);
  drawPoly([[-10,50], [-2,50], [-2,59], [-8,58], [-10,50]]);

  // Africa
  drawPoly([[-17,35], [10,37], [25,32], [33,30], [35,22], [43,12], [51,12], [42,0], [40,-10], [33,-28], [26,-34], [18,-34], [12,-15], [8,4], [-15,12], [-17,21], [-17,35]]);
  drawPoly([[43,-12], [50,-13], [47,-25], [43,-25], [43,-12]]);

  // Asia
  drawPoly([[30,40], [45,40], [50,30], [55,25], [60,25], [65,10], [75,10], [80,20], [90,22], [100,15], [105,10], [108,20], [120,22], [120,30], [125,40], [130,42], [140,50], [160,55], [170,65], [180,70], [180,75], [100,78], [60,70], [50,55], [38,50], [30,40]]);
  drawPoly([[68,24], [73,20], [78,8], [80,13], [88,21], [90,22], [80,26], [68,24]]);
  drawPoly([[130,30], [142,38], [145,45], [140,40], [130,32]]);
  drawPoly([[95,-5], [140,-5], [140,5], [95,5], [95,-5]]);

  // Australia & NZ
  drawPoly([[113,-26], [115,-34], [130,-32], [138,-35], [150,-37], [153,-28], [148,-15], [135,-12], [130,-15], [120,-18], [113,-26]]);
  drawPoly([[166,-46], [178,-35], [174,-42], [166,-46]]);

  // Antarctica
  drawPoly([[-180,-85], [180,-85], [180,-68], [-180,-68]]);

  const imgData = ctx.getImageData(0, 0, width, height).data;
  const positions = [];

  const step = 1.1;
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const pxX = Math.floor(x);
      const pxY = Math.floor(y);
      const idx = (pxY * width + pxX) * 4;

      if (imgData[idx] > 128) {
        const lng = x - 180;
        const lat = 90 - y;
        const pos = latLngToVector3(lat, lng, radius + (Math.random() * 0.015 - 0.0075));
        positions.push(...pos);
      }
    }
  }

  return new Float32Array(positions);
}

function WorldGlobe({ hoveredCountry, setHoveredCountry }) {
  // Sample continent landmass points
  const continentPositions = useMemo(() => {
    return generateRealisticWorldMapParticles(1.98);
  }, []);

  // Pre-calculate 3D positions for country pins
  const countryData = useMemo(() => {
    return WORLD_COUNTRIES.map(country => ({
      ...country,
      position: latLngToVector3(country.lat, country.lng, 2.02)
    }));
  }, []);

  return (
    <group>
      {/* Dark Inner Ocean Sphere with Central Glow */}
      <Sphere args={[1.95, 64, 64]}>
        <meshStandardMaterial
          color="#020b18"
          emissive="#0284c7"
          emissiveIntensity={0.25}
          roughness={0.3}
          metalness={0.8}
        />
      </Sphere>

      {/* Outer Glow Halo Shell */}
      <Sphere args={[2.08, 32, 32]}>
        <meshStandardMaterial
          color="#00f2fe"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* 3D Continent Landmass Dot Matrix */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[continentPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.038}
          color="#00f2fe"
          transparent
          opacity={0.92}
          sizeAttenuation
        />
      </points>

      {/* Interactive Country Markers & Small Hover Tooltip */}
      {countryData.map((country) => {
        const isHovered = hoveredCountry?.code === country.code;
        return (
          <group key={country.code} position={country.position}>
            {/* Hit Mesh for Hover Detection */}
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredCountry(country);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredCountry(null);
              }}
            >
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshBasicMaterial transparent opacity={0.001} />
            </mesh>

            {/* Visual Pin Marker Point */}
            <mesh>
              <sphereGeometry args={[isHovered ? 0.06 : 0.035, 16, 16]} />
              <meshStandardMaterial
                color={isHovered ? "#38bdf8" : "#00f2fe"}
                emissive={isHovered ? "#00f2fe" : "#0284c7"}
                emissiveIntensity={isHovered ? 2.5 : 1.2}
              />
            </mesh>

            {/* SINGLE SMALL CLEAN TOOLTIP AT COUNTRY POINT */}
            {isHovered && (
              <Html
                position={[0, 0.12, 0]}
                center
                distanceFactor={7}
                style={{ pointerEvents: 'none' }}
              >
                <div className="px-2 py-0.5 rounded-md bg-slate-950/95 border border-cyan-400/80 shadow-md shadow-cyan-500/25 backdrop-blur-md flex items-center space-x-1 whitespace-nowrap text-cyan-300 text-[11px] font-medium font-mono">
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function Hero3DVisual() {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  return (
    <div className="w-full h-[340px] sm:h-[420px] md:h-[500px] relative flex items-center justify-center cursor-grab active:cursor-grabbing">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-indigo-500/20 rounded-full filter blur-3xl opacity-70 pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.6} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#00f2fe" />
        <pointLight position={[5, -5, 5]} intensity={0.9} color="#3b82f6" />

        {/* OrbitControls enables full 360-degree drag rotation in any direction */}
        <OrbitControls
          enableZoom={false}
          autoRotate={!hoveredCountry}
          autoRotateSpeed={0.8}
          rotateSpeed={0.6}
          enablePan={false}
        />

        <WorldGlobe
          hoveredCountry={hoveredCountry}
          setHoveredCountry={setHoveredCountry}
        />
      </Canvas>

      {/* Bottom indicator overlay */}
      <div className="absolute bottom-2 text-center pointer-events-none">
        <span className="text-[11px] font-mono text-cyan-300/90 bg-slate-950/85 px-3.5 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md shadow-lg flex items-center justify-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Interactive 3D Globe • Drag to rotate 360° • Point country for name</span>
        </span>
      </div>
    </div>
  );
}

