'use strict'; // строгий режим

// === Палитра сакуры ===
const SAKURA_MAIN   = '#f8cbe0';  // светлый розовый (фон)
const SAKURA_DEEP   = '#ee9ec5';  // насыщенный розовый (акцент)
const SAKURA_TEXT   = '#4a2b3b';  // тёмный бордово-розовый (текст)
const SAKURA_LINK   = '#c54a7f';  // розовый для ссылок
const SAKURA_SOFT   = '#fff5fa';  // молочно-розовый (мягкие подложки)
const SAKURA_GLOW_1 = 'rgba(238,158,197,0.75)';  // нежное свечение
const SAKURA_GLOW_2 = 'rgba(197,74,127,0.55)';   // глубокое свечение

// === ВКЛЮЧЕНИЕ СТИЛЕЙ САКУРЫ ===
function sakuraStyles() {
  // если уже добавлено — ничего не делаем
  if (document.getElementById('sakura-styles')) return;

  const style = document.createElement('style');
  style.id = 'sakura-styles';
  style.textContent = `
    /* Глобальные CSS-переменные — удобно переиспользовать */
    :root{
      --sakura-main: ${SAKURA_MAIN};
      --sakura-deep: ${SAKURA_DEEP};
      --sakura-text: ${SAKURA_TEXT};
      --sakura-link: ${SAKURA_LINK};
      --sakura-soft: ${SAKURA_SOFT};
      --sakura-glow-1: ${SAKURA_GLOW_1};
      --sakura-glow-2: ${SAKURA_GLOW_2};
    }
    h1, h2, h3, h4, h5, h6, p {
    color: inherit !important;}
    /* 1. Базовый цвет текста */
    body {
      color: var(--sakura-text) !important;
      letter-spacing: 0.2px !important;
      line-height: 1.6 !important;
      background: var(--sakura-main) !important;
    }

    /* 2. Шапка */
    header, .header, #header {
      background-color: var(--sakura-deep) !important;
      border: none !important;
      box-shadow:
        0 0 14px var(--sakura-glow-1),
        0 6px 18px var(--sakura-glow-2) !important;
      margin-bottom: 40px !important;
    }

    /* 3. Ссылки */
    a {
      color: var(--sakura-link) !important;
      text-shadow: 0 0 8px var(--sakura-glow-1), 0 0 18px var(--sakura-glow-2) !important;
      font-weight: 600 !important;
    }

    /* 4. Наведение на ссылки */
    a:hover, a:focus {
      color: var(--sakura-text) !important;
      background-color: #ffe6f2 !important;
      border: none !important;
      box-shadow:
        0 0 14px var(--sakura-glow-1),
        0 0 26px var(--sakura-glow-2) !important;
      text-decoration: none !important;
    }

    /* 5. Кнопки */
    button, .button, input[type="submit"] {
      background-color: var(--sakura-deep) !important;
      color: #fff !important;
      border-radius: 14px !important;
      border: 2px solid var(--sakura-soft) !important;
      box-shadow: 0 6px 18px var(--sakura-glow-2) !important;
      padding: 10px 14px !important;
    }
    /* кнопки при наведении */
    button:hover, .button:hover, input[type="submit"]:hover {
      box-shadow:
        0 0 16px var(--sakura-glow-1),
        0 0 28px var(--sakura-glow-2) !important;
      filter: brightness(1.03);
    }

    /* 6. Заголовки */
    h1, h2, h3 {
      color: var(--sakura-text) !important;
      text-shadow: 0 0 8px var(--sakura-glow-1) !important;
      font-weight: 800 !important;
      border-bottom: 2px dashed var(--sakura-deep) !important;
      padding-bottom: 6px !important;
    }

    /* 7. Футер */
    footer, .footer {
      background-color: var(--sakura-deep) !important;
      box-shadow:
        0 0 14px var(--sakura-glow-1),
        0 6px 18px var(--sakura-glow-2) inset !important;
      margin-top: 40px !important;
      color: #fff !important;
    }
    /* 8. Ссылки в футере */
    footer a, .footer a, footer a:visited, .footer a:visited {
      color: #fff !important;
      text-decoration: none !important;
      text-shadow: 0 0 12px var(--sakura-glow-1), 0 0 20px var(--sakura-glow-2) !important;
    }
    /* 9. Наведение в футере */
    footer a:hover, .footer a:hover {
      color: var(--sakura-soft) !important;
      background-color: transparent !important;
      box-shadow: none !important;
      text-decoration: underline !important;
    }

    /* 10. Навигация в шапке */
    nav, .navigation, .menu {
      background-color: var(--sakura-deep) !important;
      border: none !important;
      box-shadow:
        0 0 12px var(--sakura-glow-1),
        0 0 22px var(--sakura-glow-2) !important;
      border-radius: 12px !important;
      padding: 10px !important;
    }

    /* 11. Блок входа */
    .login_links{
      background-color: var(--sakura-deep) !important;
      border: none !important;
      box-shadow:
        0 0 10px var(--sakura-glow-1),
        0 0 18px var(--sakura-glow-2) !important;
      border-radius: 12px !important;
    }

    /* 12. Чётность недели */
    .week_parity{
      background-color: var(--sakura-deep) !important;
      border: none !important;
      box-shadow:
        0 0 10px var(--sakura-glow-1),
        0 0 18px var(--sakura-glow-2) !important;
      border-radius: 12px !important;
      color: #fff !important;
    }

    /* 13. Фоны основных контейнеров */
    .page_wrapper { background-color: var(--sakura-main) !important; }
    .main_slider_holder { background: #ffe6f2 !important; }
    .news_box { background: #ffe9f4 !important; }

    /* 14. Стратегические проекты университета */
    .tab_items { background: var(--sakura-main) !important; }

    /* 15. Учебные подразделения и «Ближайшие события» карусели */
    .slick-track { background: var(--sakura-main) !important; margin-top: 40px !important; }

    /* 16. Общие портлеты (карточки секций) */
    .portlet-content {
      background: var(--sakura-soft) !important;
      border: 1px solid var(--sakura-deep) !important;
      border-radius: 14px !important;
      box-shadow: 0 6px 18px var(--sakura-glow-2) !important;
    }

    /* 17. Навигация месяцев/года события */
    .events_nav{
      background: var(--sakura-deep) !important;
      color: #fff !important;
      box-shadow:
        0 0 24px var(--sakura-glow-1),
        0 0 48px var(--sakura-glow-2),
        0 0 72px var(--sakura-glow-2) !important;
      margin-top: 100px !important;
      border-radius: 14px !important;
    }
    .kai_page p{
      color: #ff188f !important;}

    
    /* 18. Учебные подразделения (контейнер) */
    .institutes_slider_box.institutes_box.cf.disable-user-actions{
      box-shadow:
        0 0 24px var(--sakura-glow-1),
        0 0 48px var(--sakura-glow-2) !important;
      margin-bottom: 120px !important;
      background: var(--sakura-soft) !important;
      border-radius: 14px !important;
    }
    .aui header .menu ul li .sub{
      background: var(--sakura-deep) !important;}
    
    .aui h1{
      color: var(--sakura-deep) !important;
    }

    .section{
      background: var(--sakura-soft) !important;}
    /* 19. Кнопки слайдера */
    .slick-prev, .slick-next{
      background: var(--sakura-deep) !important;
      color: #fff !important;
      border-radius: 12px !important;
      box-shadow:
        0 0 18px var(--sakura-glow-1),
        0 0 28px var(--sakura-glow-2) !important;
    }
    .inst-slide.prev.cf, .inst-slide.next{
      background: var(--sakura-main) !important;
      z-index: 9999 !important;
      opacity: 1 !important;
      width: 5% !important;
    }

    /* 20. Таблицы, границы и разделители – тоже в розовый */
    hr, table, th, td, .card, .box, .item,
    input, textarea, select {
      border-color: var(--sakura-deep) !important;
      outline-color: var(--sakura-deep) !important;
    }
    ::placeholder { color: ${SAKURA_TEXT}A6 !important; opacity: 1; }
  `;
  document.head.appendChild(style);
}

