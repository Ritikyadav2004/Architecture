import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Grid, Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

// Dynamic Lighting to simulate a day/night or orbital light cycle
function DynamicLighting() {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.2; // Speed of the cycle
    if (lightRef.current) {
      // Orbiting light source
      lightRef.current.position.x = Math.cos(t) * 10;
      lightRef.current.position.z = Math.sin(t) * 10;
      lightRef.current.position.y = Math.sin(t * 0.5) * 5 + 5; // Bobbing up and down
      
      // Dynamic intensity based on height (simulating day/night)
      const heightFactor = Math.max(0.1, lightRef.current.position.y / 10);
      lightRef.current.intensity = heightFactor * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight 
        ref={lightRef} 
        castShadow 
        shadow-mapSize={[1024, 1024]} 
        color="#e0f2fe" 
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Neon accent lights */}
      <pointLight position={[-5, 2, -5]} intensity={1.5} color="#38bdf8" distance={15} />
      <pointLight position={[5, 4, 5]} intensity={1} color="#818cf8" distance={15} />
    </>
  );
}

function InteractiveBuilding() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Smooth scaling for interaction
  const targetScale = expanded ? 1.15 : 1;
  const currentScale = useRef(1);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Rotate entire structure slowly
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
      
      // Lerp scale for smooth click expansion
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, delta * 5);
      groupRef.current.scale.setScalar(currentScale.current);
    }

    // Fast rotating orbital rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.y = t * 0.8;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.3;
      ring2Ref.current.rotation.z = t * 0.6;
    }

    // Pulsing inner energy core
    if (coreRef.current) {
      const material = coreRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.4;
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
    >
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        
        {/* Central Glass Core */}
        <mesh position={[0, 1.8, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.6, 0.6, 3.6, 32]} />
          <MeshTransmissionMaterial 
            backside 
            samples={4} 
            thickness={0.5} 
            chromaticAberration={0.05} 
            anisotropy={0.1} 
            distortion={0.2} 
            distortionScale={0.5} 
            temporalDistortion={0.1} 
            color={hovered ? "#7dd3fc" : "#0ea5e9"} 
            roughness={0.1}
          />
        </mesh>

        {/* Inner Energy Core */}
        <mesh ref={coreRef} position={[0, 1.8, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 3.4, 16]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} toneMapped={false} />
        </mesh>

        {/* Orbital Data Rings */}
        <mesh ref={ring1Ref} position={[0, 1.8, 0]}>
          <torusGeometry args={[1.4, 0.02, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={hovered ? 1 : 0.5} toneMapped={false} />
        </mesh>
        <mesh ref={ring2Ref} position={[0, 1.8, 0]}>
          <torusGeometry args={[1.8, 0.01, 16, 100]} />
          <meshStandardMaterial color="#e0f2fe" emissive="#e0f2fe" emissiveIntensity={hovered ? 1.5 : 0.8} toneMapped={false} />
        </mesh>

        {/* Cantilever Module 1 */}
        <mesh position={[0.9, 2.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.5, 0.8]} />
          <meshStandardMaterial color="#0284c7" roughness={0.2} metalness={0.8} />
          <mesh>
            <boxGeometry args={[1.42, 0.52, 0.82]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={hovered ? 0.6 : 0.3} />
          </mesh>
        </mesh>

        {/* Cantilever Module 2 */}
        <mesh position={[-0.7, 1.2, 0.6]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.6, 1.2]} />
          <meshStandardMaterial color="#0369a1" roughness={0.3} metalness={0.7} />
          <mesh>
            <boxGeometry args={[1.22, 0.62, 1.22]} />
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={hovered ? 0.6 : 0.3} />
          </mesh>
        </mesh>

        {/* Hexagonal Base */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.8, 2.2, 0.2, 6]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} metalness={0.5} />
          <mesh>
            <cylinderGeometry args={[1.82, 2.22, 0.22, 6]} />
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.2} />
          </mesh>
        </mesh>

        {/* Holographic Particles */}
        <Sparkles count={50} scale={4} size={2} speed={0.4} opacity={0.5} color="#38bdf8" position={[0, 1.8, 0]} />

      </Float>
    </group>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full min-h-[300px] relative">
      <Canvas camera={{ position: [5, 4, 5], fov: 45 }} shadows>
        <DynamicLighting />
        
        <InteractiveBuilding />
        
        {/* Blueprint Grid Floor */}
        <Grid 
          position={[0, -0.5, 0]} 
          args={[20, 20]} 
          cellSize={0.5} 
          cellThickness={1} 
          cellColor="#38bdf8" 
          sectionSize={2} 
          sectionThickness={1.5} 
          sectionColor="#0284c7" 
          fadeDistance={15} 
          fadeStrength={1} 
        />
        
        <ContactShadows position={[0, -0.49, 0]} opacity={0.7} scale={15} blur={2.5} far={4} color="#000000" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={false} // Handled manually in the component now
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
