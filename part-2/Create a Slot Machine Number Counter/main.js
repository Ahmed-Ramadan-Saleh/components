const reel = document.getElementById("reel");

// 1. Populate the reel
for (let i = 0; i <= 9; i++) {
  const div = document.createElement("div");
  div.className = "number";
  div.innerText = i;
  reel.appendChild(div);
}

function spin() {
  // 2. Generate random target (0-9)
  const target = Math.floor(Math.random() * 10);

  // 3. Calculate translation (height * target)
  // We move UP (negative Y) to show the correct number
  const translation = target * -100;

  // 4. Add extra spins for effect (loops)
  // If we want to spin 3 full times before landing: (3 * 10 * 100)
  const totalSpin = translation - 3000;

  // Apply spin
  reel.style.transform = `translateY(${totalSpin}px)`;

  // Reset logic for infinite spins (simple version)
  setTimeout(() => {
    // Instantly reset to actual position without animation to loop
    reel.style.transition = "none";
    reel.style.transform = `translateY(${translation}px)`;
    // Re-enable transition for next click
    setTimeout(
      () =>
        (reel.style.transition =
          "transform 1s cubic-bezier(0.25, 0.1, 0.25, 1.3)"),
      10,
    );
  }, 1100);
}