// === ОТКЛЮЧЕНИЕ СТИЛЕЙ САКУРЫ ===
function removeSakuraStyles() {
  const style = document.getElementById('sakura-styles');
  if (style) style.remove();
}

// === КНОПКА ПЕРЕКЛЮЧЕНИЯ ===
function createToggleButton() {
  if (document.getElementById('sakura-toggle')) return;

  const button = document.createElement('button');
  button.id = 'sakura-toggle';
  button.innerHTML = 'Включить сакуру';

  Object.assign(button.style, {
    position: 'fixed',
    top: '15px',
    right: '15px',
    zIndex: '10000',
    background: SAKURA_DEEP,
    color: '#ffffff',
    border: `2px solid ${SAKURA_SOFT}`,
    borderRadius: '16px',
    padding: '10px 16px',
    fontSize: '14px',
    cursor: 'pointer',
    boxShadow: `0 6px 18px ${SAKURA_GLOW_2}`,
    transition: 'transform .15s ease, box-shadow .15s ease'
  });

  button.onmouseenter = () => {
    button.style.boxShadow = `0 0 16px ${SAKURA_GLOW_1}, 0 0 26px ${SAKURA_GLOW_2}`;
    button.style.transform = 'translateY(-1px)';
  };
  button.onmouseleave = () => {
    button.style.boxShadow = `0 6px 18px ${SAKURA_GLOW_2}`;
    button.style.transform = 'none';
  };

  // логика переключения
  button.onclick = function() {
    const isEnabled = localStorage.getItem('sakuraStyle') === 'true';
    if (isEnabled) {
      removeSakuraStyles();
      localStorage.setItem('sakuraStyle', 'false');
      button.innerHTML = 'Включить сакуру';
      button.style.background = SAKURA_DEEP;
    } else {
      sakuraStyles();
      localStorage.setItem('sakuraStyle', 'true');
      button.innerHTML = 'Включить базу';
      button.style.background = SAKURA_DEEP;
    }
  };
  const buttonContainer = document.querySelector('.box_links');
  buttonContainer.appendChild(button);

}

