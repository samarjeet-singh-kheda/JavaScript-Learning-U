"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const header = document.querySelector(".header");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const nav = document.querySelector(".nav");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!        Modal window
const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//!      COOKIE WIDGET

const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>";
header.prepend(message);

const messageBtn = document.querySelector(".btn--close-cookie");

message.style.backgroundColor = "#37383d";
message.style.width = "100vw";
messageBtn.style.fontWeight = "400";

messageBtn.addEventListener("click", () => message.remove());

//!       SMOOTH SCROLLING
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

//!       PAGE NAVIGATION
// document.querySelectorAll(".nav__link").forEach(function (linkEl) {
//   linkEl.addEventListener("click", function (e) {
//     e.preventDefault();

//     const id = this.getAttribute("href");

//     document.querySelector(id).scrollIntoView({
//       behavior: "smooth",
//     });
//   });
// });

//? 1. Add event listener to common parent element
//? 2. Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // MATCHING STRATEGY
  if (
    e.target.classList.contains("nav__link") &&
    !e.target.classList.contains("nav__link--btn")
  ) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

//!       TABBED COMPONENT
tabContainer.addEventListener("click", function (e) {
  // let clicked;

  // if (e.target.classList.contains("operations__tab")) {
  //   clicked = e.target;
  // } else if (e.target.parentElement.classList.contains("operations__tab")) {
  //   clicked = e.target.parentElement;
  // }

  // if (clicked) {
  //   tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));

  //   tabsContent.forEach((tab) =>
  //     tab.classList.remove("operations__content--active")
  //   );

  //   clicked.classList.add("operations__tab--active");

  //   document
  //     .querySelector(`.operations__content--${clicked.dataset.tab}`)
  //     .classList.add("operations__content--active");
  // }

  const clicked = e.target.closest(".operations__tab");

  //*   GUARD CLAUSE (modern approach to the above logic)
  if (!clicked) return;

  /**
   *  removing active class form all the tabs, then adding it to the targeted one
   */
  //?   removing active classes
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((tab) =>
    tab.classList.remove("operations__content--active")
  );

  //?   adding active tab
  clicked.classList.add("operations__tab--active");

  //?   adding active content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//!       MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//?       it is impossible to pass multiple arguments in an event handler function, that's we got a work around it by assigning "this" equals the arguments required
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

const initialCoordinate = section1.getBoundingClientRect().top;

//!       STICKY NAVIGATION BAR
//?   only window have "scroll" event, this should not be used as it is bad for performance as window event is fired all the time on every little scroll
// window.addEventListener("scroll", function () {
//   // if (section1.getBoundingClientRect().top <= 0) {
//   //   nav.classList.add("sticky");
//   // } else {
//   //   nav.classList.remove("sticky");
//   // }

//   if (initialCoordinate < this.scrollY) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  entry.isIntersecting
    ? nav.classList.remove("sticky")
    : nav.classList.add("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//!       REVEAL SECTIONS
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.16,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//!       LAZY LOADING IMAGES
// const imgTargets = document.querySelectorAll(".features__img");

const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imageObserver.observe(img));

//!       SLIDER COMPONENT
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const sliderBtnRight = document.querySelector(".slider__btn--right");
  const sliderBtnLeft = document.querySelector(".slider__btn--left");
  const dotContainer = document.querySelector(".dots");

  let currSlide = 0;

  //?      FUNCTIONS FOR SLIDER COMPONENT
  const createDots = function () {
    slides.forEach((_, idx) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${idx}"></button>`
      );
    });
  };

  const activateDot = (currSlide) => {
    // document
    //   .querySelectorAll(".dots__dot")
    //   .forEach((dot, i) =>
    //     i === currSlide
    //       ? dot.classList.add("dots__dot--active")
    //       : dot.classList.remove("dots__dot--active")
    //   );

    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide='${currSlide}']`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (currSlide) {
    slides.forEach(
      (slide, idx) =>
        (slide.style.transform = `translateX(${(idx - currSlide) * 100}%)`)
    );
    activateDot(currSlide);
  };

  const nextSlide = function () {
    currSlide++;

    if (currSlide >= slides.length) currSlide = 0;

    goToSlide(currSlide);
  };

  const prevSlide = function () {
    if (currSlide === 0) currSlide = slides.length - 1;
    else currSlide--;

    goToSlide(currSlide);
  };

  const init = function () {
    createDots();
    goToSlide(currSlide);
  };

  init();

  //?      EVENT HANDLERS FOR SLIDER COMPONENT
  sliderBtnRight.addEventListener("click", nextSlide);
  sliderBtnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      currSlide = +e.target.dataset.slide;
      goToSlide(currSlide);
    }
  });
};
slider();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 




//! ***************************************** SELECTING HTML ELEMENTS *****************************************

console.log(document);
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

//?     "querySelectorAll" returns NodeList
const header = document.querySelector(".header");
console.log(header);
const allSections = document.querySelectorAll(".section");
console.log(allSections);

console.log(document.getElementById("section--1"));

//?     "getElementsByTagName" & "getElementsByClassName" returns HTMLCollection
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

console.log(document.getElementsByClassName("btn"));

//! **************************************** CREATING AND INSERTING HTML ****************************************

//?   1) **************************
// document
//   .querySelector(".header__title")
//   .insertAdjacentHTML("afterbegin", "<p>How are you?</p>");

//?   2) **************************

const message = document.createElement("div");

message.classList.add("cookie-message");

// message.textContent =
//   "We use cookies for improved functionality and analytics.";
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie' style='font-family: serif'>Got it!</button>";
console.log(message);

//*   prepend and append can also be used to move elements

header.prepend(message);
//?     Inserts nodes before the first child of node, while replacing strings in nodes with equivalent Text nodes.

// header.append(message);
//?     Inserts nodes after the last child of node, while replacing strings in nodes with equivalent Text nodes.

//*   message is a live unique element in DOM and can only be added once
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

//! ***************************************** DELETING HTML ELEMENTS *****************************************
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.remove();
    message.parentElement.removeChild(message); //another way, before introduction of ".remove()"
  });



////////////////////////////////////////////////////////
//! ************************************************** STYLES **************************************************
message.style.backgroundColor = "#37383d";
// message.style.backgroundColor = "teal";
message.style.width = "120%"; //?   proper unit also needs to be mentioned with quantity

console.log(message.style);
//?   "message.style" only have properties set by us, for pre defined properties by user it gives empty string
console.log(message.style.color === ""); //?   true
console.log(message.style.color);
console.log(message.style.fontFamily);
console.log(message.style.backgroundColor);

//?   this function gives all the CSS properties which are either set by us or calculated by browser
console.log(getComputedStyle(message)); //?   object
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height); //?  string

message.style.height = parseInt(getComputedStyle(message).height) + 30 + "px";

//?   custom CSS properties can't be set with "message.style.property", so ".setProperty()" need to be used
//?   ".setProperty()" can be used with any CSS property & it is not limited to just custom ones
document.documentElement.style.setProperty("--color-primary", "orangered");
message.style.setProperty("--color-primary", "#5ec576");




//! ************************************************ ATTRIBUTES ************************************************
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

console.log(logo.src); //?   gives absolute link
console.log(logo.getAttribute("src")); //?   gives relative link

console.log(document.querySelector(".twitter-link").href);
console.log(document.querySelector(".twitter-link").getAttribute("href"));

console.log(document.querySelector(".nav__link--btn").href);
console.log(document.querySelector(".nav__link--btn").getAttribute("href"));

//!  ************************* NON-TRADITIONAL ATTRIBUTES
console.log(logo.designer); //? JS can't read non-traditional attributes like this, that's why .getAttribute is used
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

//!  ************************* DATA ATTRIBUTES
console.log(logo.dataset.versionNumber); //?   all the user defined attributes starting with "data-" prefix are stored in "dataset" object & accessed with ".dataset.camelCaseProperty", these attributes can be used to store data in DOM

console.log(logo.versionNumber);

//!  *************************  CLASSES
console.log(logo.classList); //?   gives DOMTokenList which is live
console.log(...logo.classList);
logo.classList.add("c", "l");
console.log(...logo.classList);

console.log(logo.classList.add("j"));
console.log(logo.classList.add("j", "k"));
console.log(logo.classList.remove("j", "k"));
console.log(logo.classList.toggle("j", true));
console.log(logo.classList.toggle("j", false));
console.log(logo.classList.contains("k"));

console.log(logo.className);
logo.className = "lala"; //?   directly overrides all the classes, above methods do not affect the existing classes
logo.className = "nav__logo lambda";






//! ********************************************* SMOOTH SCROLLING *********************************************

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1cords = section1.getBoundingClientRect();

  console.log("s1cords", s1cords);
  console.log(btnScrollTo.getBoundingClientRect());

  console.log(e.target);
  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll:", scrollX, scrollY);

  console.log(
    "Height/width viewport:",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  scrollTo(s1cords.left, s1cords.top);
  scrollTo(s1cords.left + screenX, s1cords.top + scrollY);

  //?   absolute position = distance of top of element from top of the viewport + vertical scroll
  scrollTo({
    left: s1cords.left + scrollX,
    top: s1cords.top + scrollY,
    behavior: "smooth",
  });

  section1.scrollIntoView(false);

  section1.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
});





//! ********************************************** EVENT HANDLERS **********************************************
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");

  h1.removeEventListener("mouseenter", alertH1);
  h1.removeEventListener("mouseleave", alertH1);
};

h1.addEventListener("mouseenter", alertH1);
h1.addEventListener("mouseenter", alertH1);
h1.addEventListener("mouseenter", alertH1);

h1.onmouseenter = function (e) {
  alert("onmouseenter: Great! You are reading the heading :D");
  g;
};

h1.onmouseenter = alertH1;

h1.addEventListener("mouseenter", () => alert("another one"));

setTimeout(() => {
  h1.removeEventListener("mouseenter", alertH1);
  console.log("eventListener removed successfully! ");
}, 10000);





//! ********************************************* EVENT PROPAGATION *********************************************
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min + 1)) + min;

const randomColorGenerator = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

for (const link of document.querySelectorAll(".nav__link")) {
  link.addEventListener("click", function (e) {
    this.style.backgroundColor = randomColorGenerator();
    console.log("LINK:", e.target, e.currentTarget);
    console.log(e.currentTarget === this);

    //?  STOP PROPAGATION
    e.stopPropagation();
  });
}

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColorGenerator();

  console.log("NAV LINK CONTAINER:", e.target, e.currentTarget);

  console.log(typeof e.target, typeof e.currentTarget);
  console.log(e.currentTarget === this);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColorGenerator();
  console.log("NAVBAR:", e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});

document.querySelector(".nav").addEventListener("dblclick", function (e) {
  this.style.backgroundColor = randomColorGenerator();
  console.log("NAVBAR:", e.target, e.currentTarget);
  console.log(e.currentTarget === this);
});

document.body.addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColorGenerator();
    console.log("MAIN PAGE:", e.target, e.currentTarget);
    console.log(e.currentTarget === this);
  },
  true
);




//! ********************************************** DOM TRAVERSING **********************************************
const h1 = document.querySelector("h1");

console.log(h1);

//*    GOING DOWNWARDS: child
console.log(h1.querySelector(".highlight")); //?     only selects children of "h1" with ".highlight" class
console.log(h1.querySelectorAll(".highlight")); //?   goes as deep as possible

console.log(h1.childNodes); //?   gives all the child nodes including elements, comments & texts
console.log(h1.children); //?     gives live HTMLCollection of elements only (no texts or comments)

console.log(h1.lastElementChild);
console.log(h1.firstElementChild);
console.log(h1.firstChild);
console.log(h1.lastChild);

h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.backgroundColor = "orangered";

//*     GOING UPWARDS: parent
console.log(h1.parentNode);
console.log(h1.parentElement);

console.log(h1.closest(".header"));
h1.closest(".header").style.background = "var(--gradient-secondary)"; //?    returns parent no matter how far up the DOM tree, (kinda like opposite of querySelector)
//?   also accepts strings in the similar format to query selector

console.log(h1.closest("h1"));
h1.closest("h1").style.background = "var(--gradient-primary)";

//*     GOING SIDEWAYS: siblings (can only access immediate siblings)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

//?     to select all sibling nodes of an element, traverse to parent and then return all its children
console.log([...h1.parentElement.children]);
[...h1.parentElement.children].forEach((el) => {
  if (el !== h1) {
    el.style.transform = "scale(0.5)";
  }
});




//!   TABBED COMPONENT (my attempt)
document
  .querySelector(".operations__tab-container")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("operations__tab")) {
      const contentBtn = e.target;
      const contentTab = document.querySelector(
        `.operations__content--${e.target.dataset.tab}`
      );

      [...document.querySelector(".operations").children].forEach(function (
        el
      ) {
        if (el.classList.contains("operations__content")) {
          el.classList.remove("operations__content--active");
        } else {
          [
            ...document.querySelector(".operations__tab-container").children,
          ].forEach((btnEl) =>
            btnEl.classList.remove("operations__tab--active")
          );
        }
      });

      contentBtn.classList.add("operations__tab--active");

      contentTab.classList.add("operations__content--active");
    }
  });




*/

//! ***************************************** INTERSECTION OBSERVER API *****************************************

//?   this callback function will be called each time the observed element is intersecting the root element at the threshold we defined
// const obsCallback = function (entries, observer) {
//   //*   entries here are actually an array of threshold entries

//   entries.forEach((entry) => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null, //? root is the element that the target is intersecting (an element can be selected, or null is selected if we want it to intersect the entire viewport)
//   threshold: [0, 0.2], //?   the fraction of intersection at which the observer callback will be called
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); //?     observing a target

//! ******************************************* LIFECYCLE DOM EVENTS *******************************************
document.addEventListener("DOMContentLoaded", (e) => console.log(e));

window.addEventListener("load", (e) => console.log(e));

window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  console.log(e);
  e.returnValue = "";
});
