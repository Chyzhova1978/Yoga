// Сучасний (Строгий) режим
"use strict"

const headerBurger = document.querySelector(".header__burger")
const headerMenu = document.querySelector("#header-menu")

if (headerBurger && headerMenu) {
  const setMenuOpen = (open) => {
    headerMenu.classList.toggle("is-open", open)
    headerBurger.classList.toggle("is-open", open)
    headerBurger.setAttribute("aria-expanded", open ? "true" : "false")
    headerBurger.setAttribute("aria-label", open ? "Close menu" : "Open menu")
    document.body.classList.toggle("header-menu-open", open)
  }

  headerBurger.addEventListener("click", (event) => {
    event.stopPropagation()
    setMenuOpen(!headerMenu.classList.contains("is-open"))
  })

  headerMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false))
  })

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && headerMenu.classList.contains("is-open")) {
      setMenuOpen(false)
    }
  })

  document.addEventListener("click", (event) => {
    if (
      headerMenu.classList.contains("is-open") &&
      !event.target.closest(".header__body")
    ) {
      setMenuOpen(false)
    }
  })
}

const aboutCards = document.querySelectorAll(".about__card");
const aboutDrawer = document.querySelector("#about-drawer");

if (aboutCards.length && aboutDrawer) {
  const toggleDrawer = (selectedCard) => {
    const shouldOpen = !selectedCard.classList.contains("is-active");

    aboutCards.forEach((card) => {
      card.classList.remove("is-active");
      card.setAttribute("aria-expanded", "false");
    });

    if (!shouldOpen) {
      aboutDrawer.classList.remove("is-open");
      aboutDrawer.setAttribute("aria-hidden", "true");
      return;
    }

    selectedCard.classList.add("is-active");
    selectedCard.setAttribute("aria-expanded", "true");
    aboutDrawer.classList.add("is-open");
    aboutDrawer.setAttribute("aria-hidden", "false");
  };

  aboutCards.forEach((card) => {
    card.addEventListener("click", () => toggleDrawer(card));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleDrawer(card);
      }
    });
  });
}

