/**
 * Оновлений скрипт для бургер-меню з появою з-під хедера
 * Покращена анімація та оптимізована логіка
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav__toggle');
    const list = document.querySelector('.nav__list');
    const links = list ? list.querySelectorAll('.nav__link') : [];
    const header = document.querySelector('.header');

    if (!toggle || !list || !header) {
        console.error('Не вдалося знайти необхідні елементи меню');
        return;
    }

    // Функція для отримання висоти хедера
    function getHeaderHeight() {
        return header.offsetHeight;
    }

    // Встановлення початкових стилів
    function initializeMenu() {
        const headerHeight = getHeaderHeight();
        list.style.top = `${headerHeight}px`;
        
        // Встановлення початкових ARIA атрибутів
        toggle.setAttribute('aria-expanded', 'false');
        list.setAttribute('aria-hidden', 'true');
        list.setAttribute('role', 'navigation');
    }

    // Відкриття меню
    function openMenu() {
        const headerHeight = getHeaderHeight();
        
        // Оновлюємо позицію на випадок зміни висоти хедера
        list.style.top = `${headerHeight}px`;
        
        // Додаємо класи
        toggle.classList.add('nav__toggle--active');
        list.classList.add('nav__list--active');
        document.body.classList.add('menu-open');
        
        // Оновлюємо ARIA атрибути
        toggle.setAttribute('aria-expanded', 'true');
        list.setAttribute('aria-hidden', 'false');
        
        // Фокус на першому елементі меню для доступності
        setTimeout(() => {
            const firstLink = list.querySelector('.nav__link');
            if (firstLink) {
                firstLink.focus();
            }
        }, 100);
    }

    // Закриття меню
    function closeMenu() {
        // Видаляємо класи
        toggle.classList.remove('nav__toggle--active');
        list.classList.remove('nav__list--active');
        document.body.classList.remove('menu-open');
        
        // Оновлюємо ARIA атрибути
        toggle.setAttribute('aria-expanded', 'false');
        list.setAttribute('aria-hidden', 'true');
        
        // Повертаємо фокус на кнопку
        toggle.focus();
    }

    // Переключити стан меню
    function toggleMenu() {
        if (list.classList.contains('nav__list--active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Перевірка чи клік був поза меню
    function isClickOutsideMenu(event) {
        const withinToggle = event.target.closest('.nav__toggle');
        const withinList = event.target.closest('.nav__list');
        return !withinToggle && !withinList;
    }

    // Обробники подій
    
    // Клік на кнопку бургера
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Закрити меню при кліку на посилання
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            closeMenu();
            
            // Якщо це внутрішнє посилання, прокручуємо до секції
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Закрити при кліку поза меню
    document.addEventListener('click', (e) => {
        if (list.classList.contains('nav__list--active') && isClickOutsideMenu(e)) {
            closeMenu();
        }
    });

    // Обробка клавіатури
    document.addEventListener('keydown', (e) => {
        if (!list.classList.contains('nav__list--active')) return;

        switch (e.key) {
            case 'Escape':
                closeMenu();
                break;
                
            case 'Tab':
                // Утримуємо фокус всередині меню
                const focusableElements = list.querySelectorAll(
                    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    // Shift + Tab - рух назад
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab - рух вперед
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
                break;
                
            case 'ArrowDown':
                e.preventDefault();
                navigateMenu(1);
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                navigateMenu(-1);
                break;
        }
    });

    // Навігація по меню за допомогою стрілок
    function navigateMenu(direction) {
        const menuLinks = Array.from(links);
        const currentIndex = menuLinks.indexOf(document.activeElement);
        
        if (currentIndex === -1) {
            // Якщо жоден елемент не в фокусі, фокусуємо перший
            menuLinks[0]?.focus();
            return;
        }
        
        const nextIndex = currentIndex + direction;
        
        if (nextIndex >= 0 && nextIndex < menuLinks.length) {
            menuLinks[nextIndex].focus();
        } else if (direction > 0) {
            // Якщо дійшли до кінця, переходимо на початок
            menuLinks[0].focus();
        } else {
            // Якщо дійшли до початку, переходимо в кінець
            menuLinks[menuLinks.length - 1].focus();
        }
    }

    // Закрити при зміні розміру екрану (перехід на десктоп)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Оновлюємо позицію меню при зміні розміру
            initializeMenu();
            
            // Закриваємо меню якщо екран став великим
            if (window.innerWidth >= 769 && list.classList.contains('nav__list--active')) {
                closeMenu();
            }
        }, 100);
    });

    // Ініціалізація при завантаженні
    initializeMenu();

    // Додаткова перевірка при зміні орієнтації на мобільних
    window.addEventListener('orientationchange', () => {
        setTimeout(initializeMenu, 100);
    });

    // Додаємо плавну анімацію при скролінгу для закритого меню
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        // Закриваємо меню при скролінгу якщо воно відкрите
        if (list.classList.contains('nav__list--active') && Math.abs(window.scrollY - lastScrollY) > 50) {
            closeMenu();
        }
        lastScrollY = window.scrollY;
    });
});