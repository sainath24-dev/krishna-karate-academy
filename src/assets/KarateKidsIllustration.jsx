import React from 'react';

export function KarateKidsIllustration({ className = '' }) {
  return (
    <div className={`karate-kids-wrapper ${className}`}>
      <svg
        viewBox="0 0 700 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="karate-kids-svg"
        role="img"
        aria-label="Kids practicing karate stances"
      >
        <defs>
          <linearGradient id="giWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#EDE6D8" />
            <stop offset="100%" stopColor="#D5CBB9" />
          </linearGradient>

          <linearGradient id="giShadeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E2DAC9" />
            <stop offset="100%" stopColor="#B3A996" />
          </linearGradient>

          <linearGradient id="skinTone1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5CBA7" />
            <stop offset="100%" stopColor="#D68910" />
          </linearGradient>

          <linearGradient id="skinTone2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ECC2A0" />
            <stop offset="100%" stopColor="#C67D34" />
          </linearGradient>

          <linearGradient id="redBeltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4B1F" />
            <stop offset="100%" stopColor="#8C1017" />
          </linearGradient>

          <linearGradient id="goldBeltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#C9A24B" />
          </linearGradient>

          <linearGradient id="blackBeltGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2A2622" />
            <stop offset="100%" stopColor="#0B0A08" />
          </linearGradient>

          <filter id="emberGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="characterShadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Ambient Floor Glow under feet */}
        <ellipse cx="350" cy="580" rx="300" ry="40" fill="radial-gradient(circle, rgba(255,75,31,0.2) 0%, transparent 70%)" />
        <ellipse cx="350" cy="580" rx="240" ry="25" fill="#8C1017" opacity="0.15" />

        {/* =========================================================
            KID 1 (LEFT BACKGROUND - BOY IN HIGH KICK / CHAMBER STANCE)
            ========================================================= */}
        <g filter="url(#characterShadow)" opacity="0.95" transform="translate(-10, -20)">
          {/* Head & Hair */}
          <path d="M190 190 Q170 170 195 140 Q225 125 245 150 Q260 175 240 200 Z" fill="#1C140E" />
          <circle cx="215" cy="180" r="24" fill="url(#skinTone1)" />
          {/* Face profile */}
          <path d="M225 175 Q235 180 226 190" stroke="#8C4B1A" strokeWidth="2" fill="none" />
          <circle cx="222" cy="176" r="2.5" fill="#1A1108" />
          {/* Headband / Tenugui */}
          <path d="M195 168 L240 160 L242 168 L196 176 Z" fill="#8C1017" />

          {/* Torso & Gi */}
          <path d="M185 204 L255 204 L265 310 L175 310 Z" fill="url(#giWhiteGrad)" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M185 204 L225 270 L255 204" fill="none" stroke="#B3A996" strokeWidth="3" />
          {/* Black Belt */}
          <path d="M174 290 L266 290 L264 308 L175 308 Z" fill="url(#blackBeltGrad)" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M210 308 L200 370 L212 372 L220 308 Z" fill="#0B0A08" />
          <path d="M220 308 L228 360 L238 358 L228 308 Z" fill="#1F1B17" />

          {/* Left Punch Arm */}
          <path d="M185 210 L120 230 L110 215 L175 198 Z" fill="url(#giWhiteGrad)" />
          <circle cx="108" cy="222" r="12" fill="url(#skinTone1)" stroke="#8C4B1A" strokeWidth="1.5" />

          {/* Chambered Arm */}
          <path d="M255 210 L285 240 L275 258 L245 235 Z" fill="url(#giWhiteGrad)" />
          <circle cx="282" cy="252" r="11" fill="url(#skinTone1)" />

          {/* High Side Kick Leg */}
          <path d="M245 305 L310 260 L360 220 L350 200 L285 250 L235 305 Z" fill="url(#giWhiteGrad)" stroke="#B3A996" strokeWidth="1.5" />
          <path d="M355 210 L395 175 L410 190 L370 225 Z" fill="url(#skinTone1)" stroke="#8C4B1A" strokeWidth="2" />

          {/* Supporting Stance Leg */}
          <path d="M185 310 L170 420 L160 500 L200 500 L215 420 L210 310 Z" fill="url(#giShadeGrad)" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M160 500 L140 515 L190 518 L200 500 Z" fill="url(#skinTone1)" />
        </g>

        {/* =========================================================
            KID 2 (RIGHT BACKGROUND - BOY IN DYNAMIC READY GUARD STANCE)
            ========================================================= */}
        <g filter="url(#characterShadow)" opacity="0.95" transform="translate(60, 10)">
          {/* Head & Hair */}
          <path d="M460 170 Q430 140 480 120 Q520 130 520 170 Q510 195 470 190 Z" fill="#140E0A" />
          <circle cx="485" cy="165" r="22" fill="url(#skinTone2)" />
          <path d="M472 165 Q480 168 475 175" stroke="#8C4B1A" strokeWidth="2" fill="none" />
          <circle cx="475" cy="160" r="2.5" fill="#1A1108" />

          {/* Torso & Gi */}
          <path d="M450 190 L525 190 L535 295 L440 295 Z" fill="url(#giWhiteGrad)" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M450 190 L488 250 L525 190" fill="none" stroke="#B3A996" strokeWidth="3" />

          {/* Yellow/Gold Belt */}
          <path d="M438 280 L537 280 L535 298 L440 298 Z" fill="url(#goldBeltGrad)" stroke="#8C1017" strokeWidth="1.5" />
          <path d="M480 298 L475 350 L486 352 L490 298 Z" fill="#C9A24B" />

          {/* Forward Guard Arm */}
          <path d="M450 200 L395 215 L385 195 L445 185 Z" fill="url(#giWhiteGrad)" />
          <circle cx="385" cy="205" r="12" fill="url(#skinTone2)" stroke="#8C4B1A" strokeWidth="1.5" />

          {/* Rear Guard Arm */}
          <path d="M525 195 L565 220 L555 240 L515 220 Z" fill="url(#giWhiteGrad)" />
          <circle cx="565" cy="230" r="11" fill="url(#skinTone2)" />

          {/* Back Stance Legs (Kokutsu-Dachi) */}
          {/* Front Leg */}
          <path d="M455 295 L430 390 L410 475 L450 480 L470 390 L485 295 Z" fill="url(#giWhiteGrad)" stroke="#B3A996" strokeWidth="1.5" />
          <path d="M410 475 L385 490 L435 495 L450 480 Z" fill="url(#skinTone2)" />

          {/* Rear Deep Leg */}
          <path d="M505 295 L555 375 L590 465 L550 475 L525 385 L485 295 Z" fill="url(#giShadeGrad)" stroke="#C9A24B" strokeWidth="1.5" />
          <path d="M590 465 L620 480 L570 485 L550 475 Z" fill="url(#skinTone2)" />
        </g>

        {/* =========================================================
            KID 3 (CENTER FOREGROUND - GIRL IN POWERFUL FRONT PUNCH STANCE)
            ========================================================= */}
        <g filter="url(#characterShadow)">
          {/* Head & Ponytail Hair */}
          <path d="M300 135 Q260 90 320 80 Q390 90 380 140 Q370 170 320 165 Z" fill="#1F1610" />
          {/* Ponytail whipping back */}
          <path d="M280 115 Q220 100 190 140 Q230 160 275 130 Z" fill="#140E0A" />
          <circle cx="340" cy="140" r="26" fill="url(#skinTone1)" />
          {/* Determined Face */}
          <path d="M330 135 Q342 140 334 148" stroke="#8C4B1A" strokeWidth="2.5" fill="none" />
          <circle cx="332" cy="134" r="3" fill="#1A1108" />
          <path d="M330 126 L340 129" stroke="#1A1108" strokeWidth="2.5" strokeLinecap="round" />
          {/* Red Ribbon */}
          <path d="M280 120 L265 145 L275 148 L285 125 Z" fill="#FF4B1F" />

          {/* Torso & Gi (Crisp White with Gold Stitching) */}
          <path d="M295 170 L385 170 L400 290 L280 290 Z" fill="url(#giWhiteGrad)" stroke="#C9A24B" strokeWidth="2" />
          <path d="M295 170 L340 240 L385 170" fill="none" stroke="#B3A996" strokeWidth="4" />

          {/* Red Belt with Ember Glow */}
          <g filter="url(#emberGlow)">
            <path d="M278 270 L402 270 L400 292 L280 292 Z" fill="url(#redBeltGrad)" stroke="#C9A24B" strokeWidth="1.5" />
          </g>
          <path d="M330 292 L320 375 L335 378 L345 292 Z" fill="#FF4B1F" stroke="#8C1017" strokeWidth="1" />
          <path d="M345 292 L358 365 L372 360 L355 292 Z" fill="#8C1017" />

          {/* Lead Extended Powerful Straight Punch (Gyaku-Zuki) */}
          <path d="M295 180 L180 195 L170 170 L285 158 Z" fill="url(#giWhiteGrad)" stroke="#C9A24B" strokeWidth="1.5" />
          {/* Fist with clenched power */}
          <g filter="url(#emberGlow)">
            <circle cx="160" cy="182" r="16" fill="url(#skinTone1)" stroke="#FF4B1F" strokeWidth="2.5" />
            <path d="M150 174 L170 174 M150 182 L172 182 M150 190 L168 190" stroke="#8C4B1A" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Chambered Pull-back Fist (Hikite) */}
          <path d="M385 180 L435 220 L420 242 L375 210 Z" fill="url(#giWhiteGrad)" stroke="#C9A24B" strokeWidth="1.5" />
          <circle cx="435" cy="235" r="15" fill="url(#skinTone1)" stroke="#8C4B1A" strokeWidth="2" />

          {/* Deep Low Front Stance (Zenkutsu-Dachi) */}
          {/* Front Bent Leg */}
          <path d="M290 290 L240 400 L210 495 L265 505 L295 400 L340 290 Z" fill="url(#giWhiteGrad)" stroke="#C9A24B" strokeWidth="2" />
          <path d="M210 495 L175 520 L245 525 L265 505 Z" fill="url(#skinTone1)" stroke="#8C4B1A" strokeWidth="2" />

          {/* Rear Locked Leg */}
          <path d="M350 290 L440 395 L500 500 L450 515 L395 405 L325 290 Z" fill="url(#giShadeGrad)" stroke="#C9A24B" strokeWidth="2" />
          <path d="M500 500 L535 525 L470 530 L450 515 Z" fill="url(#skinTone1)" stroke="#8C4B1A" strokeWidth="2" />
        </g>

        {/* Energy sparks around the punch */}
        <g filter="url(#emberGlow)">
          <path d="M135 182 L110 182 M145 160 L125 145 M145 204 L125 219" stroke="#FF4B1F" strokeWidth="3" strokeLinecap="round" />
          <circle cx="118" cy="182" r="3" fill="#FFF5EA" />
          <circle cx="130" cy="150" r="2.5" fill="#FFD700" />
          <circle cx="130" cy="214" r="2.5" fill="#FF4B1F" />
        </g>
      </svg>
    </div>
  );
}
