module.exports = {
  content: ['src/**/*.html', 'src/**/*.js'],
  css: ['src/dist/style.css', 'src/dist/mobile.css'],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  safelist: [
    // Стани меню (оновлені класи)
    'is-open',
    'menu-open',
    'nav__toggle-active',        // Змінено з nav__toggle--active
    'nav__list-active',          // Змінено з nav__list--active
    'nav__link--active',         // Залишаємо для модифікатора посилання
    
    // Префікси компонентів
    /^header__/,
    /^content__/,
    /^hero__/,
    /^culture__/,
    /^footer__/,
    /^nav__/,
    /^btn/,
    /^page/,
    /^main/,
    
    // Анімації та стани
    /animation/,
    /keyframes/,
    /hover/,
    /focus/,
    /active/,
    /before/,
    /after/,
    
    // Додаткові класи для безпеки
    'slideInFromTop',
    'logoFlip',
    'fadeIn'
  ],
};