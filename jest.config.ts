import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  moduleFileExtensions: ["js", "ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/tests/(.*)$": "<rootDir>/tests/$1",
  },
  testMatch: ["<rootDir>/tests/**/*.spec.ts"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
