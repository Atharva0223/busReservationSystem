module.exports = {
  verbose: true,
  testEnvironment: "node",
  collectCoverage: true,
  setupFilesAfterEnv: ["jest-extended/all"],
  coverageReporters: ["html", "text-summary"],
  testTimeout: 60000,
//   coverageThreshold: {
//     global: {
//       statements: 80,
//       branches: 80,
//       functions: 80,
//       lines: 80,
//     },
//   },
  testMatch: ["**/tests/**/*.test.js"],
};
