import { useState } from "react";

// ======================
// Word Table Component
// ======================
export function WordTable({ words, onSelect }) {
  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Слово</th>
            <th className="border border-gray-400 p-2">Перевод</th>
          </tr>
        </thead>
        <tbody>
          {words.map((w) => (
            <tr
              key={w.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onSelect(w)}
            >
              <td className="border border-gray-400 p-2">{w.word}</td>
              <td className="border border-gray-400 p-2">{w.translation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ======================
// Word Study Card
// ======================
export function StudyCard({ wordData }) {
  const [showTranslation, setShowTranslation] = useState(false);

  if (!wordData) return <div className="p-4">Выберите слово из таблицы</div>;

  return (
    <div className="p-4 border border-gray-400 rounded-xl max-w-lg">
      <h2 className="text-xl font-bold mb-4">Карточка изучения</h2>
      <p className="text-lg">Слово: <strong>{wordData.word}</strong></p>
      <p className="mt-2 italic">Контекст: {wordData.context}</p>

      {showTranslation && (
        <div className="mt-4">
          <p>Перевод: <strong>{wordData.translation}</strong></p>
          <p>Перевод контекста: {wordData.contextTranslation}</p>
        </div>
      )}

      <button
        className="mt-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
        onClick={() => setShowTranslation(true)}
      >
        Показать перевод
      </button>
    </div>
  );
}

// ======================
// Example App Structure
// ======================
export default function App() {
  const [selectedWord, setSelectedWord] = useState(null);

  const sampleWords = [
    {
      id: 1,
      word: "apple",
      translation: "яблоко",
      context: "I ate an apple yesterday",
      contextTranslation: "Я съел яблоко вчера",
    },
    {
      id: 2,
      word: "book",
      translation: "книга",
      context: "This book is very interesting",
      contextTranslation: "Эта книга очень интересная",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      <WordTable words={sampleWords} onSelect={setSelectedWord} />
      <StudyCard wordData={selectedWord} />
    </div>
  );
}
