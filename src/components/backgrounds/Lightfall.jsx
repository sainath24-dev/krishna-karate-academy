import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../custom/useReducedMotion';
import './Lightfall.css';

export function Lightfall({
  colors = ['#FF4B1F', '#8C1017', '#C9A24B'],
  backgroundColor = '#0B0A08',
  speed = 0.4,
  streakCount = 3,
  streakWidth = 1.1,
  streakLength = 1.3,
  glow = 1.1,
  density = 0.55,
  twinkle = 0.8,
  zoom = 2.6,
  backgroundGlow = 0.35,
  opacity = 0.9,
  mouseInteraction = true,
  mouseStrength = 0.4,
  mouseRadius = 1,
  className = '',
  style = {}
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

    const mouse = { x: width / 2, y: height / 2, active: false };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    if (mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // Generate Ember / Streak Particles
    const particleCount = Math.floor(60 * density * (width > 768 ? 1 : 0.45));
    const particles = Array.from({ length: particleCount }, () => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        length: (30 + Math.random() * 80) * streakLength * zoom * 0.4,
        width: (1 + Math.random() * 2.5) * streakWidth,
        speed: (0.8 + Math.random() * 2.2) * speed * (isReduced ? 0.05 : 1),
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.2 + Math.random() * 0.75,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04 * twinkle,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: 0.01 + Math.random() * 0.02
      };
    });

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Central warm ember background glow
      if (backgroundGlow > 0) {
        const bgRadial = ctx.createRadialGradient(
          width * 0.5,
          height * 0.4,
          20,
          width * 0.5,
          height * 0.4,
          Math.max(width, height) * 0.75
        );
        bgRadial.addColorStop(0, 'rgba(140, 16, 23, 0.22)');
        bgRadial.addColorStop(0.5, 'rgba(255, 75, 31, 0.08)');
        bgRadial.addColorStop(1, 'transparent');
        ctx.fillStyle = bgRadial;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.save();
      ctx.globalAlpha = opacity;

      particles.forEach((p) => {
        // Update physics
        p.y += p.speed;
        p.swayAngle += p.swaySpeed;
        p.x += Math.sin(p.swayAngle) * 0.35;
        p.twinklePhase += p.twinkleSpeed;

        // Mouse interaction push
        if (mouseInteraction && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200 * mouseRadius;
          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * mouseStrength * 4;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Wrap around
        if (p.y - p.length > height) {
          p.y = -p.length;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        // Draw Ember Streak
        const currentAlpha = Math.max(
          0.1,
          p.opacity * (0.6 + 0.4 * Math.sin(p.twinklePhase))
        );

        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.width;
        ctx.lineCap = 'round';
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12 * glow;

        const streakGrad = ctx.createLinearGradient(
          p.x,
          p.y - p.length,
          p.x,
          p.y
        );
        streakGrad.addColorStop(0, 'transparent');
        streakGrad.addColorStop(0.7, p.color);
        streakGrad.addColorStop(1, '#FFF5EA');

        ctx.strokeStyle = streakGrad;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - p.length);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Tip spark point
        ctx.fillStyle = '#FFF5EA';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.width * 0.85, 0, Math.PI * 2);
        ctx.fill();
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
      if (mouseInteraction) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [
    colors,
    backgroundColor,
    speed,
    streakWidth,
    streakLength,
    glow,
    density,
    twinkle,
    zoom,
    backgroundGlow,
    opacity,
    mouseInteraction,
    mouseStrength,
    mouseRadius,
    isReduced
  ]);

  return (
    <div className={`lightfall-container ${className}`} style={style} aria-hidden="true">
      <canvas ref={canvasRef} className="lightfall-canvas" />
    </div>
  );
}
