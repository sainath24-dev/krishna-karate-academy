import React from 'react';

/**
 * Floating / Shattering Rock & Stone Shards (Anime/Manga Impact Style)
 * GPU-optimized vector rendering
 */

export function FloatingRockShards({ className = '', style = {} }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rockMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A4642" />
          <stop offset="50%" stopColor="#2E2B28" />
          <stop offset="100%" stopColor="#151412" />
        </linearGradient>

        <linearGradient id="rockHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7A746E" />
          <stop offset="100%" stopColor="#3E3A36" />
        </linearGradient>
      </defs>

      {/* Large Top Right Floating Boulder */}
      <g>
        <polygon points="460,30 550,110 520,220 420,200 400,100" fill="url(#rockMainGrad)" />
        <polygon points="460,30 550,110 500,100 400,100" fill="url(#rockHighlight)" opacity="0.6" />
        <polyline points="470,60 490,120 440,160 480,180" stroke="#1F1D1B" strokeWidth="2" />
      </g>

      {/* Bottom Heavy Slab */}
      <g>
        <polygon points="280,480 540,520 500,590 320,580 250,530" fill="url(#rockMainGrad)" />
        <polygon points="280,480 540,520 460,490 300,470" fill="url(#rockHighlight)" opacity="0.7" />
        <polyline points="350,485 410,540 470,515" stroke="#151412" strokeWidth="2.5" />
      </g>

      {/* Left Sharp Shard */}
      <g>
        <polygon points="40,410 160,480 110,500 20,450" fill="url(#rockMainGrad)" />
        <polygon points="40,410 160,480 100,430 20,450" fill="url(#rockHighlight)" opacity="0.5" />
      </g>

      {/* Middle Floating Sharp Shard */}
      <g>
        <polygon points="120,320 210,420 180,440 90,340" fill="url(#rockMainGrad)" />
        <polygon points="120,320 210,420 170,350" fill="url(#rockHighlight)" opacity="0.55" />
      </g>

      {/* Small Floating Debris */}
      <polygon points="270,170 285,185 275,195 260,180" fill="url(#rockMainGrad)" />
      <polygon points="380,220 410,235 395,250 370,230" fill="url(#rockMainGrad)" />
      <polygon points="320,310 390,325 360,345 300,330" fill="url(#rockMainGrad)" />
      <polygon points="240,470 260,510 230,525 220,480" fill="url(#rockMainGrad)" />
      <polygon points="410,380 430,400 415,415 395,395" fill="url(#rockMainGrad)" />
      <polygon points="490,260 510,285 480,295 470,270" fill="url(#rockMainGrad)" />
    </svg>
  );
}
