const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const navMobile = document.getElementById("navMobile");
const mobileOverlay = document.getElementById("mobileOverlay");
const searchBtn = document.getElementById("searchBtn");
const searchModal = document.getElementById("searchModal");
const searchClose = document.getElementById("searchClose");
const searchInput = document.getElementById("searchInput");

// Scroll Effect
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.pageYOffset > 50);
});

// Mobile Menu
function toggleMenu() {
  menuBtn.classList.toggle("active");
  navMobile.classList.toggle("open");
  mobileOverlay.classList.toggle("show");
  document.body.style.overflow = navMobile.classList.contains("open")
    ? "hidden"
    : "";
}
menuBtn.addEventListener("click", toggleMenu);
mobileOverlay.addEventListener("click", toggleMenu);

// Search Modal
function openSearch() {
  searchModal.classList.add("show");
  document.body.style.overflow = "hidden";
  setTimeout(() => searchInput.focus(), 300);
}
function closeSearch() {
  searchModal.classList.remove("show");
  document.body.style.overflow = "";
}
searchBtn.addEventListener("click", openSearch);
searchClose.addEventListener("click", closeSearch);
searchModal.addEventListener("click", (e) => {
  if (e.target === searchModal) closeSearch();
});

// Keyboard Shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeSearch();
    if (navMobile.classList.contains("open")) toggleMenu();
  }
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    openSearch();
  }
});
