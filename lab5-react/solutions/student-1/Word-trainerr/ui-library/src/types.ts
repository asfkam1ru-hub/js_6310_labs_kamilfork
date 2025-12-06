export type Word = {
  id: string
  term: string
  translation: string
  example: string
  exampleTranslation: string
}

export type Deck = {
  id: string
  name: string
  words: Word[]
}
