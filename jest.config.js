module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    clearMocks : true,
    resetModules:true,
    moduleFileExtensions: [
        "ts",
        "js",
    ],
    testMatch: [
        "**/*.test.ts"
    ],
};
