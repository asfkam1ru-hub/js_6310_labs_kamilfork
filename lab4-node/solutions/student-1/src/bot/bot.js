import { Telegraf, Markup } from 'telegraf';

import { storage } from '../storage/fileStorage.js';

import { STATES, nextState } from './fsm.js';
import { getSession, setSession, clearSession } from './sessionStore.js';


export async function launchBot() {
  const token = process.env.BOT_TOKEN;
  if (!token) throw new Error('BOT_TOKEN is not set');

  const bot = new Telegraf(token);

  // Команды в меню Telegram (для ввода через "/")
  await bot.telegram.setMyCommands([
    { command: 'add', description: 'Добавить слово' },
    { command: 'list', description: 'Список слов' },
    { command: 'quiz', description: 'Мини-викторина' },
    { command: 'delete', description: 'Удалить слово' },
    { command: 'cancel', description: 'Отменить действие' }
  ]);

  // ===== Общие обработчики (функции) =====
  const handleAdd = async (ctx) => {
    const userId = String(ctx.from.id);
    const session = await getSession(userId);
    session.state = nextState(session.state, { type: 'START_ADD' });
    session.draft = {};
    await setSession(userId, session);
    await ctx.reply('Введите слово (term), например: "apple"');
  };

  const handleList = async (ctx) => {
    const userId = String(ctx.from.id);
    const words = await storage.getWords(userId);
    if (!words.length) {
      return ctx.reply('Список пуст. Нажмите «Добавить слово».');
    }
    const lines = words.map((w, i) => `${i + 1}. ${w.term} — ${w.translation}`);
    await ctx.reply(lines.join('\n'));
  };

  const handleQuiz = async (ctx) => {
    const userId = String(ctx.from.id);
    const words = await storage.getWords(userId);
    if (!words.length) return ctx.reply('Нет слов для викторины. Добавьте через «Добавить слово».');

    const session = await getSession(userId);
    session.state = nextState(session.state, { type: 'START_QUIZ' });

    const random = words[Math.floor(Math.random() * words.length)];
    session.draft = { quizWordId: random.id, correct: random.translation, term: random.term };
    session.state = nextState(session.state, { type: 'ASKED' });
    await setSession(userId, session);

    await ctx.reply(
      `Переведите: ${random.term}`,
      Markup.inlineKeyboard([Markup.button.callback('Показать ответ', 'reveal')])
    );
  };

  const handleCancel = async (ctx) => {
    const userId = String(ctx.from.id);
    await clearSession(userId);
    await setSession(userId, { state: STATES.IDLE, draft: {} });
    await ctx.reply('Отменено. Вы в состоянии IDLE.');
  };

  // Старт: показываем удобную клавиатуру (без слешей)
  bot.start(async (ctx) => {
    const userId = String(ctx.from.id);
    await clearSession(userId);
    await setSession(userId, { state: STATES.IDLE, draft: {} });

    await ctx.reply(
      '👋 Привет! Я помогу учить слова. Выберите действие на клавиатуре ниже:',
      {
        reply_markup: {
          keyboard: [
            ['Добавить слово', 'Список слов'],
            ['Викторина', 'Удалить слово'],
            ['Отмена']
          ],
          resize_keyboard: true,
          one_time_keyboard: false
        }
      }
    );

    await ctx.reply(
      'Команды также доступны через меню / :\n' +
      '/add — добавить слово\n' +
      '/list — список слов\n' +
      '/quiz — мини-викторина\n' +
      '/delete — удалить слово\n' +
      '/cancel — отмена шага'
    );
  });

  // ===== Команды со слешами (остаются рабочими) =====
  bot.command('add', handleAdd);
  bot.command('list', handleList);
  bot.command('quiz', handleQuiz);
  bot.command('cancel', handleCancel);

  // ===== Кнопки клавиатуры без слешей =====
  bot.hears('Добавить слово', handleAdd);
  bot.hears('Список слов', handleList);
  bot.hears('Викторина', handleQuiz);
  bot.hears('Отмена', handleCancel);

  // ===== Удаление слов =====
  const handleDeleteStart = async (ctx) => {
    const userId = String(ctx.from.id);
    const words = await storage.getWords(userId);

    if (!words.length) {
      return ctx.reply('Удалять нечего — список пуст. Добавьте слово через «Добавить слово».');
    }

    // Inline-кнопки "Удалить: <term> — <translation>"
    const rows = words.map((w) => [
      Markup.button.callback(`Удалить: ${w.term} — ${w.translation}`, `del:${w.id}`)
    ]);

    await ctx.reply('Выберите слово для удаления:', Markup.inlineKeyboard(rows, { columns: 1 }));
  };

  bot.command('delete', handleDeleteStart);
  bot.hears('Удалить слово', handleDeleteStart);

  // Обработчик нажатия на inline-кнопку удаления
  bot.action(/^del:(.+)$/, async (ctx) => {
    const userId = String(ctx.from.id);
    const wordId = ctx.match[1];

    const words = await storage.getWords(userId);
    const target = words.find((w) => w.id === wordId);
    if (!target) {
      await ctx.answerCbQuery('Не найдено (возможно, уже удалено).', { show_alert: true });
      return;
    }

    const ok = await storage.deleteWord(userId, wordId);
    if (ok) {
      await ctx.answerCbQuery('Удалено.');
      await ctx.reply(`🗑️ Удалено: ${target.term} — ${target.translation}`);
    } else {
      await ctx.answerCbQuery('Не удалось удалить.', { show_alert: true });
    }
  });

  // ===== Inline «Показать ответ» =====
  bot.action('reveal', async (ctx) => {
    const userId = String(ctx.from.id);
    const session = await getSession(userId);
    await ctx.answerCbQuery();
    if (session?.draft?.correct) {
      await ctx.reply(`Правильный перевод: ${session.draft.correct}`);
    } else {
      await ctx.reply('Нет активного вопроса.');
    }
  });

  // ===== Тексты для пошаговых сценариев (term/translation/quiz answer) =====
  bot.on('text', async (ctx) => {
    const userId = String(ctx.from.id);
    const text = (ctx.message.text || '').trim();
    if (!text) return ctx.reply('Некорректный ввод. Попробуйте ещё раз или «Отмена».');

    const session = await getSession(userId);

    // Шаг 1: пользователь ввёл term
    if (session.state === STATES.ADD_WORD_TERM) {
      session.draft.term = text;
      session.state = nextState(session.state, { type: 'TERM_ENTERED' });
      await setSession(userId, session);
      await ctx.reply('Введите перевод (translation), например: "яблоко"');
      return;
    }

    // Шаг 2: пользователь ввёл translation
    if (session.state === STATES.ADD_WORD_TRANSLATION) {
      session.draft.translation = text;
      const term = session.draft.term?.trim();
      const translation = session.draft.translation?.trim();

      if (!term || !translation) {
        await ctx.reply('Не хватает данных. Попробуйте «Добавить слово» заново.');
        await clearSession(userId);
        await setSession(userId, { state: STATES.IDLE, draft: {} });
        return;
      }

      // Проверка на дубликат по term без учёта регистра
      const words = await storage.getWords(userId);
      const duplicate = words.find((w) => w.term.toLowerCase() === term.toLowerCase());
      if (duplicate) {
        await ctx.reply(`⚠️ Слово «${term}» уже есть в вашем списке.`);
        session.state = STATES.IDLE;
        session.draft = {};
        await setSession(userId, session);
        return;
      }

      // Добавляем
      await storage.addWord(userId, term, translation);
      await ctx.reply(`✅ Добавлено: ${term} — ${translation}`);

      session.state = nextState(session.state, { type: 'TRANSLATION_ENTERED' });
      session.draft = {};
      await setSession(userId, session);
      return;
    }

    // Ответы в викторине
    if (session.state === STATES.QUIZ_ANSWER) {
      const answer = text.toLowerCase();
      const correct = (session.draft?.correct || '').toLowerCase();
      const ok = answer === correct;
      await ctx.reply(ok ? '✅ Верно!' : `❌ Неверно. Правильно: ${session.draft?.correct}`);
      session.state = nextState(session.state, { type: 'ANSWERED' });
      session.draft = {};
      await setSession(userId, session);
      return;
    }

    // В IDLE подсказываем про кнопки
    if (session.state === STATES.IDLE) {
      await ctx.reply('Выберите действие на клавиатуре: «Добавить слово», «Список слов», «Викторина», «Удалить слово», «Отмена».');
    }
  });

  // Безопасный обработчик ошибок
  bot.catch((err, ctx) => {
     
    console.error('Bot error for', ctx.updateType, err);
  });

  await bot.launch();
   
  console.log('[bot] launched');

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}
