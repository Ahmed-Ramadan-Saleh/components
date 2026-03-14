const textElement = document.getElementById("text");
const words = ["Developer.", "Designer.", "Creator."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentWord = words[wordIndex];

  // Typing
  if (!isDeleting) {
    textElement.innerText = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      isDeleting = true; // Start deleting after a pause
      setTimeout(type, 1500); // Wait before deleting
      return;
    }
  }
  // Deleting
  else {
    textElement.innerText = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length; // Next word
    }
  }

  const speed = isDeleting ? 50 : 100; // Delete faster than type
  setTimeout(type, speed);
}

// Start
type();
