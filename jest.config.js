module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
        '\\.(js|jsx)?$': 'babel-jest',
    },
    testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ], // finds test
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    testPathIgnorePatterns: ['/node_modules/'],
    setupFilesAfterEnv: [
        '@testing-library/react/cleanup-after-each'
    ], // setupFiles before the tests are ran
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy" // ignore css and less files
    }
}