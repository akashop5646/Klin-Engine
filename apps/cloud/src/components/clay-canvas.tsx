import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function ClayCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Add atmospheric fog for depth
    scene.fog = new THREE.FogExp2(0x09090b, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lights - Advanced Studio setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Cool fill light
    const fillLight = new THREE.DirectionalLight(0x8bc34a, 0.4);
    fillLight.position.set(-6, 2, 2);
    scene.add(fillLight);

    // Terracotta accent rim light
    const rimLight = new THREE.DirectionalLight(0xd46a43, 1.5);
    rimLight.position.set(-4, -6, -4);
    scene.add(rimLight);

    // Mouse-controlled spotlight for dynamic highlights
    const spotLight = new THREE.SpotLight(0xffffff, 5, 15, Math.PI / 6, 0.5, 1);
    spotLight.position.set(0, 0, 6);
    scene.add(spotLight);

    // 3. Ceramic clay geometry and orbiting ring (Multi-layered sculpture)
    const knotGeom = new THREE.TorusKnotGeometry(1.2, 0.38, 200, 24, 2, 3);
    const ringGeom = new THREE.TorusGeometry(2.4, 0.08, 16, 100);
    const particleGeom = new THREE.BufferGeometry();

    // Floating micro-particles (representing kiln sparks/dust)
    const particleCount = 40;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Materials
    const clayMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd46a43, // Clay terracotta
      roughness: 0.55,
      metalness: 0.1,
      clearcoat: 0.8, // Ultra-glossy glazed look
      clearcoatRoughness: 0.1,
      sheen: 0.5,
      sheenRoughness: 0.2,
      sheenColor: new THREE.Color(0xd46a43),
    });

    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1f1f23, // Ceramic dark obsidian matte ring
      roughness: 0.8,
      metalness: 0.2,
      clearcoat: 0.1,
    });

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd46a43,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    // Meshes
    const knotMesh = new THREE.Mesh(knotGeom, clayMaterial);
    knotMesh.castShadow = true;
    knotMesh.receiveShadow = true;
    scene.add(knotMesh);

    const ringMesh = new THREE.Mesh(ringGeom, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.castShadow = true;
    ringMesh.receiveShadow = true;
    scene.add(ringMesh);

    const particles = new THREE.Points(particleGeom, particleMaterial);
    scene.add(particles);

    // 4. Mouse interaction variables
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Intersection Observer / Visibility handling for performance
    let isVisible = true;
    let animationFrameId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 6. Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Main Knot rotation and morph-like scale pulsing
      knotMesh.rotation.x = elapsed * 0.12;
      knotMesh.rotation.y = elapsed * 0.18;
      
      const knotScale = 1 + Math.sin(elapsed * 1.2) * 0.05;
      knotMesh.scale.set(knotScale, knotScale, knotScale);

      // Ring rotation in opposition
      ringMesh.rotation.y = -elapsed * 0.08;
      ringMesh.rotation.z = elapsed * 0.05;

      // Rotate particle cloud slowly
      particles.rotation.y = elapsed * 0.02;

      // Mouse Parallax & Dynamic spotlight follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      knotMesh.position.x = mouse.x * 0.8;
      knotMesh.position.y = mouse.y * 0.6;

      ringMesh.position.x = mouse.x * 0.4;
      ringMesh.position.y = mouse.y * 0.3;

      // Update spotlight target
      spotLight.position.x = mouse.x * 2.5;
      spotLight.position.y = mouse.y * 2.5;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();

      knotGeom.dispose();
      ringGeom.dispose();
      particleGeom.dispose();
      clayMaterial.dispose();
      ringMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full pointer-events-none" />;
}
