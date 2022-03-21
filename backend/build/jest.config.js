"use strict";
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
exports.__esModule = true;
exports["default"] = {
    // All imported modules in your tests should be mocked automatically
    // automock: false,
    // Stop running tests after `n` failures
    // bail: 0,
    // The directory where Jest should store its cached dependency information
    // cacheDirectory: "/private/var/folders/6l/1zxdhwnd1997t7v5l6kfd_5r0000gn/T/jest_dx",
    // Automatically clear mock calls, instances and results before every test
    clearMocks: true,
    // Indicates whether the coverage information should be collected while executing the test
    // collectCoverage: false,
    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,
    // The directory where Jest should output its coverage files
    // coverageDirectory: undefined,
    // An array of regexp pattern strings used to skip coverage collection
    // coveragePathIgnorePatterns: [
    //   "/node_modules/"
    // ],
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    // A list of reporter names that Jest uses when writing coverage reports
    // coverageReporters: [
    //   "json",
    //   "text",
    //   "lcov",
    //   "clover"
    // ],
    // An object that configures minimum threshold enforcement for coverage results
    // coverageThreshold: undefined,
    // A path to a custom dependency extractor
    // dependencyExtractor: undefined,
    // Make calling deprecated APIs throw helpful error messages
    // errorOnDeprecated: false,
    // Force coverage collection from ignored files using an array of glob patterns
    // forceCoverageMatch: [],
    // A path to a module which exports an async function that is triggered once before all test suites
    // globalSetup: undefined,
    // A path to a module which exports an async function that is triggered once after all test suites
    // globalTeardown: undefined,
    // A set of global variables that need to be available in all test environments
    // globals: {},
    // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
    // maxWorkers: "50%",
    // An array of directory names to be searched recursively up from the requiring module's location
    // moduleDirectories: [
    //   "node_modules"
    // ],
    // An array of file extensions your modules use
    // moduleFileExtensions: [
    //   "js",
    //   "jsx",
    //   "ts",
    //   "tsx",
    //   "json",
    //   "node"
    // ],
    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    // moduleNameMapper: {},
    // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
    modulePathIgnorePatterns: ["<rootDir>/build/"]
};
