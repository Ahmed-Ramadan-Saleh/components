const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
const targetText = "ACCESS GRANTED";
const textElement = document.getElementById("text");

function scramble() {
  let iterations = 0;
  const interval = setInterval(() => {
    // Generate random text
    const scrambled = targetText
      .split("")
      .map((char, index) => {
        if (index < iterations) return targetText[index];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    textElement.innerText = scrambled;

    // Stop when done
    if (iterations >= targetText.length) clearInterval(interval);

    iterations += 1 / 3; // Adjust speed
  }, 30);
}

// Run every 3 seconds
scramble();
setInterval(scramble, 3000);
