"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ShapeProps {
  position: [number, number, number];
  color: string;
  speed: number;
  scale: number;
  type: "star" | "torus" | "sphere" | "dodecahedron";
}

function FloatingMesh({ position, color, speed, scale, type }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const initialX = position[0];

  const geometry = useMemo(() => {
    switch (type) {
      case "star":
        return new THREE.OctahedronGeometry(1.2, 0);
      case "torus":
        return new THREE.TorusGeometry(1, 0.4, 16, 32);
      case "dodecahedron":
        return new THREE.DodecahedronGeometry(1.1, 0);
      case "sphere":
      default:
        return new THREE.SphereGeometry(1, 24, 24);
    }
  }, [type]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * speed;

    // Gentle floating bob
    meshRef.current.position.y = initialY + Math.sin(time) * 0.35;
    meshRef.current.position.x = initialX + Math.cos(time * 0.7) * 0.2;

    // Slow rotation
    meshRef.current.rotation.x = time * 0.4;
    meshRef.current.rotation.y = time * 0.6;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={0.25}
        metalness={0.15}
        emissive={color}
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

export default function FloatingShapesScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Parallax mouse follow
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.15, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.15, 0.05);
  });

  const shapes: ShapeProps[] = [
    { position: [-4.2, 2.2, -1], color: "#B36648", speed: 0.8, scale: 0.9, type: "star" }, // Terracotta
    { position: [4.5, 2.8, -2], color: "#698070", speed: 0.7, scale: 1.1, type: "torus" }, // Sage
    { position: [-3.5, -2.5, -1.5], color: "#D4A373", speed: 0.9, scale: 0.85, type: "dodecahedron" }, // Ochre
    { position: [4.2, -2.2, -1], color: "#C9886F", speed: 0.75, scale: 0.95, type: "star" }, // Soft coral
    { position: [0, 3.5, -3], color: "#E7C9BC", speed: 0.6, scale: 0.75, type: "sphere" }, // Pastel peach
    { position: [-5, 0, -2.5], color: "#698070", speed: 0.85, scale: 0.7, type: "sphere" },
  ];

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 15, 10]} intensity={1.8} color="#FFFFFF" />
      <pointLight position={[-10, -5, -5]} intensity={0.8} color="#F7EDE5" />

      <group ref={groupRef}>
        {shapes.map((s, idx) => (
          <FloatingMesh key={idx} {...s} />
        ))}
      </group>
    </>
  );
}
