document.addEventListener("astro:page-load", () => {
  const menu = document.getElementById("menu");
  const menuButton = document.getElementById("menu-button");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const breakpoint = window.matchMedia("(min-width: 36rem)");

  const togglePageFocus = (focusable) => {
    document.body.classList.toggle("no-scroll", !focusable);

    if (focusable) {
      main.removeAttribute("inert");
      footer.removeAttribute("inert");
    } else {
      main.setAttribute("inert", "true");
      footer.setAttribute("inert", "true");
    }
  };

  const toggleMenuFocus = (focusable) => {
    if (focusable) {
      menu.removeAttribute("inert");
    } else {
      menu.setAttribute("inert", "true");
    }
  };

  const toggleDropdown = (forceMenuFocus = false) => {
    menuButton.setAttribute("aria-expanded", menuButton.checked);
    togglePageFocus(!menuButton.checked);
    toggleMenuFocus(menuButton.checked | forceMenuFocus);
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
    if (menuButton.getAttribute("aria-expanded") === "false") {
      // dropdown was not visible
      toggleMenuFocus(hasMenuBar);
    } else if (hasMenuBar) {
      // dropdown was visible
      menuButton.checked = false;
      toggleDropdown(true);
    }
  });

  // inverse breakpoint so even if no js the user can still tab through the page
  if (!breakpoint.matches) {
    menu.setAttribute("inert", "true");
  }
});
