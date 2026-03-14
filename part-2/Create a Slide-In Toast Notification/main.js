function showToast() {
  const container = document.getElementById("container");

  // 1. Create the Element
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid fa-check"></i></div>
        <div class="toast-text">
          <h4>Success!</h4>
          <p>Your file has been saved.</p>
        </div>
      `;

  // 2. Append to container
  container.appendChild(toast);

  // 3. Trigger Animation (needs delay for reflow)
  setTimeout(() => toast.classList.add("show"), 10);

  // 4. Remove after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    // Remove from DOM after animation
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
