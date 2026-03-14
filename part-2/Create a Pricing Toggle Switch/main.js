let isYearly = false;
const toggle = document.getElementById("toggle");
const price = document.getElementById("priceAmount");
const monthlyLabel = document.getElementById("monthlyLabel");
const yearlyLabel = document.getElementById("yearlyLabel");
const saveBadge = document.getElementById("saveBadge");

function togglePrice() {
  isYearly = !isYearly;
  toggle.classList.toggle("active");

  if (isYearly) {
    price.innerText = "15"; // Discounted price
    yearlyLabel.classList.add("active");
    monthlyLabel.classList.remove("active");
    saveBadge.classList.add("show");
  } else {
    price.innerText = "19"; // Normal price
    monthlyLabel.classList.add("active");
    yearlyLabel.classList.remove("active");
    saveBadge.classList.remove("show");
  }
}
