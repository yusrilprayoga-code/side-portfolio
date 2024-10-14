module.exports = {
    // Look for test files in these directories
    roots: [
        '<rootDir>/src/app', 
        '<rootDir>/src/components', 
        '<rootDir>/src/constants', 
        '<rootDir>/src/hooks',
        '<rootDir>/src/types',
    ],
  
    // Jest will automatically look for test files with the following naming patterns
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)', // Any file in a __tests__ folder
      '**/?(*.)+(spec|test).[tj]s?(x)' // Any file with .test or .spec in its name
    ],
  
    // Optional: Test environment, typically "jsdom" for browser-like testing
    testEnvironment: 'jest-environment-jsdom',
  
    // Optional: Transpiler for TypeScript or JSX (if needed)
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };
  