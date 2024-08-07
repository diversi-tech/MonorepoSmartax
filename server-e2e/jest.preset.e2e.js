// jest.preset.e2e.js
module.exports = {
    displayName: 'server-e2e',
    preset: 'ts-jest/presets/default',
    testEnvironment: 'node',
    transform: {
      '^.+\\.[tj]s$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'html'],
    coverageDirectory: '../../coverage/apps/server-e2e',
  };
  