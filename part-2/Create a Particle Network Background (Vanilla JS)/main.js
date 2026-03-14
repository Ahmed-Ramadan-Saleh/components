const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height, particles;
const particleCount = 80;
const connectionDistance = 120;
const mouseDistance = 150;

let mouse = { x: null, y: null };

// Resize Handler
window.addEventListener("resize", () => {
  width = canvas.width = innerWidth;
  height = canvas.height = innerHeight;
  init();
});

// Mouse Track
window.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Particle Class
class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1; // Velocity
    this.vy = (Math.random() - 0.5) * 1;
    this.size = 2;
  }

  update() {
    // Bounce off walls
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    ctx.fillStyle = "#00d4aa";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Init
function init() {
  width = canvas.width = innerWidth;
  height = canvas.height = innerHeight;
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// Animate
function animate() {
  ctx.clearRect(0, 0, width, height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });

  // Connect Particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.strokeStyle = `rgba(0, 212, 170, ${1 - distance / connectionDistance})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(animate);
}

init();
animate();
