// Оптимізований бургер-меню з підтримкою якорів
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav__toggle');
    const list = document.querySelector('.nav__list'); // Це ваш контейнер меню
    const links = document.querySelectorAll('.nav__link');
    const body = document.body;
    
    if (!toggle || !list) return;

    // Стан меню
    let isMenuOpen = false;

    // Функції управління меню
    const openMenu = () => {
        isMenuOpen = true;
        toggle.classList.add('nav__toggle--active');
        list.classList.add('nav__list--active'); // Використовуємо правильний клас
        body.classList.add('menu-open');
        
        // Оновлюємо ARIA-атрибути для доступності
        toggle.setAttribute('aria-expanded', 'true');
        list.setAttribute('aria-hidden', 'false');
    };

    const closeMenu = () => {
        isMenuOpen = false;
        toggle.classList.remove('nav__toggle--active');
        list.classList.remove('nav__list--active'); // Використовуємо правильний клас
        body.classList.remove('menu-open');
        
        // Оновлюємо ARIA-атрибути для доступності
        toggle.setAttribute('aria-expanded', 'false');
        list.setAttribute('aria-hidden', 'true');
    };

    // Переключення меню
    const toggleMenu = () => {
        isMenuOpen ? closeMenu() : openMenu();
    };

    // Події для бургер-кнопки
    toggle.addEventListener('click', (e) => {
        e.preventDefault(); 
        toggleMenu();
    });

    // Закриття меню при натисканні на посилання
    links.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Закриття при натисканні Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
            toggle.focus(); // Повертаємо фокус на кнопку
        }
    });

    // Закриття при зміні розміру вікна (перехід на десктоп)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMenu();
        }
    });

    // Функція для відстеження активної секції при прокрутці
    const observeActiveSections = () => {
        const sections = document.querySelectorAll('section[id], article[id]');
        const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
                    
                    if (activeLink) {
                        navLinks.forEach(link => link.classList.remove('nav__link--active'));
                        activeLink.classList.add('nav__link--active');
                    }
                }
            });
        }, {
            threshold: 0.6,
            rootMargin: '-78px 0px -50% 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    };

    observeActiveSections(); 
});