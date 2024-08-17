const body = document.querySelector("body");
const header = document.querySelector("header");

let lastScrollY = 0;
let offset = 0;
let debounce = false;

const clamp = (num, min, max) => Math.min(Math.max(min, num), max);

const onScroll = () => {
  if (body.classList.contains("no-scroll")) return;

  const scrollY = window.scrollY;
  const scrolledBy = lastScrollY - scrollY;

  offset = clamp(offset + scrolledBy, -header.offsetHeight, 0);
  header.style.transform = "translateY(" + offset + "px)";

  lastScrollY = scrollY;
};

window.addEventListener("scroll", () => {
  if (!debounce) {
    debounce = true;
    window.requestAnimationFrame(onScroll);
    debounce = false;
  }
});
