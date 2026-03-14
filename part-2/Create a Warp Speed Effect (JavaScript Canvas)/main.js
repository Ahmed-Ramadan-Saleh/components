const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;

// Resize handler
window.addEventListener("resize", () => {
  width = canvas.width = innerWidth;
  height = canvas.height = innerHeight;
});
// Init size
width = canvas.width = innerWidth;
height = canvas.height = innerHeight;

const stars = [];
const numStars = 400;
const speed = 20; // Warp factor

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    // Start at center
    this.x = (Math.random() - 0.5) * width * 2;
    this.y = (Math.random() - 0.5) * height * 2;
    this.z = Math.random() * width; // Depth
  }

  update() {
    this.z -= speed; // Move towards camera

    if (this.z < 1) {
      this.reset();
      this.z = width;
    }
  }

  draw() {
    // Project 3D to 2D
    let sx = (this.x / this.z) * width + width / 2;
    let sy = (this.y / this.z) * height + height / 2;

    // Calculate size based on distance
    let size = (1 - this.z / width) * 4;

    // Calculate trail length
    let prevX = (this.x / (this.z + speed)) * width + width / 2;
    let prevY = (this.y / (this.z + speed)) * height + height / 2;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(sx, sy);
    ctx.lineWidth = size;
    ctx.strokeStyle = `rgba(255, 255, 255, ${size})`; // Brighter when closer
    ctx.stroke();
  }
}

// Init Stars
for (let i = 0; i < numStars; i++) {
  stars.push(new Star());
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Ghost trail effect
  ctx.fillRect(0, 0, width, height);

  stars.forEach((star) => {
    star.update();
    star.draw();
  });

  requestAnimationFrame(animate);
}

animate();
