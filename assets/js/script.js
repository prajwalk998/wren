'use strict';

/**
 * Helper: safe event binding
 */
const addEventOnElements = function (elements, eventType, callback) {
  if (!elements) return;
  elements.forEach(el => el.addEventListener(eventType, callback));
};

/**
 * MOBILE NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");

if (navbar && navTogglers.length) {
  const toggleNav = () => {
    navbar.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  };

  addEventOnElements(navTogglers, "click", toggleNav);
}

/**
 * HEADER + BACK TO TOP
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", () => {
  if (!header || !backTopBtn) return;

  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

/**
 * SLIDER (SAFE VERSION)
 */
const slider = document.querySelector("[data-slider]");
const sliderContainer = document.querySelector("[data-slider-container]");
const sliderPrevBtn = document.querySelector("[data-slider-prev]");
const sliderNextBtn = document.querySelector("[data-slider-next]");

if (slider && sliderContainer && sliderPrevBtn && sliderNextBtn) {

  let currentSlidePos = 0;

  const getVisibleItems = () =>
    Number(getComputedStyle(slider).getPropertyValue("--slider-items")) || 1;

  const updateLimits = () => {
    const visible = getVisibleItems();
    return Math.max(0, sliderContainer.children.length - visible);
  };

  let totalSlidableItems = updateLimits();

  const moveSlider = () => {
    const item = sliderContainer.children[currentSlidePos];
    if (!item) return;

    sliderContainer.style.transform = `translateX(-${item.offsetLeft}px)`;
  };

  const slideNext = () => {
    totalSlidableItems = updateLimits();

    currentSlidePos =
      currentSlidePos >= totalSlidableItems ? 0 : currentSlidePos + 1;

    moveSlider();
  };

  const slidePrev = () => {
    totalSlidableItems = updateLimits();

    currentSlidePos =
      currentSlidePos <= 0 ? totalSlidableItems : currentSlidePos - 1;

    moveSlider();
  };

  sliderNextBtn.addEventListener("click", slideNext);
  sliderPrevBtn.addEventListener("click", slidePrev);

  window.addEventListener("resize", () => {
    totalSlidableItems = updateLimits();
    moveSlider();
  });
}