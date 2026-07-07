import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useGlobalStore } from '../../store/useGlobalStore';
import PlanetMesh from './PlanetMesh';

function CameraController() {
  const cameraAltitude = useGlobalStore(state => state.cameraAltitude);
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  useFrame(() => {
    if (controlsRef.current) {
      // Map 0.0-1.0 altitude to Three.js distances (e.g. 1.2 to 6.0)
      const targetZ = THREE.MathUtils.lerp(6.0, 1.2, cameraAltitude);
      
      // Lerp camera distance
      const distance = camera.position.length();
      const targetDistance = THREE.MathUtils.lerp(distance, targetZ, 0.05);
      
      camera.position.setLength(targetDistance);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef}
      enablePan={false}
      enableZoom={false} // Custom zoom via gestures/state
      enableDamping={true}
      dampingFactor={0.05}
      rotateSpeed={0.5}
      minDistance={1.2}
      maxDistance={6.0}
    />
  );
}

export default function EarthCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#0B0D12']} />
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      
      <CameraController />
      <PlanetMesh />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </Canvas>
  );
}
