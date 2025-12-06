import React, { useState } from 'react'
import { decks } from './data'
import type { Deck, Word } from './types'
import { DeckList, WordList, FlashcardTrainer, WordDetails } from '../../ui-library/src'
import './App.css'

export const App: React.FC = () => {
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(
    decks.length > 0 ? decks[0].id : null
  )
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null)

  const selectedDeck: Deck | undefined = decks.find(deck => deck.id === selectedDeckId) ?? decks[0]
  const selectedWord: Word | undefined =
    selectedDeck?.words.find(word => word.id === selectedWordId) ?? undefined

  const handleDeckSelect = (deckId: string): void => {
    setSelectedDeckId(deckId)
    setSelectedWordId(null)
  }

  const handleWordSelect = (wordId: string): void => {
    setSelectedWordId(wordId)
  }

  return (
    <div className="app">
      <h1>Карточки для запоминания</h1>

      <div className="layout">
        {/* Первая колонка — список дек */}
        <div className="deck-panel">
          <DeckList
            decks={decks}
            selectedDeckId={selectedDeckId}
            onSelectDeck={handleDeckSelect}
          />
        </div>

        {/* Вторая колонка — список слов текущей деки */}
        <div className="word-list-panel">
          {selectedDeck && (
            <WordList
              deck={selectedDeck}
              selectedWordId={selectedWordId}
              onSelectWord={handleWordSelect}
            />
          )}
        </div>

        {/* Третья колонка — подробная информация по слову */}
        <div className="details-panel">
          {selectedWord && <WordDetails word={selectedWord} />}
        </div>

        {/* Четвёртая колонка — тренировка по флеш-карточкам */}
        <div className="trainer-panel">
          {selectedDeck && <FlashcardTrainer deck={selectedDeck} />}
        </div>
      </div>
    </div>
  )
}

export default App

