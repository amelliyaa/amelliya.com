const menu = document.getElementById("menu");
const menuButton = document.getElementById("menu-button");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const breakpoint = window.matchMedia("(min-width: 36rem)");
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

const isMenuOpen = () => menuButton.getAttribute("aria-expanded") === "true";

const togglePageFocus = (focusable) => {
  document.body.classList.toggle("no-scroll", !focusable);

  main.inert = !focusable;
  footer.inert = !focusable;
};

const toggleMenuFocus = (focusable) => {
  menu.inert = !focusable;
};

const toggleDropdown = (forceMenuFocus = false) => {
  menuButton.setAttribute("aria-expanded", String(menuButton.checked));
  togglePageFocus(!menuButton.checked);
  toggleMenuFocus(menuButton.checked || forceMenuFocus);
};

menuButton.addEventListener("click", () => toggleDropdown());

// add enter functionality to checkbox
menuButton.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    menuButton.checked = !menuButton.checked;
    toggleDropdown();
  }
});

breakpoint.addEventListener("change", ({ matches: hasMenuBar }) => {
  if (!isMenuOpen()) {
    // dropdown was not visible
    toggleMenuFocus(hasMenuBar);
  } else if (hasMenuBar) {
    // dropdown was visible
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.checked = false;
    toggleDropdown(true);
  }
});

document.documentElement.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
menuButton.setAttribute("role", "button");
menuButton.setAttribute("aria-haspopup", "menu");
menuButton.setAttribute("aria-controls", "menu");
menuButton.setAttribute("aria-expanded", "false");

// inverse breakpoint so even if no js the user can still tab through the page
if (!breakpoint.matches) {
  menu.inert = true;
}
