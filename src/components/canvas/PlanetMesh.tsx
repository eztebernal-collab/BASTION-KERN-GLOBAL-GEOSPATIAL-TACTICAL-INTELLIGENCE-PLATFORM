import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useGlobalStore } from '../../store/useGlobalStore';

export default function PlanetMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const activeAlerts = useGlobalStore(state => state.activeAlerts);
  const activeLayers = useGlobalStore(state => state.activeLayers);
  
  // Rotating the planet
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.025;
    }
  });

  const getPositionFromLatLon = (lat: number, lon: number, radius: number): [number, number, number] => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return [x, y, z];
  };

  const showDisasters = activeLayers.includes('All Layers') || activeLayers.includes('Disasters');

  return (
    <group>
      {/* Base Earth Sphere */}
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <meshStandardMaterial 
          color="#1a2f4c" 
          roughness={0.7}
          metalness={0.1}
          wireframe={useGlobalStore.getState().cameraAltitude > 0.6} // Show wireframe grid when zoomed in
        />
      </Sphere>

      {/* Cloud Layer (Simulated) */}
      <Sphere ref={cloudRef} args={[1.015, 64, 64]}>
        <meshStandardMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.15} 
          depthWrite={false}
        />
      </Sphere>
      
      {/* Atmosphere Glow */}
      <Sphere args={[1.05, 64, 64]}>
        <meshBasicMaterial 
          color="#3B82F6" 
          transparent={true} 
          opacity={0.05} 
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Event Nodes */}
      {showDisasters && activeAlerts.map(event => {
        const [x, y, z] = getPositionFromLatLon(event.coordinates[0], event.coordinates[1], 1.02);
        const color = event.severity === 'CRÍTICO' ? '#EF4444' : event.severity === 'ALTO' ? '#F59E0B' : '#10B981';
        
        return (
          <mesh key={event.id} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshBasicMaterial color={color} />
            <pointLight distance={0.5} intensity={1} color={color} />
          </mesh>
        );
      })}
    </group>
  );
}
