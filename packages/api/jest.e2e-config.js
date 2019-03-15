module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.ts', '!src/main.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '^.+\\.e2e-test.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,
}
