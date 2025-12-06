export type ButtonVariant = 'primary' | 'secondary'

export type ButtonProps = {
  label: string
  variant?: ButtonVariant
}

export const buildButtonLabel = (props: ButtonProps): string => {
  const variant = props.variant ?? 'primary'
  return `${variant.toUpperCase()}: ${props.label}`
}

// Re-exports for Word-trainer UI components
export * from './types'
export * from './components/DeckList'
export * from './components/WordList'
export * from './components/FlashcardTrainer'
export * from './components/WordDetails'

