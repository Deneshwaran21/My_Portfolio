import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

// 40+ Major World Countries dataset with accurate lat/lng coordinates
const WORLD_COUNTRIES = [
  { name: "India", flag: "🇮🇳", code: "IN", lat: 20.5937, lng: 78.9629, region: "South Asia", capital: "New Delhi" },
  { name: "United States", flag: "🇺🇸", code: "US", lat: 37.0902, lng: -95.7129, region: "North America", capital: "Washington, D.C." },
  { name: "United Kingdom", flag: "🇬🇧", code: "GB", lat: 55.3781, lng: -3.4360, region: "Europe", capital: "London" },
  { name: "Germany", flag: "🇩🇪", code: "DE", lat: 51.1657, lng: 10.4515, region: "Europe", capital: "Berlin" },
  { name: "France", flag: "🇫🇷", code: "FR", lat: 46.2276, lng: 2.2137, region: "Europe", capital: "Paris" },
  { name: "Japan", flag: "🇯🇵", code: "JP", lat: 36.2048, lng: 138.2529, region: "East Asia", capital: "Tokyo" },
  { name: "Australia", flag: "🇦🇺", code: "AU", lat: -25.2744, lng: 133.7751, region: "Oceania", capital: "Canberra" },
  { name: "Brazil", flag: "🇧🇷", code: "BR", lat: -14.2350, lng: -51.9253, region: "South America", capital: "Brasília" },
  { name: "Canada", flag: "🇨🇦", code: "CA", lat: 56.1304, lng: -106.3468, region: "North America", capital: "Ottawa" },
  { name: "China", flag: "🇨🇳", code: "CN", lat: 35.8617, lng: 104.1954, region: "East Asia", capital: "Beijing" },
  { name: "Russia", flag: "🇷🇺", code: "RU", lat: 61.5240, lng: 105.3188, region: "Eurasia", capital: "Moscow" },
  { name: "South Africa", flag: "🇿🇦", code: "ZA", lat: -30.5595, lng: 22.9375, region: "Africa", capital: "Pretoria" },
  { name: "United Arab Emirates", flag: "🇦🇪", code: "AE", lat: 23.4241, lng: 53.8478, region: "Middle East", capital: "Abu Dhabi" },
  { name: "Singapore", flag: "🇸🇬", code: "SG", lat: 1.3521, lng: 103.8198, region: "Southeast Asia", capital: "Singapore" },
  { name: "Saudi Arabia", flag: "🇸🇦", code: "SA", lat: 23.8859, lng: 45.0792, region: "Middle East", capital: "Riyadh" },
  { name: "Italy", flag: "🇮🇹", code: "IT", lat: 41.8719, lng: 12.5674, region: "Europe", capital: "Rome" },
  { name: "Spain", flag: "🇪🇸", code: "ES", lat: 40.4637, lng: -3.7492, region: "Europe", capital: "Madrid" },
  { name: "Mexico", flag: "🇲🇽", code: "MX", lat: 23.6345, lng: -102.5528, region: "North America", capital: "Mexico City" },
  { name: "Argentina", flag: "🇦🇷", code: "AR", lat: -38.4161, lng: -63.6167, region: "South America", capital: "Buenos Aires" },
  { name: "South Korea", flag: "🇰🇷", code: "KR", lat: 35.9078, lng: 127.7669, region: "East Asia", capital: "Seoul" },
  { name: "Indonesia", flag: "🇮🇩", code: "ID", lat: -0.7893, lng: 113.9213, region: "Southeast Asia", capital: "Jakarta" },
  { name: "Turkey", flag: "🇹🇷", code: "TR", lat: 38.9637, lng: 35.2433, region: "Middle East / Europe", capital: "Ankara" },
  { name: "Egypt", flag: "🇪🇬", code: "EG", lat: 26.8206, lng: 30.8025, region: "North Africa", capital: "Cairo" },
  { name: "Nigeria", flag: "🇳🇬", code: "NG", lat: 9.0820, lng: 8.6753, region: "West Africa", capital: "Abuja" },
  { name: "Kenya", flag: "🇰🇪", code: "KE", lat: -0.0236, lng: 37.9062, region: "East Africa", capital: "Nairobi" },
  { name: "Netherlands", flag: "🇳🇱", code: "NL", lat: 52.1326, lng: 5.2913, region: "Europe", capital: "Amsterdam" },
  { name: "Sweden", flag: "🇸🇪", code: "SE", lat: 60.1282, lng: 18.6435, region: "Europe", capital: "Stockholm" },
  { name: "Switzerland", flag: "🇨🇭", code: "CH", lat: 46.8182, lng: 8.2275, region: "Europe", capital: "Bern" },
  { name: "New Zealand", flag: "🇳🇿", code: "NZ", lat: -40.9006, lng: 174.8860, region: "Oceania", capital: "Wellington" },
  { name: "Malaysia", flag: "🇲🇾", code: "MY", lat: 4.2105, lng: 101.9758, region: "Southeast Asia", capital: "Kuala Lumpur" },
  { name: "Thailand", flag: "🇹🇭", code: "TH", lat: 15.8700, lng: 100.9925, region: "Southeast Asia", capital: "Bangkok" },
  { name: "Vietnam", flag: "🇻🇳", code: "VN", lat: 14.0583, lng: 108.2772, region: "Southeast Asia", capital: "Hanoi" },
  { name: "Poland", flag: "🇵🇱", code: "PL", lat: 51.9194, lng: 19.1451, region: "Europe", capital: "Warsaw" },
  { name: "Ukraine", flag: "🇺🇦", code: "UA", lat: 48.3794, lng: 31.1656, region: "Europe", capital: "Kyiv" },
  { name: "Norway", flag: "🇳🇴", code: "NO", lat: 60.4720, lng: 8.4689, region: "Europe", capital: "Oslo" },
  { name: "Denmark", flag: "🇩🇰", code: "DK", lat: 56.2639, lng: 9.5018, region: "Europe", capital: "Copenhagen" },
  { name: "Finland", flag: "🇫🇮", code: "FI", lat: 61.9241, lng: 25.7482, region: "Europe", capital: "Helsinki" },
  { name: "Chile", flag: "🇨🇱", code: "CL", lat: -35.6751, lng: -71.5430, region: "South America", capital: "Santiago" },
  { name: "Colombia", flag: "🇨🇴", code: "CO", lat: 4.5709, lng: -74.2973, region: "South America", capital: "Bogotá" },
  { name: "Peru", flag: "🇵🇪", code: "PE", lat: -9.1900, lng: -75.0152, region: "South America", capital: "Lima" }
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

function WorldGlobe({ hoveredCountry, setHoveredCountry }) {
  const globeGroupRef = useRef();

  // Generate continent landmass point cloud for realistic 3D World Map visualization
  const continentPositions = useMemo(() => {
    const points = [];
    const radius = 1.98;

    const continentBounds = [
      { minLat: 15, maxLat: 70, minLng: -165, maxLng: -55, count: 280 }, // North America
      { minLat: -55, maxLat: 12, minLng: -80, maxLng: -35, count: 200 },  // South America
      { minLat: 35, maxLat: 70, minLng: -10, maxLng: 40, count: 240 },   // Europe
      { minLat: -35, maxLat: 37, minLng: -18, maxLng: 51, count: 300 },   // Africa
      { minLat: 8, maxLat: 75, minLng: 45, maxLng: 145, count: 480 },   // Asia
      { minLat: -45, maxLat: -10, minLng: 112, maxLng: 175, count: 180 }, // Australia
      { minLat: -85, maxLat: -65, minLng: -180, maxLng: 180, count: 120 } // Antarctica
    ];

    continentBounds.forEach(region => {
      for (let i = 0; i < region.count; i++) {
        const lat = region.minLat + Math.random() * (region.maxLat - region.minLat);
        const lng = region.minLng + Math.random() * (region.maxLng - region.minLng);
        const pos = latLngToVector3(lat, lng, radius + (Math.random() * 0.02 - 0.01));
        points.push(...pos);
      }
    });

    return new Float32Array(points);
  }, []);

  // Pre-calculate 3D positions for country pins
  const countryData = useMemo(() => {
    return WORLD_COUNTRIES.map(country => ({
      ...country,
      position: latLngToVector3(country.lat, country.lng, 2.02)
    }));
  }, []);

  // Globe rotation & cursor responsiveness
  useFrame((state, delta) => {
    if (globeGroupRef.current) {
      // Slow rotation when hovering over a country so the user can inspect easily
      const rotSpeed = hoveredCountry ? 0.05 : 0.22;
      globeGroupRef.current.rotation.y += delta * rotSpeed;

      // Mouse responsive parallax tilt
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;
      globeGroupRef.current.rotation.y += (targetX - globeGroupRef.current.rotation.y) * 0.04;
      globeGroupRef.current.rotation.x += (-targetY - globeGroupRef.current.rotation.x) * 0.04;
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* Dark Inner Ocean Sphere */}
      <Sphere args={[1.96, 64, 64]}>
        <meshStandardMaterial
          color="#061224"
          emissive="#0284c7"
          emissiveIntensity={0.15}
          roughness={0.4}
          metalness={0.7}
        />
      </Sphere>

      {/* Wireframe Grid Lines (Lat/Long) */}
      <Sphere args={[2.0, 24, 24]}>
        <meshStandardMaterial
          color="#0284c7"
          wireframe
          transparent
          opacity={0.18}
        />
      </Sphere>

      {/* Outer Cyan Atmosphere Glow Shell */}
      <Sphere args={[2.12, 32, 32]}>
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.08}
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
          size={0.04}
          color="#38bdf8"
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Interactive Country Pins & Hover Hit Points */}
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
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial transparent opacity={0.001} />
            </mesh>

            {/* Visual Pin Marker */}
            <mesh>
              <sphereGeometry args={[isHovered ? 0.075 : 0.04, 16, 16]} />
              <meshStandardMaterial
                color={isHovered ? "#fbbf24" : "#06b6d4"}
                emissive={isHovered ? "#f59e0b" : "#38bdf8"}
                emissiveIntensity={isHovered ? 2.5 : 1.2}
              />
            </mesh>

            {/* Glowing Beacon Ring on Hover */}
            {isHovered && (
              <>
                <mesh>
                  <ringGeometry args={[0.09, 0.12, 32]} />
                  <meshBasicMaterial color="#fbbf24" side={THREE.DoubleSide} transparent opacity={0.9} />
                </mesh>
                {/* Pinned 3D Label */}
                <Html
                  position={[0, 0.18, 0]}
                  center
                  distanceFactor={8}
                  style={{ pointerEvents: 'none' }}
                >
                  <div className="px-2.5 py-1 rounded-md bg-slate-950/90 border border-amber-400/80 shadow-lg shadow-amber-500/20 backdrop-blur-md flex items-center space-x-1.5 whitespace-nowrap text-amber-300 text-xs font-bold font-mono">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                </Html>
              </>
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
    <div className="w-full h-[340px] sm:h-[420px] md:h-[500px] relative flex items-center justify-center">
      {/* Glow background backdrop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-violet-500/15 rounded-full filter blur-3xl opacity-60 animate-pulse-slow pointer-events-none" />

      {/* Floating HUD banner when a country is hovered */}
      {hoveredCountry ? (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl bg-slate-950/95 border border-cyan-400/60 shadow-2xl shadow-cyan-500/25 backdrop-blur-md flex items-center space-x-3 text-slate-100 animate-fade-in z-20 pointer-events-none transition-all">
          <span className="text-2xl sm:text-3xl leading-none">{hoveredCountry.flag}</span>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-sm sm:text-base font-extrabold text-cyan-300 tracking-wide">{hoveredCountry.name}</h4>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                {hoveredCountry.code}
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-300 leading-tight mt-0.5">
              {hoveredCountry.region} • Capital: <span className="text-slate-100">{hoveredCountry.capital}</span>
            </p>
          </div>
        </div>
      ) : null}

      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color="#06b6d4" />
        <pointLight position={[5, -5, 5]} intensity={0.8} color="#3b82f6" />

        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <WorldGlobe
            hoveredCountry={hoveredCountry}
            setHoveredCountry={setHoveredCountry}
          />
        </Float>
      </Canvas>

      {/* Bottom indicator badge */}
      <div className="absolute bottom-2 text-center pointer-events-none">
        <span className="text-[11px] font-mono text-cyan-300/90 bg-slate-950/80 px-3.5 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md shadow-lg flex items-center justify-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Interactive 3D World Globe • Hover over any country point</span>
        </span>
      </div>
    </div>
  );
}
