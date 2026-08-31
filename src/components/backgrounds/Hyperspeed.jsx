import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../custom/useReducedMotion';
import './Hyperspeed.css';

export function Hyperspeed({
  options = {
    colors: {
      roadColor: 0x0B0A08,
      islandColor: 0x141210,
      background: 0x000000,
      shoulderLines: 0xC9A24B,
      brokenLines: 0xC9A24B,
      leftCars: [0xFF4B1F, 0x8C1017, 0xC9A24B],
      rightCars: [0xFF4B1F, 0x8C1017, 0xC9A24B],
      sticks: 0xFF4B1F
    }
  },
  className = ''
}) {
  const containerRef = useRef(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070605);
    scene.fog = new THREE.FogExp2(0x070605, 0.0035);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 800);
    camera.position.set(0, 4, 25);
    camera.lookAt(0, 2, -100);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    container.appendChild(renderer.domElement);

    // Light Trails
    const trailCount = 35;
    const trails = [];
    const trailColors = [0xFF4B1F, 0x8C1017, 0xC9A24B];

    for (let i = 0; i < trailCount; i++) {
      const isLeft = Math.random() > 0.5;
      const x = isLeft ? -2 - Math.random() * 8 : 2 + Math.random() * 8;
      const y = 0.5 + Math.random() * 4;
      const z = -Math.random() * 250;
      const speed = isReduced ? 0 : 2.2 + Math.random() * 3.5;
      const length = 15 + Math.random() * 30;
      const color = trailColors[Math.floor(Math.random() * trailColors.length)];

      const points = [
        new THREE.Vector3(x, y, z),
        new THREE.Vector3(x, y, z - length)
      ];
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.75
      });
      const line = new THREE.Line(geom, mat);
      scene.add(line);

      trails.push({ line, x, y, z, speed, length, geom });
    }

    // Road Grid
    const roadGeom = new THREE.PlaneGeometry(30, 350, 6, 25);
    const roadMat = new THREE.MeshBasicMaterial({
      color: 0x0E0C0A,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const road = new THREE.Mesh(roadGeom, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0, -150);
    scene.add(road);

    let reqId;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (!isReduced) {
        for (let i = 0; i < trails.length; i++) {
          const t = trails[i];
          t.z += t.speed;
          if (t.z > 30) {
            t.z = -250;
          }
          const positions = t.geom.attributes.position.array;
          positions[2] = t.z;
          positions[5] = t.z - t.length;
          t.geom.attributes.position.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(reqId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      roadGeom.dispose();
      roadMat.dispose();
      trails.forEach((t) => {
        t.geom.dispose();
        t.line.material.dispose();
      });
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isReduced]);

  return (
    <div ref={containerRef} className={`hyperspeed-container ${className}`} aria-hidden="true" />
  );
}
