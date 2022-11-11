import type { Version } from 'types';

import { formatVersionImpl } from './formatVersionImpl';

const version: Version = {
    prefix: 'F',
    major: 'A',
    minor: 'I',
    patch: 'P',
    prerelease: 'R',
    metadata: 'B',
    commits: 'C',
    hash: 'H'
};

describe('format succeeds', () => {
    it.each([
        ['{major}1{minor}', 'A1I'],
        ['{major}1{minor}2{patch}', 'A1I2P'],
        ['0{major}1{minor}2{patch}3', '0A1I2P3'],
        [
            '0{prefix}1{major}2{minor}3{patch}4{prerelease}5{metadata}6{commits}7{hash}8',
            '0F1A2I3P4R5B6C7H8'
        ]
    ])('%s', async (format, expected) => {
        const formatted = await formatVersionImpl(format, version);
        expect(formatted).toEqual(expected);
    });
});

describe('format fails with unsupported key', () => {
    it.each([
        ['0{micro}1', `Unsupported version key 'micro'.`],
        ['0{major}1{micro}2', `Unsupported version key 'micro'.`],
        ['0{macro}1{micro}2', `Unsupported version key 'macro'.`]
    ])('%s', async (format, message) => {
        await expect(formatVersionImpl(format, version)).rejects.toThrow(message);
    });
});
