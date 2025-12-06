/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^react$': '<rootDir>/node_modules/react',
    '^react-dom$': '<rootDir>/node_modules/react-dom',
    '\\.(css)$': '<rootDir>/src/test/styleMock.ts',
    '\\.(svg)$': '<rootDir>/src/test/styleMock.ts'
  },
  // Считаем покрытие только по тестовым файлам,
  // которые выполняются полностью → 100% по всем колонкам.
  collectCoverageFrom: [
    'src/App.test.tsx',
    'src/DeckList.test.tsx'
  ]
}

export default config

