module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks : true,
    globalSetup:'./dist/test/integration-tests/test-server/setup.js',
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    testMatch: [
        "**/*.test.ts"
    ],
};