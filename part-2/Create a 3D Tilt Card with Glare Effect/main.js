const card = document.getElementById("card");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // 1. Calculate Tilt
  const rotateX = (y - centerY) / 10;
  const rotateY = (centerX - x) / 10;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

  // 2. Update Glare Position
  const percentX = (x / rect.width) * 100;
  const percentY = (y / rect.height) * 100;
  card.querySelector(".glare").style.setProperty("--mouse-x", percentX + "%");
  card.querySelector(".glare").style.setProperty("--mouse-y", percentY + "%");
});

card.addEventListener("mouseleave", () => {
  card.style.transform = "rotateX(0) rotateY(0) scale(1)";
});
