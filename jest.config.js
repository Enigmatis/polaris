module.exports = {
    preset: 'ts-jest',
    setupTestFrameworkScriptFile: './jest.setup.js',
    testEnvironment: 'node',
    clearMocks : true,
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    testMatch: [
        "**/*.test.ts"
    ],
};