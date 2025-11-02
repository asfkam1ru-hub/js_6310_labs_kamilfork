/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  transform: {},
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/bot/bot.js',
    '!src/utils/index.js'
  ],
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: { branches: 70, functions: 70, lines: 70, statements: 70 }
  }
};
