// Create circles
const circles = [];
for (let i = 0; i < 20; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  document.body.appendChild(circle);
  circles.push(circle);
}

// Track mouse
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate
function animateCircles() {
  let x = mouseX;
  let y = mouseY;

  circles.forEach((circle, index) => {
    // Next circle position
    const nextCircle = circles[index + 1] || circles[0];

    // Smooth follow
    circle.style.left = x + "px";
    circle.style.top = y + "px";

    // Scale down effect
    circle.style.transform = `translate(-50%, -50%) scale(${(20 - index) / 20})`;

    // Update position for next circle
    x += (nextCircle.offsetLeft - x) * 0.3;
    y += (nextCircle.offsetTop - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
