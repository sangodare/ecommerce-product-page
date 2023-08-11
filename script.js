'use strict';

const mobileNavDisplay = document.querySelector('.mobile-nav-display');
const primaryNav = document.querySelector('.primary-nav');
const mobileNavClose = document.querySelector('.mobile-nav-close');
const overlay = document.querySelector('.overlay');
const cartIcon = document.querySelector('.cart-icon');
const unitOnCart = document.querySelector('.cart-unit');
const cart = document.querySelector('.cart');
const cartEmpty = document.querySelector('.cart-empty');
const cartPopulated = document.querySelector('.cart-populated');
const cartDeleteIcon = document.querySelector('.cart-delete-icon');
const unitInput = document.querySelector('.unit-selection');
const increaseUnitInput = document.querySelector('.plus');
const decreaseUnitInput = document.querySelector('.minus');
const shoeImages = document.querySelectorAll('.shoe-img');
const shoeImageDisplayed = document.querySelector('.shoe-img--active');
const sliderBtnRight = document.querySelector('.slider-container-right');
const sliderBtnLeft = document.querySelector('.slider-container-left');
const thumbnails = document.querySelectorAll('.thumbnail');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const lightboxSliderBtnRight = document.querySelector('.lb-slider-container-right');
const lightboxSliderBtnLeft = document.querySelector('.lb-slider-container-left');
const lightbox = document.querySelector('.lightbox');
const lightboxImageDisplayed = document.querySelector('.lightbox-img');
const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
const lightboxClose = document.querySelector('.lightbox-close');


let curSlide = 0;
const maxSlide = shoeImages.length;
let displayedImage = 1;
unitInput.value = unitInput.valueAsNumber;

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

function displayEmptyCart() {
    cartEmpty.classList.remove('hidden');
    cartPopulated.classList.add('hidden');
};

function displayPopulatedCart () {
    cartEmpty.classList.add('hidden');
    cartPopulated.classList.remove('hidden');
};

function toggleCart() {
    cart.classList.toggle('hidden');
    if(unitOnCart.classList.contains('hidden')){
       displayEmptyCart();
    }

    if(!unitOnCart.classList.contains('hidden')){
       displayPopulatedCart();
    }
};

function hideCart(e) {
    if(e.target.closest('.cart') == null && !e.target.classList.contains('cart-icon')) {
        cart.classList.add('hidden');
    }
};


function restrictInput(){
    if(unitInput.value.length > unitInput.maxLength) {
        unitInput.value = unitInput.value.slice(0, unitInput.maxLength);
    }
};

function increaseNum() {
    unitInput.value++;
    if(unitInput.value >= 99) unitInput.value = 99;
    restrictInput();
    
};

function decreaseNum(){
   
    if(unitInput.value > 1)  unitInput.value--;
    if(!unitInput.value > 1) unitInput.value = 1;
    restrictInput();

};

function addToCart() {
    if(unitInput.value == ""){
        const markup = `<p class="error-msg">Please specify the number of shoes</p>`;
        const parentEl = document.querySelector('.product-info');
        parentEl.insertAdjacentHTML("beforeend", markup);

        setTimeout(() => {
            document.querySelector('.error-msg').remove();
        }, 3000);
    }

    if(unitInput.value != ""){
        const unit = +unitInput.value;
        const total = unit * 125.00;

       
        unitOnCart.textContent = unitInput.value;
        unitOnCart.classList.remove('hidden');

        document.querySelector('.cart-item-unit').textContent = unitInput.value;
        document.querySelector('.cart-item-total').textContent = `$${total.toFixed(2)}`;
        unitInput.value = "";
    }
};

function deleteCartContent() {
    displayEmptyCart();
    unitOnCart.classList.add('hidden');
};


// slider
function goToSlide(slide) {
    shoeImages.forEach((img, i) => {
        img.style.transform = `translateX(${100 * (i - slide)}%)`;
    });

};

goToSlide(0);

function prevSlide() {
    curSlide === 0 ? curSlide = maxSlide - 1 : curSlide--;
    goToSlide(curSlide);
};

function nextSlide() {
    curSlide === maxSlide - 1 ? curSlide = 0 : curSlide++;
    goToSlide(curSlide);
};

function imageToDisplay(image) {
    shoeImageDisplayed.setAttribute('src', `${image}`);
    lightboxImageDisplayed.setAttribute('src', `${image}`);

};

function activeThumbnail(num) {
    thumbnails.forEach(thumbnail => {
        thumbnail.classList.remove('thumbnail-active');
        document.querySelectorAll(`.thumbnail-${num}`)
        .forEach(thumbnail => thumbnail.classList.add('thumbnail-active'));
    })

};

function displayImage(e) {
    imageToDisplay(e.target.dataset.src);
    activeThumbnail(e.target.dataset.imgThumbnail);

};

function displayLightbox() {
    const mobileView = window.matchMedia('(max-width: 700px)');
    if(mobileView.matches) return;

    displayOverlay();
    lightbox.classList.remove('hidden');
};

function closeLightbox() {
    lightbox.classList.add('hidden');
    hideOverlay();
};

function prevImage() {
    if(displayedImage === 1) displayedImage = 1;
    if(displayedImage > 1) displayedImage--;
    
    const image = `images/image-product-${displayedImage}.jpg`;
    
    imageToDisplay(image);
    activeThumbnail(displayedImage);

};

function nextImage() {
    if(displayedImage >= 1 && displayedImage < maxSlide) displayedImage++;
    if(displayedImage === maxSlide) displayedImage = maxSlide;
    
    const image = `images/image-product-${displayedImage}.jpg`;

    imageToDisplay(image);
    activeThumbnail(displayedImage);

};


//Event listeners
mobileNavDisplay.addEventListener('click', displayMobileMenu);
mobileNavClose.addEventListener('click', closeMobileMenu);
overlay.addEventListener('click', closeMobileMenu);
cartIcon.addEventListener('click', toggleCart);
cartDeleteIcon.addEventListener('click', deleteCartContent);
sliderBtnLeft.addEventListener('click', prevSlide);
sliderBtnRight.addEventListener('click', nextSlide);
unitInput.addEventListener('input', restrictInput);
increaseUnitInput.addEventListener('click', increaseNum);
decreaseUnitInput.addEventListener('click', decreaseNum);
addToCartBtn.addEventListener('click', addToCart);
thumbnails.forEach(thumbnail => thumbnail.addEventListener('click', displayImage));
shoeImageDisplayed.addEventListener('click', displayLightbox);
lightboxSliderBtnLeft.addEventListener('click', prevImage);
lightboxSliderBtnRight.addEventListener('click', nextImage);
lightboxClose.addEventListener('click', closeLightbox);
overlay.addEventListener('click', closeLightbox);
window.addEventListener('click', hideCart);