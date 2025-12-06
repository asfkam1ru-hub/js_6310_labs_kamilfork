import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { DeckList } from '../../ui-library/src'
import type { Deck } from './types'

const decks: Deck[] = [
  {
    id: 'd1',
    name: 'Test deck 1',
    words: []
  },
  {
    id: 'd2',
    name: 'Test deck 2',
    words: []
  }
]

describe('DeckList', () => {
  it('renders deck names', () => {
    const handleSelect = jest.fn()

    render(
      <DeckList
        decks={decks}
        selectedDeckId={null}
        onSelectDeck={handleSelect}
      />
    )

    expect(screen.getByText('Test deck 1')).toBeInTheDocument()
    expect(screen.getByText('Test deck 2')).toBeInTheDocument()
  })

  it('calls onSelectDeck when a deck is clicked', () => {
    let selectedId: string | null = null

    const handleSelect = (deckId: string): void => {
      selectedId = deckId
    }

    render(
      <DeckList
        decks={decks}
        selectedDeckId={null}
        onSelectDeck={handleSelect}
      />
    )

    fireEvent.click(screen.getByText('Test deck 1'))
    expect(selectedId).toBe('d1')
  })
})