// === Демонстрация требуемых DOM-методов ===
function demonstrateDOMUsage() {
  console.log('🔧 Demonstrating DOM methods:');

  // getElementById
  const page = document.getElementById('page_wrapper');
  console.log(page ? '✅ getElementById: page_wrapper found' : '❌ getElementById: page_wrapper not found');

  // querySelector с «сложным» селектором
  const complex = document.querySelector('footer .section'); // потомок .section внутри footer
  if (complex) {
    const classes1 = complex.className ? ` class="${complex.className}"` : '';
    console.log(`✅ querySelector (complex): footer .section found (${complex.tagName.toLowerCase()},${classes1})`);

    // parentElement
    const parent = complex.parentElement;
    if (parent) {
      const classes2 = parent.className ? ` class="${parent.className}"` : '';
      console.log(`✅ parentElement: parent found (${parent.tagName.toLowerCase()},${classes2})`);
    } else {
      console.log('❌ parentElement: parent not found');
    }

    // children
    const children = complex.children;
    console.log(`✅ children: ${children.length} child elements found`);
  } else {
    console.log('❌ querySelector (complex): footer .section not found');
  }

  // querySelectorAll
  const links = document.querySelectorAll('a');
  console.log(`✅ querySelectorAll: found ${links.length} <a>`);
}

// === Инициализация ===
function init() {
  console.log('🌸 Initializing Sakura Style');
  createToggleButton();
  demonstrateDOMUsage();

  const isEnabled = localStorage.getItem('sakuraStyle') === 'true';
  if (isEnabled) {
    sakuraStyles();
    const btn = document.getElementById('sakura-toggle');
    if (btn) btn.innerHTML = 'Включить базу';
  }
  console.log('✅ Sakura initialized');
}

// Запуск после загрузки
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
