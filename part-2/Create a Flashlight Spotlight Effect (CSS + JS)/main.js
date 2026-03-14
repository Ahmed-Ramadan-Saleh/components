const glow = document.getElementById("glow");

document.addEventListener("mousemove", (e) => {
  // Update CSS variables for background
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");

  // Move the glow div
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
