module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks : true,
    globalSetup:'./test/integration-tests/test-server/setup.ts',
    globalTeardown:'./test/integration-tests/test-server/teardown.ts',
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    testMatch: [
        "**/*.test.ts"
    ],
};