import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Plane, useTexture, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// Import MUI components needed for the loader
import { CircularProgress, Box, Typography } from '@mui/material';

// Import your local SVG texture
import stairs from './Texture Pattern/cornered-stairs.svg';

// Import your embedded GLSL shaders (adjust path based on your actual folder structure)
// Assuming shaders are in 'src/components/Login/shaders/' and this file is in 'src/components/Login/Left Animation/'
import planeVertexShader from './planeVertex';
import planeFragmentShader from './planeFragment';

// Define different SVG texture patterns, including the imported 'stairs'
const textureUrls = [
  stairs,
];

// This component renders the plane with the custom shader material
function ShaderPlane({ currentTexture, nextTexture, transitionProgress, primaryColor }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTransitionProgress: { value: 0 },
      uTextureCurrent: { value: currentTexture },
      uTextureNext: { value: nextTexture },
      uResolution: { value: new THREE.Vector2() },
      uPrimaryColor: { value: new THREE.Color(primaryColor) },
    }),
    [currentTexture, nextTexture, primaryColor]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      materialRef.current.uniforms.uTransitionProgress.value = transitionProgress;
      materialRef.current.uniforms.uResolution.value.set(viewport.width, viewport.height);
    }
  });

  return (
    <Plane args={[viewport.width, viewport.height, 32, 32]} ref={meshRef}>
      <shaderMaterial
        ref={materialRef}
        attach="material"
        vertexShader={planeVertexShader}
        fragmentShader={planeFragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </Plane>
  );
}

// Component to hold all R3F hooks and logic that needs to be inside Canvas
function BackgroundScene({ primaryColor, onTexturesLoaded }) {
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);

  const allTextures = useTexture(textureUrls, () => {
    onTexturesLoaded(true); // Signal that textures are loaded
  });

  const currentTexture = allTextures[currentTextureIndex];
  // Ensure nextTexture is different from currentTexture for the morphing effect
  const nextTexture = allTextures[(currentTextureIndex + 1) % textureUrls.length];

  useEffect(() => {
    const textureSwitchInterval = setInterval(() => {
      setTransitionProgress(0);
      setCurrentTextureIndex((prevIndex) => (prevIndex + 1) % textureUrls.length);
    }, 6000);

    return () => clearInterval(textureSwitchInterval);
  }, [textureUrls.length]);

  useEffect(() => {
    let animationFrameId;
    const duration = 1500;
    let startTime = null;

    const animateTransition = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateTransition);
      }
    };

    animationFrameId = requestAnimationFrame(animateTransition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentTextureIndex]);

  // If textures aren't ready (should be handled by Suspense/Loader now)
  if (!currentTexture || !nextTexture) {
    return null;
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ShaderPlane
        currentTexture={currentTexture}
        nextTexture={nextTexture}
        transitionProgress={transitionProgress}
        primaryColor={primaryColor}
      />
    </>
  );
}

// Loader component for internal Canvas suspense fallback
function InternalCanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        }}
      >
        <CircularProgress color="inherit" size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading 3D Assets: {progress.toFixed(0)}%
        </Typography>
      </Box>
    </Html>
  );
}

// Main ThreeDBackground Component
export default function ThreeDBackground({ primaryColor, onSceneReady }) {
  const [texturesAreLoaded, setTexturesAreLoaded] = useState(false);

  useEffect(() => {
    // Once textures are confirmed loaded, signal parent (Login.jsx)
    if (texturesAreLoaded) {
      // Add a small delay after textures are loaded to ensure scene is rendered
      const renderDelay = setTimeout(() => {
        onSceneReady(true);
      }, 500); // Give 3D engine a moment to render after assets are ready

      return () => clearTimeout(renderDelay);
    }
  }, [texturesAreLoaded, onSceneReady]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        // This background ensures a consistent color even before Canvas renders
        background: `linear-gradient(135deg, ${primaryColor}40, ${primaryColor}80)`,
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
        linear
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {/* Suspense handles the loading of textures via useTexture */}
        <Suspense fallback={<InternalCanvasLoader />}>
            <BackgroundScene
                primaryColor={primaryColor}
                onTexturesLoaded={setTexturesAreLoaded}
            />
        </Suspense>
      </Canvas>
    </Box>
  );
}