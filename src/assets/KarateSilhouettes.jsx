import React from 'react';

/**
 * High-quality Martial Arts Silhouette Components
 * GPU-optimized vector paths
 */

export function KaratePunchSilhouette({ className = '', color = '#EFE7D3' }) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Karate punch stance"
    >
      <g>
        <path
          d="M260 90 C250 70 270 50 290 50 C310 50 325 65 320 90 C315 110 295 115 280 110 Z
             M265 115 L320 115 L350 160 L440 170 C455 172 460 185 450 195 C440 205 425 200 410 198 L345 195 L335 245 L250 245 L230 180 L180 175 C165 175 160 160 170 150 C180 140 195 145 210 148 L255 150 Z
             M240 240 L345 240 L340 260 L240 260 Z
             M240 260 L200 340 L120 420 C105 435 90 440 80 430 C70 420 80 405 95 390 L165 320 L210 260 Z
             M320 260 L380 340 L440 420 C450 435 440 445 425 445 C410 445 395 435 385 420 L330 350 L285 260 Z"
          fill={color}
        />
        <path
          d="M285 240 L280 320 L295 322 L300 240 Z
             M295 240 L308 305 L320 300 L305 240 Z"
          fill="#FF4B1F"
        />
      </g>
    </svg>
  );
}

export function KarateKickSilhouette({ className = '', color = '#EFE7D3' }) {
  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Karate high kick stance"
    >
      <g>
        <path
          d="M380 180 C365 160 385 140 405 140 C425 140 440 155 435 180 C430 200 410 205 395 200 Z
             M375 200 L430 200 L440 240 C450 250 445 265 430 270 L385 260 L360 290 L290 290 L290 230 L350 215 Z
             M290 250 L200 200 L120 140 C105 125 95 100 110 85 C125 70 145 85 160 105 L230 160 L290 210 Z
             M320 280 L315 380 L310 440 C310 455 330 460 345 455 C360 450 355 435 350 420 L355 360 L370 280 Z"
          fill={color}
        />
        <path
          d="M290 280 L360 280 L358 295 L292 295 Z
             M325 295 L320 360 L332 362 L338 295 Z"
          fill="#FF4B1F"
        />
      </g>
    </svg>
  );
}

export function SparringCombatSilhouette({ className = '', color = '#EFE7D3' }) {
  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Karate sparring fight"
    >
      {/* Attacker (Right) */}
      <g opacity="0.95">
        <path
          d="M500 120 C485 105 500 90 520 90 C540 90 550 105 545 125 C540 140 525 145 510 140 Z
             M490 140 L545 140 L520 220 L450 240 L440 180 Z
             M450 220 L360 180 L280 130 C260 115 250 95 265 80 C280 65 300 80 315 98 L390 145 L450 190 Z
             M480 230 L470 340 L455 420 C455 435 475 440 490 435 C505 430 495 410 495 350 L510 240 Z"
          fill={color}
        />
      </g>
      {/* Defender (Left) */}
      <g opacity="0.88">
        <path
          d="M140 200 C125 185 140 170 160 170 C180 170 190 185 185 205 C180 220 165 225 150 220 Z
             M145 220 L195 220 L220 280 L180 300 L140 270 Z
             M200 240 L260 230 C275 230 280 245 270 255 L220 270 Z
             M150 280 L110 370 L60 440 C45 455 35 440 45 425 L90 360 L140 290 Z
             M180 290 L240 370 L290 440 C305 455 320 445 310 430 L260 360 L210 290 Z"
          fill="#C9A24B"
        />
      </g>
    </svg>
  );
}
