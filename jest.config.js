module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy"
    },
    testEnvironment: 'jest-environment-jsdom'
  };