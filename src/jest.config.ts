/* eslint-disable import/export */
import '@testing-library/jest-dom';
import type { Config } from '@jest/types';
import '@testing-library/jest-dom/extend-expect';

// Or async function
export default async (): Promise<Config.InitialOptions> => ({
    verbose: true,
    moduleFileExtensions: ['ts', 'tsx'],
    setupTestFrameworkScriptFile: './setupTest/rtl.setup.ts',
    collectCoverageFrom: ['src/**/*.tsx'],
    coverageReporters: ['text', 'html'],
    moduleDirectories: ['node_modules'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.ts',
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
    displayName: 'local',
    transform: {
        '^.+\\.jsx$': 'babel-jest',
        '^.+\\.js$': 'babel-jest',
    },
});
