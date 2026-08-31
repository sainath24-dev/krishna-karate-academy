import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from './useReducedMotion';
import { generateDojo360Panorama } from '../../assets/dojoCanvasGenerator';
import './DojoViewer360.css';

const HOTSPOTS = [
  {
    id: 'trophy',
    title: 'National Trophies & Awards',
    category: 'CHAMPIONS',
    desc: 'Showcase of 48+ National Gold Medals and State Championship cups won by our students across India.',
    yaw: 0,
    pitch: 5
  },
  {
    id: 'punchbags',
    title: 'Heavy Punching Bags',
    category: 'POWER ZONE',
    desc: 'Heavy striking bags for building punch speed, kick power, endurance, and practical self-defense impact.',
    yaw: 95,
    pitch: -8
  },
  {
    id: 'gear',
    title: 'Safety Gear & Equipment',
    category: 'SAFETY FIRST',
    desc: 'Quality padded headguards, chest guards, sparring gloves, and focus pads to ensure 100% safe training for all age groups.',
    yaw: -85,
    pitch: -5
  },
  {
    id: 'ring',
    title: 'Competition Fight Ring',
    category: 'ARENA',
    desc: 'Shock-absorbing cushioned mats providing safe impact protection for kids, teens, and adults during sparring and throws.',
    yaw: 175,
    pitch: -25
  }
];

export function DojoViewer360({ className = '' }) {
  const containerRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(75);
  const isReduced = useReducedMotion();

  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const lon = useRef(0);
  const lat = useRef(0);
  const targetLon = useRef(0);
  const targetLat = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // Three.js Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(zoomLevel, width / height, 1, 1100);
    camera.target = new THREE.Vector3(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Sphere Geometry with Inverted Normals (inside-out)
    const geometry = new THREE.SphereGeometry(500, 40, 24);
    geometry.scale(-1, 1, 1);

    // Load Procedural 360 Texture
    const textureData = generateDojo360Panorama();
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureData);
    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Observer to pause when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return;

      if (autoRotate && !isDragging.current && !isReduced) {
        targetLon.current += 0.08;
      }

      // Smooth camera interpolation
      lon.current += (targetLon.current - lon.current) * 0.1;
      lat.current += (targetLat.current - lat.current) * 0.1;
      lat.current = Math.max(-85, Math.min(85, lat.current));

      const phi = THREE.MathUtils.degToRad(90 - lat.current);
      const theta = THREE.MathUtils.degToRad(lon.current);

      camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
      camera.target.y = 500 * Math.cos(phi);
      camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(camera.target);
      renderer.render(scene, camera);
    };

    animate();

    // Pointer Drag Handlers
    const onPointerDown = (e) => {
      isDragging.current = true;
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;
      previousMousePosition.current = { x: clientX, y: clientY };
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const clientX = e.clientX || e.touches?.[0]?.clientX || 0;
      const clientY = e.clientY || e.touches?.[0]?.clientY || 0;

      const deltaX = clientX - previousMousePosition.current.x;
      const deltaY = clientY - previousMousePosition.current.y;

      targetLon.current -= deltaX * 0.25;
      targetLat.current += deltaY * 0.25;

      previousMousePosition.current = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

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
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate, isReduced, zoomLevel]);

  const rotateBy = (deltaLon) => {
    targetLon.current += deltaLon;
  };

  const jumpToHotspot = (spot) => {
    targetLon.current = spot.yaw;
    targetLat.current = spot.pitch;
    setActiveHotspot(spot);
  };

  const handleZoom = (delta) => {
    const nextZoom = Math.max(45, Math.min(100, zoomLevel + delta));
    setZoomLevel(nextZoom);
    if (cameraRef.current) {
      cameraRef.current.fov = nextZoom;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  return (
    <div className={`dojo-viewer-wrapper ${className}`}>
      {/* 360 Canvas Viewport */}
      <div ref={containerRef} className="dojo-viewer-canvas-box">
        {/* Affordance drag badge */}
        <div className="dojo-viewer-badge">
          <span className="badge-pulse" />
          <span>360° INTERACTIVE ACADEMY TOUR</span>
        </div>

        {/* Hotspot Quick Markers Toolbar */}
        <div className="dojo-hotspot-toolbar">
          {HOTSPOTS.map((spot) => (
            <button
              key={spot.id}
              type="button"
              className={`btn-hotspot-tab ${activeHotspot?.id === spot.id ? 'is-active' : ''}`}
              onClick={() => jumpToHotspot(spot)}
            >
              <span className="hotspot-bullet">✦</span>
              <span className="hotspot-label">{spot.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Hotspot Modal Card */}
        {activeHotspot && (
          <div className="dojo-hotspot-modal">
            <div className="modal-header">
              <span className="modal-category mono-text">{activeHotspot.category}</span>
              <h4 className="modal-title">{activeHotspot.title}</h4>
              <button
                type="button"
                className="btn-modal-close"
                onClick={() => setActiveHotspot(null)}
                aria-label="Close details"
              >
                ✕
              </button>
            </div>
            <p className="modal-desc">{activeHotspot.desc}</p>
          </div>
        )}

        {/* Accessible Control Bar */}
        <div className="dojo-viewer-controls" role="toolbar" aria-label="360 viewer controls">
          <button
            type="button"
            className="btn-viewer-ctrl"
            onClick={() => rotateBy(35)}
            title="Rotate Left"
            aria-label="Rotate Left"
          >
            ↺
          </button>
          <button
            type="button"
            className="btn-viewer-ctrl"
            onClick={() => rotateBy(-35)}
            title="Rotate Right"
            aria-label="Rotate Right"
          >
            ↻
          </button>
          <button
            type="button"
            className="btn-viewer-ctrl"
            onClick={() => handleZoom(-10)}
            title="Zoom In"
            aria-label="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            className="btn-viewer-ctrl"
            onClick={() => handleZoom(10)}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            −
          </button>
          <button
            type="button"
            className={`btn-viewer-ctrl ${autoRotate ? 'is-active' : ''}`}
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto Rotation"
            aria-label="Toggle Auto Rotation"
          >
            {autoRotate ? '⏸' : '▶'}
          </button>
        </div>
      </div>
    </div>
  );
}
