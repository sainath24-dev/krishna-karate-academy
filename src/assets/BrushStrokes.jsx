import React from 'react';

/**
 * Dynamic Japanese/Martial Arts Calligraphy Brush Art (Cyber Gold & Violet Lacquer Splash)
 * Lightweight, GPU-friendly rendering
 */

export function RedBlackBrushArt({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 600 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brushGoldVioletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FECB00" />
          <stop offset="50%" stopColor="#B7CB27" />
          <stop offset="100%" stopColor="#6E4DB9" />
        </linearGradient>

        <linearGradient id="brushOnyxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E192B" />
          <stop offset="50%" stopColor="#0D0B14" />
          <stop offset="100%" stopColor="#010006" />
        </linearGradient>
      </defs>

      {/* Background Violet-Grey Splash Shading */}
      <path
        d="M280 120 C360 80 480 160 440 280 C400 400 320 540 200 580 C120 600 80 500 120 380 C160 260 200 160 280 120 Z"
        fill="#261E38"
        opacity="0.35"
      />

      {/* Main Bold Onyx Vertical Brush Stroke */}
      <path
        d="M180 60 
           C210 40, 260 90, 240 160 
           C220 230, 260 280, 230 360 
           C200 440, 160 520, 100 590 
           C75 620, 50 630, 40 600 
           C30 570, 60 520, 85 450 
           C110 380, 140 290, 130 200 
           C120 110, 150 80, 180 60 Z"
        fill="url(#brushOnyxGrad)"
      />

      {/* Feathered Ink Bristles */}
      <path
        d="M160 120 L130 180 L145 250 L115 320 L130 390 L95 460 L110 520 L75 580"
        stroke="#0D0B14"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="25 15"
      />
      <path
        d="M190 100 L220 180 L200 280 L235 370 L180 480 L140 560"
        stroke="#1E192B"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Dynamic Swooping Cyber Gold & Violet Lacquer Arc */}
      <path
        d="M240 330 
           C300 310, 420 320, 480 380 
           C540 440, 560 540, 480 610 
           C400 680, 280 670, 220 620 
           C260 610, 360 600, 420 540 
           C480 480, 460 410, 400 375 
           C340 340, 270 335, 240 330 Z"
        fill="url(#brushGoldVioletGrad)"
      />

      {/* Gold & Violet Splash Particles */}
      <circle cx="230" cy="335" r="5" fill="#FECB00" />
      <circle cx="260" cy="315" r="6" fill="#FECB00" />
      <circle cx="310" cy="325" r="4" fill="#B7CB27" />
      <circle cx="495" cy="365" r="7" fill="#6E4DB9" />
      <circle cx="535" cy="410" r="5" fill="#6E4DB9" />
      <circle cx="560" cy="490" r="6" fill="#6E4DB9" />
      <circle cx="525" cy="580" r="5" fill="#FECB00" />
      <circle cx="370" cy="655" r="6" fill="#FECB00" />

      {/* Onyx Splatter Droplets */}
      <circle cx="160" cy="50" r="6" fill="#0D0B14" />
      <circle cx="255" cy="75" r="5" fill="#0D0B14" />
      <circle cx="110" cy="230" r="4" fill="#0D0B14" />
      <circle cx="70" cy="410" r="6" fill="#0D0B14" />
      <circle cx="55" cy="540" r="5" fill="#0D0B14" />
      <circle cx="35" cy="625" r="4" fill="#0D0B14" />
    </svg>
  );
}
