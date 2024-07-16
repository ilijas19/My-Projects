"use strict";
const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  //handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    //clientX returns the horizontal mouse pointer cordinate
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    // update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;

      //limitihg the scrollbar to ddont go outside the content
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    //remove event listerens on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
  //scrollWith return the width of an elements including content not visible on screen due to oveflow

  //slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      // clientWidth returns the vieawable width of element in px
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  const handleSlideButtons = () => {
    slideButtons[0].style.display =
      imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };
  imageList.addEventListener("scroll", () => {
    handleSlideButtons();
    updateScrollThumbPosition();
  });
};

window.addEventListener("load", initSlider);
//toggling menu
//elements
const popupSection = document.querySelector(".popup-section");
const popupMenu = document.querySelector(".popup-menu");
const popupBtn = document.querySelector(".popup-icon");
const popupHeading = document.querySelector(".popup-heading");
const popupItems = document.querySelectorAll(".popup-item");

const menuBtn = document.querySelector(".menu-button");
const creatorInfo = document.querySelector(".creator-info");
//event listeners
const closePopup = function () {
  popupSection.classList.remove("active");
  popupMenu.style.display = "none";
  popupBtn.style.display = "none";
  popupHeading.style.display = "none";
  creatorInfo.style.display = "none";
};
const openPopup = function () {
  popupSection.classList.add("active");
  popupMenu.style.display = "flex";
  popupBtn.style.display = "block";
  popupHeading.style.display = "block";
  creatorInfo.style.display = "block";
};
popupBtn.addEventListener("click", closePopup);

menuBtn.addEventListener("click", openPopup);

popupItems.forEach((item) => {
  item.addEventListener("click", () => {
    closePopup();
  });
});
