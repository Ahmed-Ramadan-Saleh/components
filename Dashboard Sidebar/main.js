const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

// Desktop Toggle
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Active Link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    document
      .querySelectorAll(".nav-link")
      .forEach((l) => l.classList.remove("active"));
    this.classList.add("active");
  });
});
