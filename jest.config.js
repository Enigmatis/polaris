module.exports = {
    clearMocks : true,
    globalSetup:'./test/integration-tests/test-server/setup.ts',
    globalTeardown:'./test/integration-tests/test-server/teardown.ts',
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        "**/*.test.ts"
    ],
};
