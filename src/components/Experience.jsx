import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Float, Stars, Sparkles, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function Cake({ position, candleBlown }) {
  const flameMaterial = useRef();
  const cakeGroup = useRef();
  
  useFrame((state, delta) => {
    if (flameMaterial.current && !candleBlown) {
      flameMaterial.current.opacity = 0.8 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
      flameMaterial.current.emissiveIntensity = 2 + Math.sin(state.clock.elapsedTime * 15) * 0.5;
    }
    if (cakeGroup.current) {
        // Subtle floating rotation, completely smooth using delta
        cakeGroup.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={position} ref={cakeGroup}>
      {/* Cake Plate */}
      <mesh position={[0, -0.6, 0]} receiveShadow>
        <cylinderGeometry args={[2.2, 2.5, 0.1, 48]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Bottom Tier */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.8, 1.8, 1, 48]} />
        <meshStandardMaterial color="#f8cdda" roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Top Tier */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 1, 48]} />
        <meshStandardMaterial color="#fff0f5" roughness={0.2} metalness={0.1} />
      </mesh>
      
      {/* Decor pearls bottom tier */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const x = Math.cos(angle) * 1.8;
        const z = Math.sin(angle) * 1.8;
        return (
          <mesh key={'p1'+i} position={[x, -0.5, z]} castShadow>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.5} />
          </mesh>
        )
      })}

      {/* Decor pearls top tier */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 1.2;
        const z = Math.sin(angle) * 1.2;
        return (
          <mesh key={'p2'+i} position={[x, 0.4, z]} castShadow>
            <sphereGeometry args={[0.06, 12, 12]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.5} />
          </mesh>
        )
      })}

      {/* Candle */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.6, 16]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
      
      {/* Flame */}
      {!candleBlown && (
        <mesh position={[0, 2.1, 0]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial 
            ref={flameMaterial}
            color="#ffd700" 
            emissive="#ffaa00" 
            emissiveIntensity={3} 
            transparent 
            opacity={0.9} 
          />
          <pointLight color="#ffaa00" intensity={2.5} distance={15} decay={2} />
        </mesh>
      )}
    </group>
  );
}

export default function Experience({ candleBlown }) {
  const group = useRef();
  const scroll = useScroll();

  // Create orbs with varied positions
  const orbs = useMemo(() => {
    const temp = [];
    const colors = ['#ffb6c1', '#e0aaff', '#ffd700', '#ffc8d2', '#ffffff'];
    for (let i = 0; i < 6; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 6, 
          -i * 5.8 - 2, 
          (Math.random() - 0.5) * 4 - 2
        ],
        scale: Math.random() * 0.8 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 1.5 + 0.5
      });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    // Smoother framerate-independent scroll interpolation
    const targetY = scroll.offset * 40; 
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 4, delta);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fff" castShadow />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#e0aaff" />

      {/* Magical Atmosphere */}
      <Sparkles count={150} scale={15} size={4} speed={0.2} color="#ffd700" opacity={0.6} />
      <Sparkles count={100} scale={15} size={3} speed={0.1} color="#ffb6c1" opacity={0.4} />
      
      {/* Soft background stars */}
      <Stars radius={100} depth={50} count={1200} factor={4} saturation={0} fade speed={0.3} />

      <group ref={group}>
        {/* Premium Floating Glass Orbs */}
        {orbs.map((orb, i) => (
          <Float key={i} speed={orb.speed} rotationIntensity={1.5} floatIntensity={1.5}>
            <mesh position={orb.position} scale={orb.scale}>
              <icosahedronGeometry args={[1, 1]} />
              {/* Premium Glass Material */}
              <MeshTransmissionMaterial 
                backside
                samples={4}
                thickness={0.5}
                roughness={0.1}
                transmission={1}
                ior={1.5}
                chromaticAberration={0.06}
                anisotropy={0.1}
                distortion={0.1}
                distortionScale={0.3}
                temporalDistortion={0.1}
                color={orb.color}
                emissive={orb.color}
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        ))}
        
        {/* The Climax Cake */}
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
          <Cake position={[0, -39, -1]} candleBlown={candleBlown} />
        </Float>
      </group>

      {/* Premium Post-Processing Effects */}
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom 
          luminanceThreshold={0.5} 
          luminanceSmoothing={0.9} 
          intensity={1.5} 
          mipmapBlur={true} 
        />
      </EffectComposer>
    </>
  );
}
