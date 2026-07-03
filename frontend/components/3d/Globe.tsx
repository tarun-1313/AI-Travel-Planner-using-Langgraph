'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x0a0e27, 0);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 2.5;

    // Create globe sphere
    const geometry = new THREE.IcosahedronGeometry(1, 64);
    
    // Create canvas texture for globe
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Dark background
      ctx.fillStyle = '#0a0e27';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient overlay
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, 'rgba(0, 217, 255, 0.1)');
      grad.addColorStop(0.5, 'rgba(124, 58, 237, 0.05)');
      grad.addColorStop(1, 'rgba(0, 217, 255, 0.1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Simple landmass representation
      ctx.fillStyle = 'rgba(0, 217, 255, 0.3)';
      
      // Add some continents (simplified)
      ctx.beginPath();
      ctx.arc(canvas.width * 0.25, canvas.height * 0.4, 150, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(canvas.width * 0.65, canvas.height * 0.35, 180, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(canvas.width * 0.85, canvas.height * 0.6, 120, 0, Math.PI * 2);
      ctx.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      emissive: 0x00d9ff,
      emissiveIntensity: 0.2,
      shininess: 100,
    });

    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add glow effect
    const glowGeometry = new THREE.IcosahedronGeometry(1.05, 64);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.15,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Lighting
    const light = new THREE.PointLight(0x00d9ff, 1.5);
    light.position.set(5, 3, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x7c3aed, 0.5);
    scene.add(ambientLight);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      globe.rotation.x += 0.0002;
      globe.rotation.y += 0.0003;
      glowMesh.rotation.x += 0.0001;
      glowMesh.rotation.y += 0.0004;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
