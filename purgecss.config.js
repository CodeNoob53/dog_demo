module.exports = {
  content: ['src/**/*.html', 'src/**/*.js'],
  
  // Використовуємо glob pattern для CSS файлів БЕЗ output
  css: ['src/dist/*.css'],
  
  // ВИДАЛЯЄМО output - PurgeCSS замінить файли на місці
  
  // Налаштування виводу
  rejected: false,        // Не показувати видалені селектори
  stdin: false,          // Не читати з stdin
  stdout: false,         // Не виводити в stdout (це приховує масив CSS)
  
  // Алгоритм пошуку селекторів
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  
  // Безпечні класи, які не треба видаляти
  safelist: [
    // Стани меню
    'is-open',
    'menu-open',
    'nav__toggle-active',
    'nav__list-active',
    'nav__link--active',
    
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
    
    // Анімації з проєкту
    'slideInFromTop',
    'logoFlip',
    'fadeIn',
    
    // Додаткові класи для безпеки
    /^flex/,
    /^grid/,
    /^transform/,
    /^transition/
  ],
  
  // Додаткові налаштування
  variables: true,       // Зберігати CSS змінні
  keyframes: true,      // Зберігати keyframes
  fontFace: true,       // Зберігати @font-face
  
  // Блокування селекторів (regex для ігнорування)
  blocklist: [
    /^\.unused/,        // Видаляти класи що починаються з .unused
  ]
};