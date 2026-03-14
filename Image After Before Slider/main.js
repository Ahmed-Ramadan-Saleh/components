const container = document.getElementById("container");
const beforeImage = document.getElementById("beforeImage");
const handle = document.getElementById("handle");

container.addEventListener("mousemove", (e) => {
  let rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left;

  // Prevent dragging outside bounds
  if (x < 0) x = 0;
  if (x > rect.width) x = rect.width;

  // Calculate percentage
  const percent = (x / rect.width) * 100;

  // Update UI
  handle.style.left = `${percent}%`;
  beforeImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
});
