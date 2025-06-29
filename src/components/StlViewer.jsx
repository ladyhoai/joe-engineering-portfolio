// components/StlViewer.jsx
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';

// Loader (same as yours)
const CanvasLoader = () => (
  <Html center>
    <div className="flex flex-col items-center">
      <span
        className="canvas-loader"
        style={{
          width: 40,
          height: 40,
          border: '5px solid #F1F1F1',
          borderTop: '5px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      ></span>
      <p className="text-sm text-white font-bold mt-2">Loading 3D model...</p>
    </div>
  </Html>
);

// Error Boundary
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center text-white p-4">
          <p>Failed to render 3D model: {this.state.error.message}</p>
          <p>Please try refreshing the page or using a different browser.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Context Loss Handler
const ContextLossHandler = () => {
  const { gl } = useThree();
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const handleContextLost = (event) => {
      event.preventDefault();
      setContextLost(true);
    };
    const handleContextRestored = () => {
      setContextLost(false);
    };

    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl]);

  if (contextLost) {
    return (
      <Html center>
        <div className="text-center text-white p-4">
          <p>WebGL context lost. Please refresh the page.</p>
        </div>
      </Html>
    );
  }
  return null;
};

// STL model component
function StlModel({ url }) {
  const geometry = useLoader(STLLoader, url);
  const ref = useRef();

  useEffect(() => {
    geometry.computeVertexNormals();

    if (ref.current) {
        const box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim;
    
        // Move geometry so its centroid is at the origin
        geometry.translate(-center.x, -center.y, -center.z);
    
        // Then apply uniform scale
        ref.current.scale.set(scale, scale, scale);
      }
  }, [geometry]);

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color={'orange'} metalness={0.2} roughness={0.5} />
    </mesh>
  );
}

// Main viewer component
export default function StlViewer({ url, fov = 50 }) {
  if (!url.toLowerCase().endsWith('.stl')) {
    return (
      <div className="text-center text-white p-4">
        <p>Invalid file format. Only .stl files are supported.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 h-[600px] md:aspect-video">
      <ErrorBoundary>
        <Canvas
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          camera={{ position: [0, 0, 0], fov }}
          style={{ background: '#171717' }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <PerspectiveCamera makeDefault position={[-5, -5, 5]} fov={fov} />
          <Suspense fallback={<CanvasLoader />}>
            <ContextLossHandler />
            <StlModel url={url} />
          </Suspense>
          <OrbitControls enablePan={false} enableZoom={true} autoRotate={false} />
        </Canvas>
      </ErrorBoundary>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
