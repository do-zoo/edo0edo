window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

const hamburger = document.querySelector("#hamburger");
const nav = document.querySelector(".header-nav");

function toggleNav() {
  hamburger.classList.toggle("open");
  nav.classList.toggle("active");
}

hamburger.addEventListener("click", toggleNav);

// msuic loop
const audio = new Audio("./assets/music/fun-life-112188.mp3");
const modal = document.querySelector(".box");
const modalButton = document.querySelector(".modal__btn");
const musicIcon = document.querySelector("#music-icon");
const musicButton = document.querySelector("#music-button");

let isPlay = false;
function toggleMusic() {
  if (isPlay) {
    audio.pause();
    musicIcon.classList.remove("music_spin");
    musicButton.classList.add("music_off");
    musicButton.classList.remove("music_on");
    isPlay = false;
  } else {
    audio.play();
    musicIcon.classList.add("music_spin");
    musicButton.classList.remove("music_off");
    musicButton.classList.add("music_on");
    isPlay = true;
  }
}

modalButton.addEventListener("click", function () {
  audio.loop = true;
  audio.volume = 0.2;
  audio.play();
  musicIcon.classList.add("music_spin");
  modal.classList.add("music_active");
  musicButton.classList.remove("music_off");
  musicButton.classList.add("music_on");
});

musicButton.addEventListener("click", toggleMusic);

let home = document.querySelector("#home");
let about = document.querySelector("#about");
let skills = document.querySelector("#skills");
let portfolio = document.querySelector("#portfolio");

let navHome = document.querySelector("#nav-home");
let navAbout = document.querySelector("#nav-about");
let navSkills = document.querySelector("#nav-skills");
let navPortfolio = document.querySelector("#nav-portfolio");

let menuName = document.querySelector(".menu-name");
let p = document.createElement("p");
let inHome = navHome.innerHTML.split("");

let inAbout = navAbout.innerHTML.split("");
let inSkills = navSkills.innerHTML.split("");
let inPortfolio = navPortfolio.innerHTML.split("");

window.addEventListener("scroll", function (e) {
  let scroll = window.scrollY;
  if (scroll > 0) {
    navHome.classList.add("active");
    navAbout.classList.remove("active");
    navSkills.classList.remove("active");
    portfolio.classList.remove("active");
    menuName.innerHTML = inHome
      .map((item) => {
        return `<p>${item}</p>`;
      })
      .join("");
  }
  if (scroll > about.offsetTop - 100) {
    navAbout.classList.add("active");
    navHome.classList.remove("active");
    navSkills.classList.remove("active");
    navPortfolio.classList.remove("active");
    menuName.innerHTML = inAbout
      .map((item) => {
        return `<p>${item}</p>`;
      })
      .join("");
  }
  if (scroll > skills.offsetTop - 100) {
    navSkills.classList.add("active");
    navHome.classList.remove("active");
    navAbout.classList.remove("active");
    navPortfolio.classList.remove("active");
    menuName.innerHTML = inSkills
      .map((item) => {
        return `<p>${item}</p>`;
      })
      .join("");
  }
  if (scroll > portfolio.offsetTop - 100) {
    navPortfolio.classList.add("active");
    navHome.classList.remove("active");
    navAbout.classList.remove("active");
    navSkills.classList.remove("active");
    menuName.innerHTML = inPortfolio
      .map((item) => {
        return `<p>${item}</p>`;
      })
      .join("");
  }
});
