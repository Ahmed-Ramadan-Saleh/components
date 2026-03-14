const magnet = document.getElementById("magnet");
const btn = magnet.querySelector(".btn");

magnet.addEventListener("mousemove", (e) => {
  // 1. Get bounds of the container
  const rect = magnet.getBoundingClientRect();

  // 2. Calculate center
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  // 3. Calculate distance from mouse to center
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  // 4. Apply transform (Reduce factor 0.3 for subtle movement)
  btn.style.transform = `translate(${deltaX * 0.3}px, ${deltaY * 0.3}px)`;
});

magnet.addEventListener("mouseleave", () => {
  // Reset position smoothly
  btn.style.transform = "translate(0, 0)";
});
