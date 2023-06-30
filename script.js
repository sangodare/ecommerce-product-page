'use strict';

const mobileNavDisplay = document.querySelector('.mobile-nav-display');
const primaryNav = document.querySelector('.primary-nav');
const mobileNavClose = document.querySelector('.mobile-nav-close');
const overlay = document.querySelector('.overlay');

//Functions
function displayMobileMenu() {
    primaryNav.setAttribute('data-visible', true);
    mobileNavDisplay.setAttribute('aria-expanded', true);
    displayOverlay();
};

function closeMobileMenu() {
    primaryNav.setAttribute('data-visible', false);
    mobileNavDisplay.setAttribute('aria-expanded', false);
    hideOverlay();
};

function displayOverlay() {
    overlay.classList.remove('overlay-hidden');
};

function hideOverlay() {
    overlay.classList.add('overlay-hidden');
};


//Event listeners
mobileNavDisplay.addEventListener('click', displayMobileMenu);
mobileNavClose.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);