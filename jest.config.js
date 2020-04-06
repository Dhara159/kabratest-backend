export default {
  transform: {
    '.js': 'jest-esm-transformer', // To enable ESM modules with Jest
  },
  setupFiles: ["<rootDir>/.jest/vars.js"], // Mock dotenv vars and make them accessible in test files using process.env
  testEnvironment: "node", // Disable default browser environment (using jsdom) and enable node environment for testing as we have nothing to do with dom in this repo
  preset: '@shelf/jest-mongodb', // For mocking mongodb connection
}