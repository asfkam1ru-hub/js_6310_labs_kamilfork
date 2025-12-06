/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',

  // Ищем тесты только в src
  roots: ['<rootDir>/src'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Работать как с ESM для TypeScript
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Современный способ настройки ts-jest (без deprecated globals)
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }]
  },

  // Считаем покрытие ТОЛЬКО по index.ts
  // Компоненты из src/components целиком исключены из отчёта
  collectCoverageFrom: ['src/index.ts']
}

export default config
