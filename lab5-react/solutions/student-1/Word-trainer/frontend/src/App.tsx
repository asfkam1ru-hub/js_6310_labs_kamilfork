import React, { useState } from 'react'
import { decks } from './data'
import type { Deck, Word } from './types'
import { DeckList } from './components/DeckList'
import { WordList } from './components/WordList'
import { FlashcardTrainer } from './components/FlashcardTrainer'
import { WordDetails } from './components/WordDetails'

export const App: React.FC = () => {
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null)
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null)

  const selectedDeck: Deck | undefined = decks.find(deck => deck.id === selectedDeckId)

  const selectedWord: Word | undefined = selectedDeck?.words.find(
    word => word.id === selectedWordId
  )

  const handleDeckSelect = (deckId: string): void => {
    // если нажали на уже выбранную колоду — всё сворачиваем
    if (deckId === selectedDeckId) {
      setSelectedDeckId(null)
      setSelectedWordId(null)
      return
    }

    // выбрали новую колоду — открываем её и сбрасываем выбранное слово
    setSelectedDeckId(deckId)
    setSelectedWordId(null)
  }

  const handleWordSelect = (wordId: string): void => {
    // если нажали по тому же слову — закрываем подробности
    setSelectedWordId(prev => (prev === wordId ? null : wordId))
  }

  return (
    <div className='app-container'>
      {/* Левая колонка — колоды */}
      <DeckList
        decks={decks}
        selectedDeckId={selectedDeckId}
        onSelectDeck={handleDeckSelect}
      />

      {/* Вторая колонка — список слов (выдвижная панель) */}
      <div className={`word-panel ${selectedDeck ? 'word-panel--open' : ''}`}>
        {selectedDeck && (
          <WordList
            deck={selectedDeck}
            selectedWordId={selectedWordId}
            onSelectWord={handleWordSelect}
          />
        )}
      </div>

      {/* Третья колонка — подробная информация по слову (ширина фиксирована, чтобы справа ничего не сдвигалось) */}
      <div className='details-panel'>
        {selectedWord && <WordDetails word={selectedWord} />}
      </div>

      {/* Четвёртая колонка — флеш-карточки, всегда на своём месте */}
      <div className='trainer-panel'>
        <FlashcardTrainer deck={selectedDeck} />
      </div>
    </div>
  )
}
