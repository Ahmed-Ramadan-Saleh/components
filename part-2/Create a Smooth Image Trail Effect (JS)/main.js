const container = document.getElementById("trailContainer");
const images = [
  "https://picsum.photos/id/10/250/150",
  "https://picsum.photos/id/20/250/150",
  "https://picsum.photos/id/30/250/150",
  "https://picsum.photos/id/40/250/150",
];

let currentImgIndex = 0;
let mouseX = 0,
  mouseY = 0;

// Track Mouse
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Create Image on interval (Simplification for Short)
setInterval(() => {
  createImage();
}, 300);

function createImage() {
  const img = document.createElement("img");
  img.src = images[currentImgIndex];
  img.className = "trail-img";
  img.style.left = mouseX + "px";
  img.style.top = mouseY + "px";

  container.appendChild(img);

  // Trigger Animation
  setTimeout(() => {
    img.style.opacity = "1";
    img.style.transform = "scale(1) translate(-50%, -50%)";
  }, 10);

  // Remove after delay
  setTimeout(() => {
    img.style.opacity = "0";
    img.style.transform = "scale(0.5) translate(-50%, -50%)";
    setTimeout(() => img.remove(), 300);
  }, 600);

  // Cycle images
  currentImgIndex = (currentImgIndex + 1) % images.length;
}
