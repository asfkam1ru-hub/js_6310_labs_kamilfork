import { useState } from "react";

/* ======================= ДАННЫЕ ======================= */
const WORDS = [
  { id: 1, word: "apple", translation: "яблоко", context: "I ate an apple yesterday", contextTranslation: "Я съел яблоко вчера" },
  { id: 2, word: "book", translation: "книга", context: "This book is very interesting", contextTranslation: "Эта книга очень интересная" },
  { id: 3, word: "student", translation: "студент", context: "The student passed the exam", contextTranslation: "Студент сдал экзамен" },
  { id: 4, word: "teacher", translation: "учитель", context: "The teacher explained the lesson clearly", contextTranslation: "Учитель ясно объяснил урок" },
  { id: 5, word: "city", translation: "город", context: "The city is crowded today", contextTranslation: "Город сегодня переполнен" },
  { id: 6, word: "car", translation: "машина", context: "My car needs repairs", contextTranslation: "Моей машине нужен ремонт" },
  { id: 7, word: "water", translation: "вода", context: "Drink more water every day", contextTranslation: "Пей больше воды каждый день" },
  { id: 8, word: "phone", translation: "телефон", context: "I lost my phone yesterday", contextTranslation: "Я потерял свой телефон вчера" },
  { id: 9, word: "computer", translation: "компьютер", context: "The computer is running slowly", contextTranslation: "Компьютер работает медленно" },
  { id: 10, word: "coffee", translation: "кофе", context: "I drink coffee every morning", contextTranslation: "Я пью кофе каждое утро" },
  { id: 11, word: "music", translation: "музыка", context: "She loves listening to music", contextTranslation: "Она любит слушать музыку" },
  { id: 12, word: "dog", translation: "собака", context: "The dog is barking loudly", contextTranslation: "Собака громко лает" },
  { id: 13, word: "cat", translation: "кошка", context: "The cat is sleeping on the sofa", contextTranslation: "Кошка спит на диване" },
  { id: 14, word: "house", translation: "дом", context: "Their house is very big", contextTranslation: "Их дом очень большой" },
  { id: 15, word: "friend", translation: "друг", context: "My friend visited me today", contextTranslation: "Мой друг навестил меня сегодня" },
  { id: 16, word: "food", translation: "еда", context: "The food tastes delicious", contextTranslation: "Еда очень вкусная" },
  { id: 17, word: "weather", translation: "погода", context: "The weather is getting colder", contextTranslation: "Погода становится холоднее" },
  { id: 18, word: "movie", translation: "фильм", context: "We watched a great movie", contextTranslation: "Мы посмотрели отличный фильм" },
  { id: 19, word: "time", translation: "время", context: "Time goes by very fast", contextTranslation: "Время идет очень быстро" },
  { id: 20, word: "language", translation: "язык", context: "Learning a language takes practice", contextTranslation: "Изучение языка требует практики" },
  { id: 21, word: "family", translation: "семья", context: "Family is very important", contextTranslation: "Семья очень важна" },
  { id: 22, word: "job", translation: "работа", context: "He found a new job", contextTranslation: "Он нашёл новую работу" },
  { id: 23, word: "school", translation: "школа", context: "The school is closed today", contextTranslation: "Сегодня школа закрыта" },
];


