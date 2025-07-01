// Спрощена версія - 50 рядків замість 300+
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav__toggle');
    const list = document.querySelector('.nav__list');
    const links = document.querySelectorAll('.nav__link');
    
    if (!toggle || !list) return;

    // Функції відкриття/закриття
    const openMenu = () => {
        toggle.classList.add('nav__toggle--active');
        list.classList.add('nav__list--active');
        document.body.classList.add('menu-open');
        toggle.setAttribute('aria-expanded', 'true');
        list.setAttribute('aria-hidden', 'false');
    };

    const closeMenu = () => {
        toggle.classList.remove('nav__toggle--active');
        list.classList.remove('nav__list--active');
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        list.setAttribute('aria-hidden', 'true');
    };

    // Події
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        list.classList.contains('nav__list--active') ? closeMenu() : openMenu();
    });

    // Закриття при кліку на посилання
    links.forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });

    // Закриття при кліку поза меню
    document.addEventListener('click', (e) => {
        if (list.classList.contains('nav__list--active') && 
            !e.target.closest('.nav__toggle') && 
            !e.target.closest('.nav__list')) {
            closeMenu();
        }
    });

    // Escape для закриття
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && list.classList.contains('nav__list--active')) {
            closeMenu();
        }
    });

    // Закриття при зміні розміру вікна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
});