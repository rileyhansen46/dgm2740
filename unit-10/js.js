const btn = document.getElementById("hamburgerBtn");
const ulNav = document.querySelector(".ul-nav");
const subNav = document.querySelector(".sub-nav");


btn.addEventListener("click", () => {
  console.log("Mobile nav toggled: ✔️");

  btn.classList.toggle("open");
  ulNav.classList.toggle("hidden");

  document.querySelector('.openText').classList.toggle('hidden')
  document.querySelector('.closeText').classList.toggle('hidden')
});

subNav.addEventListener("mouseover", () => {
  document.querySelector(".sub-ul").classList.remove("hidden");
});
subNav.addEventListener("mouseleave", () => {
  document.querySelector(".sub-ul").classList.add("hidden");
});