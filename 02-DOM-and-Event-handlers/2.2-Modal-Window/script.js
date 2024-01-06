"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener("click", openModal);

  btnsOpenModal[i].addEventListener("keydown", function (e) {
    if (e.key === "Enter" && modal.classList.contains("hidden")) {
      openModal();
    }
  });
}

btnCloseModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  // console.log("Key pressed!");
  // console.log(typeof e.key, e.key);

  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// document.addEventListener("keydown", function (e) {
//   // console.log("Key pressed!");
//   // console.log(typeof e.key, e.key);

//   if (e.key === "Enter") {
//     openModal();
//   }
// });

//! MY ATTEMPT
/*
console.log(btnsOpenModal);

for (let i = 0; i < btnsOpenModal.length; i++) {
  // btnsOpenModal[i].textContent = i;
  btnsOpenModal[i].addEventListener("click", function () {
    // modal.style.display = "block";
    // overlay.style.display = "block";
    modal.className = "modal";
    overlay.className = "overlay";
  });
}

btnCloseModal.addEventListener("click", function () {
  // modal.style.display = "none";
  // overlay.style.display = "none";
  modal.className = "hidden";
  overlay.className = "hidden";
});

modal.addEventListener("KeyboardEvent", function () {
  modal.style.display = "none";
});

overlay.addEventListener("click", function () {
  // modal.style.display = "none";
  // overlay.style.display = "none";
  modal.className = "hidden";
  overlay.className = "hidden";
});
*/
