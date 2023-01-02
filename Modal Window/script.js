"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const close_modal = document.querySelector(".close-modal");
const show_modal = document.querySelectorAll(".show-modal");

show_modal.forEach((m) => {
  m.addEventListener("click", () => {
    modal.classList.remove("hidden");
    overlay.classList.toggle("hidden");
  });
});

close_modal.addEventListener("click", () => {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
  }
});

overlay.addEventListener("click", () => {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});
