const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
  });
});

/* Carrusel de servicios (solo existe en servicios.html) */
const carouselTrack = document.querySelector(".carousel-track");

if (carouselTrack) {
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  // Cuánto se desplaza cada clic: una tarjeta más el espacio entre tarjetas
  function getStep() {
    const item = carouselTrack.querySelector(".service-item");
    const gap = parseFloat(getComputedStyle(carouselTrack).columnGap) || 0;
    return item.getBoundingClientRect().width + gap;
  }

  // Desactiva las flechas cuando no hay más servicios en esa dirección
  function updateArrows() {
    const maxScroll = carouselTrack.scrollWidth - carouselTrack.clientWidth;
    prevButton.disabled = carouselTrack.scrollLeft <= 1;
    nextButton.disabled = carouselTrack.scrollLeft >= maxScroll - 1;
  }

  prevButton.addEventListener("click", () => {
    carouselTrack.scrollBy({ left: -getStep() });
  });
  nextButton.addEventListener("click", () => {
    carouselTrack.scrollBy({ left: getStep() });
  });

  carouselTrack.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();
}
