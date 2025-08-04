import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function SignUpBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mount.appendChild(renderer.domElement);

    // Parameters
    const PARTICLE_COUNT = 150;
    const PARTICLE_DISTANCE = 0.35;
    const PARTICLE_SPEED = 0.0015;
    const PARTICLE_SIZE = 0.04;

    // Particle positions and velocities
    const particles = [];
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * PARTICLE_SPEED,
          (Math.random() - 0.5) * PARTICLE_SPEED,
          (Math.random() - 0.5) * PARTICLE_SPEED
        ),
      });
      positions[i * 3] = particles[i].position.x;
      positions[i * 3 + 1] = particles[i].position.y;
      positions[i * 3 + 2] = particles[i].position.z;
    }

    // Create particle system
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color("#81d4fa"),
      size: PARTICLE_SIZE,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(points);

    // Lines geometry
    const maxConnections = PARTICLE_COUNT * PARTICLE_COUNT;
    const linePositions = new Float32Array(maxConnections * 3 * 2); // each line has 2 points (6 floats)
    const lineColors = new Float32Array(maxConnections * 3 * 2);
    let lineCount = 0;

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Animate
    let frameId;

    function animate() {
      frameId = requestAnimationFrame(animate);

      lineCount = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];

        // Update position with velocity and bounce inside bounds
        p.position.add(p.velocity);

        const bounds = { x: 3, y: 2, z: 1.5 };

        if (p.position.x < -bounds.x || p.position.x > bounds.x) p.velocity.x *= -1;
        if (p.position.y < -bounds.y || p.position.y > bounds.y) p.velocity.y *= -1;
        if (p.position.z < -bounds.z || p.position.z > bounds.z) p.velocity.z *= -1;

        positions[i * 3] = p.position.x;
        positions[i * 3 + 1] = p.position.y;
        positions[i * 3 + 2] = p.position.z;

        // Check distance to other particles and connect lines
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const p2 = particles[j];
          const dist = p.position.distanceTo(p2.position);

          if (dist < PARTICLE_DISTANCE) {
            // Add line positions
            linePositions[lineCount * 6] = p.position.x;
            linePositions[lineCount * 6 + 1] = p.position.y;
            linePositions[lineCount * 6 + 2] = p.position.z;

            linePositions[lineCount * 6 + 3] = p2.position.x;
            linePositions[lineCount * 6 + 4] = p2.position.y;
            linePositions[lineCount * 6 + 5] = p2.position.z;

            // Color gradient based on distance (closer = brighter)
            const alpha = 1 - dist / PARTICLE_DISTANCE;
            const color = new THREE.Color("#81d4fa");

            lineColors[lineCount * 6] = color.r * alpha;
            lineColors[lineCount * 6 + 1] = color.g * alpha;
            lineColors[lineCount * 6 + 2] = color.b * alpha;

            lineColors[lineCount * 6 + 3] = color.r * alpha;
            lineColors[lineCount * 6 + 4] = color.g * alpha;
            lineColors[lineCount * 6 + 5] = color.b * alpha;

            lineCount++;
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;

      lineGeometry.setDrawRange(0, lineCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    // Resize
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);

      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", overflow: "hidden", touchAction: "none" }}
      aria-label="Three.js animated network background"
    />
  );
}
