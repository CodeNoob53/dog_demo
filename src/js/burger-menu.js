/**
 * Оновлений скрипт для бургер-меню
 * Виправлена логіка появи/закриття та обробка кліків поза меню
 */

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav__toggle');
    const list = document.querySelector('.nav__list');
    const links = list ? list.querySelectorAll('.nav__link') : [];

    if (!toggle || !list) {
        console.error('Не вдалося знайти .nav__toggle або .nav__list');
        return;
    }

    // Відкриття меню
    function openMenu() {
        toggle.classList.add('nav__toggle--active');
        list.classList.add('nav__list--active');
        document.body.classList.add('menu-open');
        toggle.setAttribute('aria-expanded', 'true');
        list.setAttribute('aria-hidden', 'false');
    }

    // Закриття меню
    function closeMenu() {
        toggle.classList.remove('nav__toggle--active');
        list.classList.remove('nav__list--active');
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        list.setAttribute('aria-hidden', 'true');
    }

    // Переключити стан меню
    function toggleMenu() {
        if (list.classList.contains('nav__list--active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Клік на кнопку бургера
    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Закрити меню при кліку на посилання
    links.forEach(link => link.addEventListener('click', closeMenu));

    // Закрити при кліку поза меню та кнопкою
    document.addEventListener('click', (e) => {
        const withinToggle = e.target.closest('.nav__toggle');
        const withinList = e.target.closest('.nav__list');
        if (!withinToggle && !withinList && list.classList.contains('nav__list--active')) {
            closeMenu();
        }
    });

    // Закрити при натисканні Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && list.classList.contains('nav__list--active')) {
            closeMenu();
        }
    });

    // Закрити при зміні розміру екрану (десктоп)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 769 && list.classList.contains('nav__list--active')) {
            closeMenu();
        }
    });

    // Початкові атрибути для a11y
    toggle.setAttribute('aria-expanded', 'false');
    list.setAttribute('aria-hidden', 'true');
    list.setAttribute('role', 'navigation');
});
