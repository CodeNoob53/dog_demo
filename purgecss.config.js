module.exports = {
  content: ['./src/index.html', './src/**/*.html', './src/**/*.js'],
  css: ['./src/css/style.css'],
  output: './src/css/',
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  safelist: [
    'is-open',
    /^header__/,
    /^content__/,
    /^video__/,
    /^footer__/,
    /^animation/,
    /^keyframes/,
    /hover/,
    /focus/,
    /active/,
  ],
};
