module.exports = {
    clearMocks: true,
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    preset: 'ts-jest',
    setupFilesAfterEnv: [
        './jest.setup.js'
    ],
    testEnvironment: 'node',
    testMatch: [
        "**/*.test.ts"
    ],
};