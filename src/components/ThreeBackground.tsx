import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

const GeometricShape = ({ position, color, geometry }: { position: [number, number, number], color: string, geometry: 'box' | 'sphere' | 'torus' }) => {
  const meshRef = useRef<Mesh>(null);

  const renderGeometry = () => {
    switch (geometry) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.6, 0.2, 16, 100]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {renderGeometry()}
        <meshStandardMaterial color={color} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
};

const ThreeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" />
        
        {/* Floating geometric shapes */}
        <GeometricShape position={[-4, 2, -2]} color="#3b82f6" geometry="box" />
        <GeometricShape position={[4, -2, -3]} color="#8b5cf6" geometry="sphere" />
        <GeometricShape position={[-2, -3, -1]} color="#06b6d4" geometry="torus" />
        <GeometricShape position={[3, 3, -4]} color="#3b82f6" geometry="box" />
        <GeometricShape position={[-3, 1, -5]} color="#8b5cf6" geometry="sphere" />
        <GeometricShape position={[1, -1, -2]} color="#06b6d4" geometry="torus" />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;