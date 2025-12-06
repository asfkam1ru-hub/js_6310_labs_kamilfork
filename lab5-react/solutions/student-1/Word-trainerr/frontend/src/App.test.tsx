import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
  it('renders main header text for trainer', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Карточки для запоминания'
      })
    ).toBeInTheDocument()
  })
})

