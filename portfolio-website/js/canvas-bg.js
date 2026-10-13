/**
 * Interactive HTML5 Canvas Constellation / Particle Network
 * High-performance animated background responding to cursor movement
 */
class CanvasBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.particles = [];
    this.particleCount = 65;
    this.maxDistance = 140;
    this.mouseDistance = 160;

    this.mouse = {
      x: null,
      y: null,
      radius: this.mouseDistance
    };

    this.themeColors = {
      cyan: { r: 6, g: 182, b: 212 },
      violet: { r: 139, g: 92, b: 246 },
      emerald: { r: 16, g: 185, b: 129 }
    };
    this.currentColor = this.themeColors.cyan;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    this.createParticles();
    this.animate();
  }

  setThemeColor(themeName) {
    if (this.themeColors[themeName]) {
      this.currentColor = this.themeColors[themeName];
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Adjust density based on screen size
    if (this.width < 768) {
      this.particleCount = 35;
      this.maxDistance = 90;
    } else {
      this.particleCount = 70;
      this.maxDistance = 135;
    }
    this.createParticles();
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.3
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const { r, g, b } = this.currentColor;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Move particle
      p.x += p.vx;
      p.y += p.vy;

      // Bounce on boundary
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Interactive mouse attraction/interaction
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.mouseDistance) {
          // Subtle gravitation towards cursor
          const force = (1 - dist / this.mouseDistance) * 0.05;
          p.x += (dx / dist) * force * 5;
          p.y += (dy / dist) * force * 5;

          // Connect to cursor
          const mouseAlpha = (1 - dist / this.mouseDistance) * 0.6;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${mouseAlpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
      this.ctx.fill();

      // Inter-particle constellation lines
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p2.x - p.x, p2.y - p.y);

        if (dist < this.maxDistance) {
          const lineAlpha = (1 - dist / this.maxDistance) * 0.22;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Global initialization
window.canvasBgInstance = null;
document.addEventListener('DOMContentLoaded', () => {
  window.canvasBgInstance = new CanvasBackground('canvas-backdrop');
});
