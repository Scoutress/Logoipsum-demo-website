module.exports = {
  testTimeout: 30000,
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
  },
};
