module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/server/src/$1',
    '^@app/(.*)$': '<rootDir>/apps/$1',
    '^@libs/(.*)$': '<rootDir>/libs/$1'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@nestjs|nest))'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node']
};
