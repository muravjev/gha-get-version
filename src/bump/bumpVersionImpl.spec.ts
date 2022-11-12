import type { Bump, Version } from 'types';

import { bumpVersionImpl } from './bumpVersionImpl';

const version: Version = {
    prefix: 'F',
    major: '1',
    minor: '2',
    patch: '3',
    prerelease: 'R',
    metadata: 'B',
    commits: 'C',
    hash: 'H'
};

describe('bump succeeds', () => {
    it.each([
        ['', version], //< no bump
        ['none', version], //< no bump
        ['major', { ...version, patch: '0', minor: '0', major: '2' }],
        ['minor', { ...version, patch: '0', minor: '3' }],
        ['patch', { ...version, patch: '4' }]
    ])('%s', async (bump, expected) => {
        const bumped = await bumpVersionImpl(version, bump as Bump);
        expect(bumped).toEqual(expected);
    });
});

describe('bump fails with unsupported key', () => {
    const unsupportedBump = 'whatever';
    it(unsupportedBump, async () => {
        await expect(bumpVersionImpl(version, unsupportedBump as Bump)).rejects.toThrow(
            `Unsupported bump key '${unsupportedBump}'`
        );
    });
});
