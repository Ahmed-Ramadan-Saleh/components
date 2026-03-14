const ball = document.getElementById("ball");
const springLine = document.getElementById("springLine");

// Center point
let centerX = window.innerWidth / 2;
let centerY = window.innerHeight / 2;

// Position & Physics
let posX = centerX,
  posY = centerY;
let velX = 0,
  velY = 0;
const stiffness = 0.1; // Spring strength
const damping = 0.8; // Friction
let isDragging = false;

// Center the ball initially
ball.style.left = posX - 50 + "px";
ball.style.top = posY - 50 + "px";

// Drag Start
ball.addEventListener("mousedown", () => (isDragging = true));
ball.addEventListener("touchstart", () => (isDragging = true));

// Drag End
window.addEventListener("mouseup", () => (isDragging = false));
window.addEventListener("touchend", () => (isDragging = false));

// Move
window.addEventListener("mousemove", (e) => {
  if (isDragging) {
    posX = e.clientX;
    posY = e.clientY;
  }
});

// Animation Loop
function update() {
  if (!isDragging) {
    // Spring Force (Hook's Law simplified)
    let dx = posX - centerX;
    let dy = posY - centerY;

    velX += -dx * stiffness; // Pull back to center
    velY += -dy * stiffness;

    velX *= damping; // Lose energy
    velY *= damping;

    posX += velX;
    posY += velY;
  }

  // Apply to DOM
  ball.style.left = posX - 50 + "px";
  ball.style.top = posY - 50 + "px";

  // Draw Spring Line
  const dist = Math.sqrt((posX - centerX) ** 2 + (posY - centerY) ** 2);
  const angle = Math.atan2(posY - centerY, posX - centerX);

  springLine.style.width = dist + "px";
  springLine.style.left = centerX + "px";
  springLine.style.top = centerY + "px";
  springLine.style.transform = `rotate(${angle}rad)`;

  requestAnimationFrame(update);
}

update();
