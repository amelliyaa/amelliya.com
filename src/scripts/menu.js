const mobileMenuButton = document.getElementById("mobile-menu-button");
const navMenu = document.getElementById("nav-menu");
const menuItems = navMenu.querySelectorAll("li > a");
const breakpoint = window.matchMedia("(min-width: 36rem)");

const toggleDropdown = () => {
  navMenu.classList.toggle("show");

  if (mobileMenuButton.getAttribute("aria-expanded") === "false") {
    // dropdown was opened
    mobileMenuButton.setAttribute("aria-expanded", "true");
    setScrolling(true);
    addToFocusOrder();
  } else {
    // dropdown was closed
    mobileMenuButton.setAttribute("aria-expanded", "false");
    setScrolling(false);
    removeFromFocusOrder();
  }
};

const addToFocusOrder = () => {
  menuItems.forEach((menuItem) => {
    menuItem.removeAttribute("tabIndex");
  });
};

const removeFromFocusOrder = () => {
  menuItems.forEach((menuItem) => {
    menuItem.tabIndex = -1;
  });
};

const setScrolling = (bool) => {
  document.body.classList.toggle("no-scroll", bool);
};

mobileMenuButton.addEventListener("click", toggleDropdown);

breakpoint.addEventListener("change", ({ matches: isWide }) => {
  if (mobileMenuButton.getAttribute("aria-expanded") === "true") {
    // dropdown was visible
    if (isWide) {
      setScrolling(false);
      addToFocusOrder();
    } else {
      setScrolling(true);
    }
  } else {
    // dropdown was not visible
    if (isWide) {
      addToFocusOrder();
    } else {
      removeFromFocusOrder();
    }
  }
});

window.addEventListener("load", () => {
  if (!breakpoint.matches) {
    removeFromFocusOrder();
  }
});
