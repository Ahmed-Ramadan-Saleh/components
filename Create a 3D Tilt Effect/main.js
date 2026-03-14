const card = document.getElementById("card");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = (y - centerY) / 10; // Vertical tilt
  const rotateY = (centerX - x) / 10; // Horizontal tilt (inverted)

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

  // Update light position for the reflection
  card.style.setProperty("--mouse-x", `${x}px`);
  card.style.setProperty("--mouse-y", `${y}px`);
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
});
