const heart = document.getElementById("heartIcon");
const container = document.querySelector(".like-container");

function handleLike(e) {
  // 1. Toggle State
  heart.classList.toggle("active");

  // Only burst if activating (liking)
  if (heart.classList.contains("active")) {
    createBurst();
  }
}

function createBurst() {
  // Create 12 particles
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Calculate random angle
    const angle = Math.random() * Math.PI * 2; // Random 360 direction
    const distance = 40 + Math.random() * 40; // Random distance

    // Set target coordinates via CSS variables
    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    particle.style.setProperty("--x", x);
    particle.style.setProperty("--y", y);

    // Random color
    particle.style.background = ["#ff4757", "#ffa502", "#ff6b81"][
      Math.floor(Math.random() * 3)
    ];

    container.appendChild(particle);

    // Clean up DOM after animation
    setTimeout(() => particle.remove(), 600);
  }
}
