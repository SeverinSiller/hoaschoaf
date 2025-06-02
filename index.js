"use strict";

const openMobileMenu = document.querySelector(".hamburger-icon");
const mobileMenuClose = document.querySelector(".cross-container");
const menuMobile = document.querySelector(".menu-mobile");

const displayMobileMenu = function () {
  menuMobile.style.display = "flex";
};

const dontDisplayMobileMenu = function () {
  menuMobile.style.display = "none";
};

openMobileMenu.addEventListener("click", displayMobileMenu);
mobileMenuClose.addEventListener("click", dontDisplayMobileMenu);
menuMobile.addEventListener("click", dontDisplayMobileMenu);
