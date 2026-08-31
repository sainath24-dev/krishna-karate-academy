import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';
import './SideRays.css';

export function SideRays({
  speed = 1.2,
  rayColor1 = '#FF4B1F',
  rayColor2 = '#C9A24B',
  intensity = 1.6,
  spread = 1.4,
  origin = 'top-right',
  tilt = -8,
  saturation = 1.2,
  blend = 0.6,
  falloff = 1.8,
  opacity = 0.85,
  className = ''
}) {
  const canvasRef = useRef(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const rayCount = 14;
    const rays = Array.from({ length: rayCount }, (_, i) => ({
      angleOffset: ((i / rayCount) * 0.8 - 0.4) * spread,
      width: (25 + Math.random() * 45) * spread,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: (0.015 + Math.random() * 0.02) * speed * (isReduced ? 0.05 : 1),
      color: i % 2 === 0 ? rayColor1 : rayColor2,
      baseOpacity: 0.15 + Math.random() * 0.35
    }));

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const originX = origin.includes('right') ? width * 1.05 : width * -0.05;
      const originY = origin.includes('top') ? height * -0.05 : height * 1.05;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.globalCompositeOperation = 'screen';

      rays.forEach((ray) => {
        ray.phase += ray.phaseSpeed;
        const currentAlpha = ray.baseOpacity * (0.6 + 0.4 * Math.sin(ray.phase)) * (intensity / 1.5);

        const rayGrad = ctx.createRadialGradient(
          originX,
          originY,
          10,
          originX,
          originY,
          Math.max(width, height) * 1.2
        );
        rayGrad.addColorStop(0, ray.color);
        rayGrad.addColorStop(0.3 / falloff, ray.color);
        rayGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = rayGrad;
        ctx.save();
        ctx.translate(originX, originY);
        ctx.rotate((tilt * Math.PI) / 180 + ray.angleOffset + Math.sin(ray.phase * 0.5) * 0.03);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-ray.width, Math.max(width, height) * 1.5);
        ctx.lineTo(ray.width, Math.max(width, height) * 1.5);
        ctx.closePath();

        ctx.globalAlpha = Math.min(1, currentAlpha);
        ctx.fill();
        ctx.restore();
      });

      ctx.restore();

      if (!isReduced) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [
    speed,
    rayColor1,
    rayColor2,
    intensity,
    spread,
    origin,
    tilt,
    saturation,
    blend,
    falloff,
    opacity,
    isReduced
  ]);

  return (
    <div className={`side-rays-container ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="side-rays-canvas" />
    </div>
  );
}
