// Declaring DOM elements
const hamburgerBtn = document.getElementById("hamburgerBtn");

hamburgerBtn.addEventListener("click", () => {
  console.log("✔️");
  document.querySelector(".open").classList.toggle("hidden");
  document.querySelector(".close").classList.toggle("hidden");

  document.querySelector(".ul").classList.toggle("hidden");
});

// poplulatingDOM