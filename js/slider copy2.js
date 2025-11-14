// js/slider.js
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');
    
    console.log('Slides found:', slides.length);
    console.log('Dots found:', dots.length);
    console.log('Prev button:', prev);
    console.log('Next button:', next);

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        console.log('Showing slide:', index);
        
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prevIndex);
    }

    // Додаємо обробники подій тільки якщо кнопки існують
    if (prev) {
        prev.addEventListener('click', prevSlide);
    }
    
    if (next) {
        next.addEventListener('click', nextSlide);
    }

    // Додаємо обробники для точок
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });

    // Автоматична зміна слайдів
    let autoSlide = setInterval(nextSlide, 5000);

    // Зупинка автоматичної зміни при наведенні
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            console.log('Mouse entered - stopping auto slide');
            clearInterval(autoSlide);
        });
        
        slider.addEventListener('mouseleave', () => {
            console.log('Mouse left - starting auto slide');
            autoSlide = setInterval(nextSlide, 5000);
        });
    }

    // Показуємо перший слайд
    showSlide(0);
});