/* ======================= ЛЕВАЯ ПАНЕЛЬ ======================= */
function WordListPanel({ words, selectedWordId, onSelectWord, isOpen, onToggleOpen }) {
  return (
    <div style={{ width: isOpen ? 320 : "auto", padding: 16, borderRight: "1px solid #ddd" }}>
      <button
        onClick={onToggleOpen}
        style={{
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ccc",
          background: "#f5f5f5",
          cursor: "pointer",
          marginBottom: 12,
        }}
      >
        {isOpen ? "Скрыть список слов" : "Показать список слов"}
      </button>

      {!isOpen && null}

      {isOpen && (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse", marginTop: 8 }}>
          <thead>
            <tr style={{ background: "#f3f4f6" }}>
              <th>Слово</th>
              <th>Перевод</th>
            </tr>
          </thead>
          <tbody>
            {words.map((w) => (
              <tr
                key={w.id}
                onClick={() => onSelectWord(w)}
                style={{
                  cursor: "pointer",
                  background: w.id === selectedWordId ? "#e5e7eb" : "white",
                }}
              >
                <td>{w.word}</td>
                <td>{w.translation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


/* ======================= ДЕТАЛЬНАЯ ПАНЕЛЬ ======================= */
function WordDetails({ word }) {
  if (!word) return null;

  return (
    <div style={{ padding: 24, width: 350 }}>
      <h2 style={{ marginBottom: 16, fontSize: 24 }}>Карточка слова</h2>
      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, background: "#fff" }}>
        <h3>На изучаемом языке</h3>
        <p><b>Слово:</b> {word.word}</p>
        <p><b>Контекст:</b> {word.context}</p>

        <h3 style={{ marginTop: 16 }}>На родном языке</h3>
        <p><b>Перевод слова:</b> {word.translation}</p>
        <p><b>Перевод контекста:</b> {word.contextTranslation}</p>
      </div>
    </div>
  );
}


/* ======================= ФЛЕШКАРТА ======================= */
function Flashcard({ word, mode, onNext, onRemember, onDontRemember }) {
  const [flipped, setFlipped] = useState(false);

  if (!word) return null;

  return (
    <div style={{ flex: 1, padding: 32 }}>
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          height: "70vh",
          borderRadius: 16,
          border: "2px solid #ccc",
          background: "#fff",
          cursor: "pointer",
          padding: 32,
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        {!flipped ? (
          <div>
            <div style={{ fontSize: 32, marginBottom: 24 }}>{word.word}</div>
            <div>{word.context}</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 32, marginBottom: 24 }}>{word.translation}</div>
            <div>{word.contextTranslation}</div>
          </div>
        )}
      </div>

      {/* кнопки */}
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 20 }}>
        {mode === "train" ? (
          <>
            <button
              onClick={() => { setFlipped(false); onDontRemember(); }}
              style={{ padding: "12px 20px", borderRadius: 8, border: "1px solid #d9534f", background: "#f8d7da" }}
            >
              Не помню
            </button>

            <button
              onClick={() => { setFlipped(false); onRemember(); }}
              style={{ padding: "12px 20px", borderRadius: 8, border: "1px solid #5cb85c", background: "#d4edda" }}
            >
              Помню
            </button>
          </>
        ) : (
          <button
            onClick={() => { setFlipped(false); onNext(); }}
            style={{ padding: "12px 20px", borderRadius: 8, border: "1px solid #888", background: "#f3f4f6" }}
          >
            Следующая карточка
          </button>
        )}
      </div>
    </div>
  );
}


/* ======================= ГЛАВНЫЙ КОМПОНЕНТ ======================= */
export default function App() {
  const [isListOpen, setIsListOpen] = useState(true);
  const [selectedWord, setSelectedWord] = useState(null);

  // "view" или "train"
  const [mode, setMode] = useState("view");

  // состояние тренировки
  const [training, setTraining] = useState({
    queue: WORDS,
    index: 0,
    wrong: [],
  });

  const currentWord = training.queue[training.index];

  /* ---------- Логика переключения карточек ---------- */
  function goNextViewMode() {
    setTraining((prev) => ({
      ...prev,
      index: (prev.index + 1) % WORDS.length,
      queue: WORDS,
      wrong: [],
    }));
  }

  function advanceTraining(isRemember) {
    setTraining((prev) => {
      const { queue, index, wrong } = prev;
      const current = queue[index];

      // Добавляем в wrong, если "Не помню"
      let newWrong = wrong;
      if (!isRemember) {
        if (!wrong.includes(current.id)) {
          newWrong = [...wrong, current.id];
        }
      }

      // Последняя карточка?
      const isLast = index === queue.length - 1;

      if (!isLast) {
        return { queue, index: index + 1, wrong: newWrong };
      }

      // конец круга → если есть wrong — новый круг по ним
      if (newWrong.length > 0) {
        return {
          queue: WORDS.filter((w) => newWrong.includes(w.id)),
          index: 0,
          wrong: [],
        };
      }

      // иначе сброс — все помнят
      return {
        queue: WORDS,
        index: 0,
        wrong: [],
      };
    });
  }

  /* ---------- Смена режима ---------- */
  function switchToView() {
    setMode("view");
    setTraining({ queue: WORDS, index: 0, wrong: [] });
  }

  function switchToTrain() {
    setMode("train");
    setTraining({ queue: WORDS, index: 0, wrong: [] });
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      {/* КНОПКИ РЕЖИМА */}
      <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 12 }}>
        <button
          onClick={switchToView}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: mode === "view" ? "2px solid black" : "1px solid #888",
            background: mode === "view" ? "#e5e7eb" : "#fff",
            cursor: "pointer",
          }}
        >
          Просмотр
        </button>

        <button
          onClick={switchToTrain}
          style={{
            padding: "8px 16px",
            borderRadius: 8,
            border: mode === "train" ? "2px solid black" : "1px solid #888",
            background: mode === "train" ? "#e5e7eb" : "#fff",
            cursor: "pointer",
          }}
        >
          Тренировка
        </button>
      </div>

      {/* ЛЕВАЯ ПАНЕЛЬ */}
      <WordListPanel
        words={WORDS}
        selectedWordId={selectedWord?.id}
        onSelectWord={(w) => setSelectedWord((p) => (p?.id === w.id ? null : w))}
        isOpen={isListOpen}
        onToggleOpen={() => {
          setIsListOpen((v) => !v);
          setSelectedWord(null);
        }}
      />

      {/* ДЕТАЛЬНОЕ ОКНО */}
      {selectedWord && isListOpen && <WordDetails word={selectedWord} />}

      {/* ФЛЕШКАРТА */}
      <Flashcard
        word={currentWord}
        mode={mode}
        onNext={goNextViewMode}
        onRemember={() => advanceTraining(true)}
        onDontRemember={() => advanceTraining(false)}
      />
    </div>
  );
}
