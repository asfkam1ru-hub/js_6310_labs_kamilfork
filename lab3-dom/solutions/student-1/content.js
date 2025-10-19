'use strict';

// === Константы темы ===
const SAKURA_KEY = 'theme:sakura:enabled';      // localStorage ключ
const SAKURA_MAIN = '#f8cbe0';                   // светло-розовый (главный цвет)
const SAKURA_DEEP = '#ee9ec5';                   // более насыщенный розовый (акцент)
const SAKURA_TEXT = '#4a2b3b';                   // тёмно-бордовый для текста
const SAKURA_LINK = '#c54a7f';                   // розовый для ссылок
const SAKURA_SHADOW = '0 6px 18px rgba(197, 74, 127, 0.25)';

// Возвращает true/false из localStorage
function isSakuraEnabled() {
  return localStorage.getItem(SAKURA_KEY) === '1';
}

// Сохраняет состояние
function setSakuraEnabled(enabled) {
  localStorage.setItem(SAKURA_KEY, enabled ? '1' : '0');
}

// Применение/сброс темы (меняем не менее 8 стилей)
function applySakuraTheme(enabled) {
  // 1) Корневые элементы
  const pageWrapper = document.getElementById('page_wrapper'); // getElementById — ЯВНО
  const body = document.body;

  // 2) Часто встречающиеся элементы сайта
  const mainSlider = document.querySelector('.main_slider_holder'); // querySelector
  const newsBox = document.querySelector('.news_box');              // querySelector

  // 3) Несколько элементов коллекцией (карточки, кнопки и т. д.)
  const cards = document.querySelectorAll('.card, .box, .item');    // querySelectorAll (простой, но множественный)
  const buttons = document.querySelectorAll('a.button, button, .btn');

  // 4) СЛОЖНЫЙ СЕЛЕКТОР: активная ссылка в навигации
  const activeNavLink = document.querySelector('.nav .menu-item.active > a');

  // 5) Заголовки разделов, ссылки
  const sectionTitles = document.querySelectorAll('h1, h2, h3');
  const allLinks = document.querySelectorAll('a');

  // 6) Пример использования parentElement/children
  const header = document.querySelector('header, .header, .site-header');
  const headerBar = header ? header.parentElement : null; // parentElement — применим фон контейнеру
  const main = document.querySelector('main, .main, #main');
  const mainChildren = main ? Array.from(main.children) : []; // children — пройдёмся по прямым детям основного контейнера

  // Функции применения/сброса инлайновых стилей
  const on = () => {
    // a) фон и текст
    (pageWrapper || body).style.background = SAKURA_MAIN;            // заливка страницы
    (pageWrapper || body).style.color = SAKURA_TEXT;                 // цвет текста
    (pageWrapper || body).style.letterSpacing = '0.2px';             // межбуквенный интервал
    (pageWrapper || body).style.lineHeight = '1.6';                  // межстрочный интервал

    // b) шапка/контейнер рядом (через parentElement)
    if (headerBar) {
      headerBar.style.background = '#fff5fa';
      headerBar.style.boxShadow = SAKURA_SHADOW;
    }

    // c) основной слайдер/новости
    if (mainSlider) {
      mainSlider.style.background = '#ffe6f2';
      mainSlider.style.borderRadius = '14px';
      mainSlider.style.boxShadow = SAKURA_SHADOW;
      mainSlider.style.padding = '12px';
    }
    if (newsBox) {
      newsBox.style.background = '#ffe9f4';
      newsBox.style.border = `1px solid ${SAKURA_DEEP}`;
      newsBox.style.borderRadius = '12px';
      newsBox.style.boxShadow = SAKURA_SHADOW;
      newsBox.style.padding = '10px 12px';
    }

    // d) карточки
    cards.forEach((el) => {
      el.style.background = '#fff7fb';
      el.style.border = `1px solid ${SAKURA_DEEP}`;
      el.style.borderRadius = '14px';
      el.style.boxShadow = SAKURA_SHADOW;
      el.style.padding = '12px';
    });

    // e) кнопки
    buttons.forEach((btn) => {
      btn.style.background = SAKURA_DEEP;
      btn.style.color = '#fff';
      btn.style.border = 'none';
      btn.style.borderRadius = '16px';
      btn.style.padding = '10px 14px';
      btn.style.boxShadow = SAKURA_SHADOW;
    });

    // f) активная ссылка в меню (сложный селектор)
    if (activeNavLink) {
      activeNavLink.style.background = '#ffd3e9';
      activeNavLink.style.color = SAKURA_TEXT;
      activeNavLink.style.borderRadius = '10px';
      activeNavLink.style.padding = '6px 10px';
    }

    // g) заголовки и ссылки
    sectionTitles.forEach((h) => {
      h.style.color = SAKURA_TEXT;
      h.style.borderBottom = `2px dashed ${SAKURA_DEEP}`;
      h.style.paddingBottom = '6px';
    });
    allLinks.forEach((a) => {
      a.style.color = SAKURA_LINK;
    });

    // h) прямые дети <main> — чуть расстояния
    mainChildren.forEach((child) => {
      child.style.marginBottom = '12px';
    });
  };

  const off = () => {
    // Сбросим всё, что выставляли (минимум по тем же точкам)
    const root = (pageWrapper || body);
    root.style.background = '';
    root.style.color = '';
    root.style.letterSpacing = '';
    root.style.lineHeight = '';

    if (headerBar) {
      headerBar.style.background = '';
      headerBar.style.boxShadow = '';
    }

    if (mainSlider) {
      mainSlider.style.background = '';
      mainSlider.style.borderRadius = '';
      mainSlider.style.boxShadow = '';
      mainSlider.style.padding = '';
    }
    if (newsBox) {
      newsBox.style.background = '';
      newsBox.style.border = '';
      newsBox.style.borderRadius = '';
      newsBox.style.boxShadow = '';
      newsBox.style.padding = '';
    }

    cards.forEach((el) => {
      el.style.background = '';
      el.style.border = '';
      el.style.borderRadius = '';
      el.style.boxShadow = '';
      el.style.padding = '';
    });

    buttons.forEach((btn) => {
      btn.style.background = '';
      btn.style.color = '';
      btn.style.border = '';
      btn.style.borderRadius = '';
      btn.style.padding = '';
      btn.style.boxShadow = '';
    });

    if (activeNavLink) {
      activeNavLink.style.background = '';
      activeNavLink.style.color = '';
      activeNavLink.style.borderRadius = '';
      activeNavLink.style.padding = '';
    }

    sectionTitles.forEach((h) => {
      h.style.color = '';
      h.style.borderBottom = '';
      h.style.paddingBottom = '';
    });
    allLinks.forEach((a) => {
      a.style.color = '';
    });

    mainChildren.forEach((child) => {
      child.style.marginBottom = '';
    });
  };

  enabled ? on() : off();
}

