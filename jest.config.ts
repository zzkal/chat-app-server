import type { Config } from '@jest/types';
export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    displayName: {
      name: 'ChatAppServer',
      color: 'greenBright',
    },
    verbose: true,
    setupFiles: ['dotenv/config'],
    testMatch: ['**/**/*.test.ts'],
    testEnvironment: 'node',
    detectOpenHandles: true,
    collectCoverage: true,
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    forceExit: true,
  };
};
