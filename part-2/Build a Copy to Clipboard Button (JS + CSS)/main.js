function copyText() {
  const text = document.querySelector(".text").innerText;
  const btn = document.getElementById("copyBtn");

  // 1. Copy to clipboard
  navigator.clipboard.writeText(text);

  // 2. Toggle visual state
  btn.classList.add("copied");

  // 3. Reset after 2 seconds
  setTimeout(() => {
    btn.classList.remove("copied");
  }, 2000);
}
