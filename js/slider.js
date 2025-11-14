// Чекаємо, поки вся HTML-сторінка повністю завантажиться
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');// Збираємо всі елементи-слайди (картинки або блоки)
    const dots = document.querySelectorAll('.dot');// Збираємо всі точки-перемикачі під слайдером
    const prevBtn = document.querySelector('.slider-btn.prev'); 
    const nextBtn = document.querySelector('.slider-btn.next');
    
    let currentSlide = 0;
    let autoSlideInterval;

    const slideDuration = 6000; // 6 секунд

    //  ФУНКЦІЯ ПОКАЗУ СЛАЙДА 
    function showSlide(index) {
        // Ховаємо всі слайди (знімаємо клас "active")
        slides.forEach(slide => slide.classList.remove('active'));

        // Деактивуємо всі точки
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Показуємо потрібний слайд (додаємо клас "active")
        slides[index].classList.add('active');

        // Активуємо відповідну точку
        dots[index].classList.add('active');

        // Оновлюємо номер поточного слайда
        currentSlide = index;
    }

    //  ФУНКЦІЯ ДЛЯ ПЕРЕХОДУ НА НАСТУПНИЙ СЛАЙД 
    function nextSlide() {
        // Обчислюємо наступний індекс
        // % slides.length для переходу від останнього слайда до першого
        const nextIndex = (currentSlide + 1) % slides.length;

        showSlide(nextIndex);
    }

    function prevSlide() {
        //циклічний перехід назад, додаємо slides.length і беремо модуль
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    //автоперемотка зображень 
    function startAutoSlide() {
        // зупиняємо, щоб не створити кілька інтервалів
        stopAutoSlide();

        // автоматичне перемикання раз на slideDuration мс
        autoSlideInterval = setInterval(nextSlide, slideDuration);
    }

    //  зупинка автоперемотки
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    //  коректна робота при діях користувача
    function handleUserInteraction() {
        // Зупиняємо автоперемотку, коли користувач натискає кнопки або точки
        stopAutoSlide();
        // Перезапускаємо автоперемотку тільки через повну затримку
        setTimeout(startAutoSlide, slideDuration);
    }

    // -------- ОБРОБНИКИ ПОДІЙ НА КНОПКИ --------
    if (nextBtn) nextBtn.addEventListener('click', function() {
        nextSlide(); // змінюємо слайд
        handleUserInteraction(); // зупиняємо і перезапускаємо таймер
    });

    if (prevBtn) prevBtn.addEventListener('click', function() {
        prevSlide(); // функція prevSlide має бути описана раніше
        handleUserInteraction();
    });

    // клік по крапках
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            // Отримуємо номер слайда з атрибута data-slide
            const slideIndex = parseInt(this.getAttribute('data-slide'));

            showSlide(slideIndex); // показуємо вибраний слайд
            handleUserInteraction(); // перезапускаємо автопрокрутку
        });
    });

    //  ЗУПИНКА АВТОПРОКРУТКИ ПРИ НАВЕДЕННІ МИШІ 
    const slider = document.querySelector('.slider');

    if (slider) {
        // Якщо мишка зайшла на слайдер — стоп
        slider.addEventListener('mouseenter', stopAutoSlide);

        // Якщо мишка пішла — запускаємо авто знову
        slider.addEventListener('mouseleave', startAutoSlide);
    }

    // -------- ПЕРЕЗАПУСК СЛАЙДЕРА ПРИ ЗМІНІ РОЗМІРУ ВІКНА --------
    window.addEventListener('resize', function() {
        startAutoSlide();
    });

    // -------- ПОЧАТКОВИЙ ЗАПУСК СЛАЙДЕРА --------
    showSlide(0);     // показати перший слайд
    startAutoSlide(); // увімкнути автоперемотку
});
