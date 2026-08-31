/**
 * Canvas Texture & Procedural Imagery Generator for Krishna Karate Academy
 * Generates clean, high-quality Karate Dojo visuals (cushioned training floor,
 * punching bags, trophies, equipment racks, and 360 tour panorama).
 */

export function generateDojoFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // Base dark obsidian training floor
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1080);
  bgGrad.addColorStop(0, '#0D0B14');
  bgGrad.addColorStop(0.5, '#06050A');
  bgGrad.addColorStop(1, '#010006');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1920, 1080);

  // Training mat grid lines
  ctx.strokeStyle = 'rgba(254, 203, 0, 0.2)';
  ctx.lineWidth = 2;
  const stepX = 240;
  const stepY = 120;

  for (let x = 0; x <= 1920; x += stepX) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1080);
    ctx.stroke();
  }

  for (let y = 0; y <= 1080; y += stepY) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1920, y);
    ctx.stroke();
  }

  // Central Violet Match Ring
  ctx.strokeStyle = '#6E4DB9';
  ctx.lineWidth = 10;
  ctx.strokeRect(360, 180, 1200, 720);

  // Central Academy Emblem Circle
  const centerGrad = ctx.createRadialGradient(960, 540, 20, 960, 540, 360);
  centerGrad.addColorStop(0, 'rgba(254, 203, 0, 0.25)');
  centerGrad.addColorStop(0.7, 'rgba(110, 77, 185, 0.15)');
  centerGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = centerGrad;
  ctx.beginPath();
  ctx.arc(960, 540, 360, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#FECB00';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Academy Name in English
  ctx.fillStyle = '#FECB00';
  ctx.font = 'bold 36px "Anton", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('KRISHNA KARATE ACADEMY', 960, 530);

  ctx.fillStyle = '#EEEAE9';
  ctx.font = '600 18px "Work Sans", sans-serif';
  ctx.fillText('DISCIPLINE · FITNESS · SELF DEFENSE', 960, 565);

  return canvas.toDataURL('image/jpeg', 0.92);
}

/**
 * Generates an equirectangular 360 panorama texture in clean English with Cyber Gold & Violet palette
 */
export function generateDojo360Panorama() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Background atmospheric gradient
  const grad = ctx.createLinearGradient(0, 0, 0, 1024);
  grad.addColorStop(0, '#040308');    // Ceiling
  grad.addColorStop(0.35, '#0E0B18'); // Wall horizon
  grad.addColorStop(0.65, '#151124'); // Mat floor reflection
  grad.addColorStop(1, '#010006');    // Floor center
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 2048, 1024);

  // Ceiling Beams
  ctx.fillStyle = '#0B0912';
  for (let x = 0; x < 2048; x += 128) {
    ctx.fillRect(x, 0, 28, 360);
    ctx.strokeStyle = 'rgba(254, 203, 0, 0.15)';
    ctx.strokeRect(x, 0, 28, 360);
  }

  // Banners on Walls in English
  const banners = [
    { x: 180, line1: 'KRISHNA', line2: 'KARATE', sub: 'ESTD 1996' },
    { x: 700, line1: 'SELF', line2: 'DEFENSE', sub: 'FOR ALL AGES' },
    { x: 1220, line1: 'NATIONAL', line2: 'CHAMPIONS', sub: 'GOLD MEDALISTS' },
    { x: 1740, line1: 'DISCIPLINE', line2: '& FITNESS', sub: 'BLACK BELT GOAL' }
  ];

  banners.forEach((b) => {
    ctx.fillStyle = '#6E4DB9';
    ctx.fillRect(b.x, 240, 160, 280);
    ctx.strokeStyle = '#FECB00';
    ctx.lineWidth = 3;
    ctx.strokeRect(b.x, 240, 160, 280);

    // Gold rod header & footer
    ctx.fillStyle = '#FECB00';
    ctx.fillRect(b.x - 10, 235, 180, 8);
    ctx.fillRect(b.x - 10, 517, 180, 8);

    // English Text
    ctx.fillStyle = '#EEEAE9';
    ctx.font = 'bold 24px "Anton", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(b.line1, b.x + 80, 320);
    ctx.fillText(b.line2, b.x + 80, 355);

    ctx.fillStyle = '#FECB00';
    ctx.font = 'bold 13px "JetBrains Mono", monospace';
    ctx.fillText(b.sub, b.x + 80, 440);
  });

  // Trophy & Awards Showcase (Front Wall at x: 940)
  ctx.fillStyle = '#141022';
  ctx.fillRect(920, 300, 280, 170);
  ctx.strokeStyle = '#FECB00';
  ctx.lineWidth = 3;
  ctx.strokeRect(920, 300, 280, 170);

  ctx.fillStyle = '#FECB00';
  ctx.font = 'bold 18px "Anton", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('NATIONAL TROPHY SHOWCASE', 1060, 340);

  ctx.fillStyle = '#B7CB27';
  ctx.font = 'bold 12px "JetBrains Mono", monospace';
  ctx.fillText('48+ NATIONAL GOLD MEDALS', 1060, 370);

  ctx.fillStyle = '#EEEAE9';
  ctx.font = '13px "Work Sans", sans-serif';
  ctx.fillText('STATE & NATIONAL CHAMPIONSHIPS', 1060, 420);

  // Heavy Punching Bags (x: 480 and x: 1520)
  [480, 1520].forEach((bagX) => {
    ctx.fillStyle = '#6E4DB9';
    ctx.fillRect(bagX, 390, 45, 230);
    ctx.strokeStyle = '#FECB00';
    ctx.lineWidth = 2;
    ctx.strokeRect(bagX, 390, 45, 230);

    ctx.strokeStyle = '#FECB00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bagX + 22, 360);
    ctx.lineTo(bagX + 22, 390);
    ctx.stroke();

    ctx.fillStyle = '#EEEAE9';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('POWER BAG', bagX + 22, 510);
  });

  // Safety Equipment & Gear Rack at x: 40
  ctx.fillStyle = '#110E1C';
  ctx.fillRect(40, 360, 100, 240);
  ctx.strokeStyle = 'rgba(254, 203, 0, 0.4)';
  ctx.strokeRect(40, 360, 100, 240);

  ctx.fillStyle = '#FECB00';
  ctx.font = 'bold 11px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SAFETY GEAR', 90, 390);

  // Training Mat Floor Grid
  ctx.strokeStyle = 'rgba(254, 203, 0, 0.2)';
  ctx.lineWidth = 2;
  for (let y = 580; y <= 1024; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(2048, y);
    ctx.stroke();
  }
  for (let x = 0; x <= 2048; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 580);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }

  // Violet Ring on the Floor
  ctx.strokeStyle = 'rgba(110, 77, 185, 0.7)';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.ellipse(1024, 800, 600, 170, 0, 0, Math.PI * 2);
  ctx.stroke();

  return canvas.toDataURL('image/jpeg', 0.95);
}
