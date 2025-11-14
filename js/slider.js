// js/slider.js - надійна проста версія
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    let autoSlideInterval;
    const slideDuration = 6000;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    function handleUserInteraction() {
        stopAutoSlide();
        // Перезапускаємо через повний інтервал після взаємодії
        setTimeout(startAutoSlide, slideDuration);
    }

    // Обробники подій
    if (nextBtn) nextBtn.addEventListener('click', function() {
        nextSlide();
        handleUserInteraction();
    });

    if (prevBtn) prevBtn.addEventListener('click', function() {
        prevSlide();
        handleUserInteraction();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            handleUserInteraction();
        });
    });

    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
    }

    // ВАЖЛИВО: Перезапуск слайдера при зміні розміру вікна
    window.addEventListener('resize', function() {
        startAutoSlide();
    });

    // Запуск
    showSlide(0);
    startAutoSlide();
});