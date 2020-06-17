// CONSTRUCTOR
module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: ['node_modules'],
  coverageReporters: ['cobertura', 'json-summary', 'text'],
  reporters: ['default', 'jest-junit'],
  testEnvironment: 'node',
};