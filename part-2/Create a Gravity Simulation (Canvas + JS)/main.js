const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set size
canvas.width = innerWidth;
canvas.height = innerHeight;

const colors = ["#00d4aa", "#6366f1", "#f59e0b", "#ec4899"];

// Physics constants
const gravity = 0.5;
const friction = 0.99;
const bounce = 0.8;

// Ball Class
class Ball {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 10,
      y: 0,
    };
  }

  update() {
    // Apply Gravity
    this.velocity.y += gravity;

    // Apply Friction (Air resistance)
    this.velocity.x *= friction;
    this.velocity.y *= friction;

    // Move
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Bounce off bottom
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.velocity.y = -this.velocity.y * bounce; // Reverse and dampen
    }

    // Bounce off sides
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.velocity.x = -this.velocity.x;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

const balls = [];

// Spawn balls on click
addEventListener("click", (e) => {
  const radius = Math.random() * 30 + 10;
  balls.push(
    new Ball(
      e.clientX,
      e.clientY,
      radius,
      colors[Math.floor(Math.random() * colors.length)],
    ),
  );
});

function animate() {
  requestAnimationFrame(animate);

  // Trail effect (instead of clearing completely)
  ctx.fillStyle = "rgba(10, 10, 10, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update();
    ball.draw();
  });
}

animate();
