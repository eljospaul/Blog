
$(function () {

    "use strict";


    /* ===============================  Carousel slider  =============================== */

    var galleryText = new Swiper('.works-ma .gallery-text .swiper-container', {
        spaceBetween: 30,
        slidesPerView: 1,
        direction: 'vertical',
        loop: true,
        loopedSlides: 4,
        touchRatio: 0.2,
        slideToClickedSlide: true,
        speed: 1500,
    });

    var galleryImg = new Swiper('.works-ma .gallery-img .swiper-container', {
        spaceBetween: 40,
        centeredSlides: true,
        loop: true,
        loopedSlides: 4,
        speed: 1500,
        navigation: {
            nextEl: '.works-ma .swiper-controls .swiper-button-next',
            prevEl: '.works-ma .swiper-controls .swiper-button-prev',
        },
        pagination: {
            el: '.works-ma .swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">' + '<svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">' +
                    '<circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"' +
                    'stroke-opacity="1" stroke-width="1px"></circle>' +
                    '<circle cx="8" cy="8" r="3" fill="#FFF"></circle>' +
                    '</svg></span>';
            },

        },
        keyboard: {
            enabled: true,
        },

        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 30,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 2,
            },
        }
    });

    galleryImg.on("slideChangeTransitionStart", function () {
        galleryText.slideTo(galleryImg.activeIndex);
    });
    galleryText.on("transitionStart", function () {
        galleryImg.slideTo(galleryText.activeIndex);
    });


    var testim = new Swiper(".testimonials-ds .testim-swiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        speed: 1500,
        autoplay: {
            delay: 5000,
        },
        loop: true,
        pagination: {
            el: ".testimonials-ds .swiper-pagination",
            clickable: true,
        },
    });


    if (window.innerWidth > 991) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-ma .bg-img",
                start: "top",
                endTrigger: ".about-ma",
                end: "bottom bottom",
                pin: true, 
                pinSpacing: false
            }
        });
    } 


});