/**
 * PRINCESS DAY - PARTICLES & AMBIENT VISUAL EFFECTS
 * Floating hearts, glowing fireflies, rose petals, and celebration bursts
 */
class PrincessEffects {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.petals = [];
    this.hearts = [];
    this.confetti = [];
    this.isActive = true;
    this.lastTime = performance.now();

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  initParticles() {
    const count = Math.min(window.innerWidth < 768 ? 35 : 65, 75);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 2.5 + 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.2,
        alpha: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        color: Math.random() > 0.4 ? '#ffd700' : '#f472b6'
      });
    }

    // Initialize gentle falling petals
    const petalCount = window.innerWidth < 768 ? 12 : 22;
    this.petals = [];
    for (let i = 0; i < petalCount; i++) {
      this.petals.push(this.createPetal(true));
    }
  }

  createPetal(randomY = false) {
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : -30,
      size: Math.random() * 10 + 12,
      vy: Math.random() * 1.2 + 0.8,
      vx: (Math.random() - 0.5) * 1.0,
      angle: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.03,
      sway: Math.random() * 2,
      swaySpeed: Math.random() * 0.02 + 0.01,
      swayAngle: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '#f472b6' : '#ec4899',
      opacity: Math.random() * 0.4 + 0.5
    };
  }

  // Burst of hearts from a specific coordinate (or center)
  burstHearts(x = this.width / 2, y = this.height / 2, count = 25) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = Math.random() * 4 + 2;
      this.hearts.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        size: Math.random() * 14 + 10,
        alpha: 1,
        life: 1,
        decay: Math.random() * 0.015 + 0.01,
        color: ['#ec4899', '#f43f5e', '#ffd700', '#d946ef', '#fb7185'][Math.floor(Math.random() * 5)]
      });
    }
  }

  // Confetti burst for celebrations
  burstConfetti(x = this.width / 2, y = this.height / 2, count = 50) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.confetti.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        width: Math.random() * 8 + 4,
        height: Math.random() * 12 + 6,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.18,
        alpha: 1,
        decay: Math.random() * 0.012 + 0.008,
        color: ['#ffd700', '#f472b6', '#c084fc', '#38bdf8', '#fb7185', '#ffffff'][Math.floor(Math.random() * 6)]
      });
    }
  }

  animate() {
    if (!this.isActive) return;
    requestAnimationFrame(() => this.animate());

    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Twinkling Fireflies / Stardust
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha += Math.sin(now * p.pulseSpeed) * 0.01;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      const a = Math.max(0.1, Math.min(0.9, p.alpha));
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = a;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.restore();
    }

    // 2. Draw Gentle Rose Petals
    for (let i = 0; i < this.petals.length; i++) {
      const petal = this.petals[i];
      petal.swayAngle += petal.swaySpeed;
      petal.x += petal.vx + Math.sin(petal.swayAngle) * petal.sway;
      petal.y += petal.vy;
      petal.angle += petal.va;

      if (petal.y > this.height + 40 || petal.x < -40 || petal.x > this.width + 40) {
        this.petals[i] = this.createPetal(false);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(petal.x, petal.y);
      this.ctx.rotate(petal.angle);
      this.ctx.scale(Math.cos(petal.swayAngle * 0.8), 1);
      this.ctx.beginPath();
      this.ctx.moveTo(0, -petal.size);
      this.ctx.bezierCurveTo(petal.size * 0.8, -petal.size * 0.7, petal.size * 0.9, petal.size * 0.4, 0, petal.size);
      this.ctx.bezierCurveTo(-petal.size * 0.9, petal.size * 0.4, -petal.size * 0.8, -petal.size * 0.7, 0, -petal.size);
      this.ctx.fillStyle = petal.color;
      this.ctx.globalAlpha = petal.opacity;
      this.ctx.shadowBlur = 4;
      this.ctx.shadowColor = 'rgba(236, 72, 153, 0.4)';
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Draw Burst Hearts
    for (let i = this.hearts.length - 1; i >= 0; i--) {
      const h = this.hearts[i];
      h.x += h.vx;
      h.y += h.vy;
      h.vy += 0.05; // slight gravity
      h.alpha -= h.decay;

      if (h.alpha <= 0) {
        this.hearts.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(h.x, h.y);
      this.ctx.globalAlpha = Math.max(0, h.alpha);
      this.ctx.fillStyle = h.color;
      this.drawHeartShape(this.ctx, h.size);
      this.ctx.restore();
    }

    // 4. Draw Celebration Confetti
    for (let i = this.confetti.length - 1; i >= 0; i--) {
      const c = this.confetti[i];
      c.x += c.vx;
      c.y += c.vy;
      c.vy += c.gravity;
      c.rotation += c.rotSpeed;
      c.alpha -= c.decay;

      if (c.alpha <= 0 || c.y > this.height + 20) {
        this.confetti.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(c.x, c.y);
      this.ctx.rotate((c.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, c.alpha);
      this.ctx.fillStyle = c.color;
      this.ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
      this.ctx.restore();
    }
  }

  drawHeartShape(ctx, size) {
    const s = size / 20;
    ctx.beginPath();
    ctx.moveTo(0, s * -4);
    ctx.bezierCurveTo(-s * 6, s * -12, -s * 15, s * -2, 0, s * 14);
    ctx.bezierCurveTo(s * 15, s * -2, s * 6, s * -12, 0, s * -4);
    ctx.fill();
  }
}
