module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "tests",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
};
