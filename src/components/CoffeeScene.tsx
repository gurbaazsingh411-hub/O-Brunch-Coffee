import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function CoffeeCup() {
  const cupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cupRef.current) {
      cupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={cupRef} position={[0, -0.5, 0]}>
        {/* Cup body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.6, 1.4, 32]} />
          <meshStandardMaterial 
            color="#f5f0e8" 
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        
        {/* Cup inner */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.75, 0.55, 1.3, 32]} />
          <meshStandardMaterial 
            color="#3d2817" 
            roughness={0.8}
          />
        </mesh>

        {/* Coffee liquid */}
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.1, 32]} />
          <MeshTransmissionMaterial
            color="#2a1810"
            roughness={0.1}
            thickness={0.5}
            transmission={0.3}
          />
        </mesh>

        {/* Handle */}
        <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.35, 0.08, 16, 32, Math.PI]} />
          <meshStandardMaterial 
            color="#f5f0e8" 
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Saucer */}
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[1.2, 1.3, 0.12, 32]} />
          <meshStandardMaterial 
            color="#f5f0e8" 
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SteamParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 50;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = Math.random() * 1.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = 0.01 + Math.random() * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        
        if (positions[i * 3 + 1] > 2) {
          positions[i * 3] = (Math.random() - 0.5) * 0.4;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef} position={[0, 0.2, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function CoffeeBean({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const beanRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (beanRef.current) {
      beanRef.current.rotation.x += 0.005;
      beanRef.current.rotation.y += 0.003;
      beanRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={beanRef} position={position} rotation={rotation} scale={0.15}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color="#2a1810" 
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <pointLight position={[-3, 3, -3]} intensity={0.5} color="#ffeedd" />
      
      <CoffeeCup />
      <SteamParticles />
      
      {/* Floating coffee beans */}
      <CoffeeBean position={[-2, 1, -1]} rotation={[0.5, 0.3, 0.2]} />
      <CoffeeBean position={[2.2, 0.5, -0.5]} rotation={[0.2, 0.8, 0.1]} />
      <CoffeeBean position={[-1.8, -0.3, 0.8]} rotation={[0.7, 0.1, 0.5]} />
      <CoffeeBean position={[1.5, 1.2, 1]} rotation={[0.3, 0.6, 0.4]} />
      <CoffeeBean position={[-2.5, 0.8, 0.3]} rotation={[0.1, 0.4, 0.7]} />
      
      <Environment preset="studio" />
    </>
  );
}

export default function CoffeeScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
