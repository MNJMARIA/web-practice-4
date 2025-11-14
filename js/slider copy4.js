// js/slider.js
document.addEventListener('DOMContentLoaded', function() {
    // Елементи слайдера
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentSlide = 0;
    let autoSlideInterval;
    let progressInterval;
    const slideDuration = 6000; // 6 секунд

    // Функція для показу слайда
    function showSlide(index) {
        // Прибираємо активний клас у всіх слайдів
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Додаємо активний клас поточному слайду та точці
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
        
        // Перезапускаємо анімацію прогресс бару
        restartProgressBar();
    }

    // Наступний слайд
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    // Попередній слайд
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Перезапуск прогресс бару
    function restartProgressBar() {
        // Скидаємо анімацію
        progressBar.style.animation = 'none';
        
        // Невелика затримка для перезапуску анімації
        setTimeout(() => {
            progressBar.style.animation = `progressAnimation ${slideDuration}ms linear`;
        }, 10);
    }

    // Автоматична зміна слайдів
    function startAutoSlide() {
        // Спочатку зупиняємо попередні інтервали
        stopAutoSlide();
        
        // Запускаємо новий інтервал
        autoSlideInterval = setInterval(nextSlide, slideDuration);
        
        // Запускаємо анімацію прогресс бару
        restartProgressBar();
    }

    // Зупинка автоматичної зміни
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        progressBar.style.animation = 'none';
    }

    // Додаємо обробники подій для кнопок
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Обробники для точок
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            if (slideIndex !== currentSlide) {
                showSlide(slideIndex);
                stopAutoSlide();
                startAutoSlide();
            }
        });
    });

    // Зупинка автоматичної зміни при наведенні
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', startAutoSlide);
        slider.addEventListener('touchstart', stopAutoSlide);
        slider.addEventListener('touchend', startAutoSlide);
    }

    // Додаємо CSS анімацію для прогресс бару
    const style = document.createElement('style');
    style.textContent = `
        @keyframes progressAnimation {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
        }
    `;
    document.head.appendChild(style);

    // Запускаємо слайдер
    showSlide(0);
    startAutoSlide();

    // Додаємо обробник для переходу між вкладками
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
});