// Создаёт кнопку в DOM (добавляет в .box_links, иначе в body)
function ensureSakuraButton() {
  // не дублировать
  if (document.getElementById('sakura-toggle')) return;

  const btn = document.createElement('button');
  btn.id = 'sakura-toggle';
  btn.type = 'button';
  btn.setAttribute('aria-live', 'polite');

  // Ищем контейнер для кнопок, иначе вставляем в body
  const container = document.querySelector('.box_links') || document.body;

  // Базовые стили кнопки (видимая и удобная)
  Object.assign(btn.style, {
    position: container === document.body ? 'fixed' : '',
    right: container === document.body ? '16px' : '',
    bottom: container === document.body ? '16px' : '',
    background: '#ffd1e6',
    color: '#5a1f35',
    border: '1px solid #e89abc',
    borderRadius: '18px',
    padding: '8px 12px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(197, 74, 127, 0.25)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    lineHeight: '1'
  });

  // Содержимое: иконка Сакуры + статус
  const icon = document.createElement('span');
  icon.textContent = '🌸';
  const label = document.createElement('span');
  label.id = 'sakura-status-label';

  btn.appendChild(icon);
  btn.appendChild(label);

  // Вставляем
  container.appendChild(btn);

  // Обработчик клика
  btn.addEventListener('click', () => {
    const next = !isSakuraEnabled();
    setSakuraEnabled(next);
    applySakuraTheme(next);
    updateButtonLabel();
  });

  // Устанавливаем начальную надпись
  function updateButtonLabel() {
    const enabled = isSakuraEnabled();
    label.textContent = enabled ? 'Sakura: ВКЛ' : 'Sakura: ВЫКЛ';
    btn.title = enabled ? 'Выключить Sakura-тему' : 'Включить Sakura-тему';
  }

  // Экспортируем обновление чтобы вызвать снаружи после применения темы
  btn.updateButtonLabel = updateButtonLabel;

  return btn;
}

// Инициализация: применить тему по localStorage, создать кнопку, синхронизировать статус
(function initSakuraTheme() {
  const startEnabled = isSakuraEnabled();
  applySakuraTheme(startEnabled);

  // дождаться DOM для вставки кнопки
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      const btn = ensureSakuraButton();
      if (btn && typeof btn.updateButtonLabel === 'function') btn.updateButtonLabel();
    });
  } else {
    const btn = ensureSakuraButton();
    if (btn && typeof btn.updateButtonLabel === 'function') btn.updateButtonLabel();
  }
})();