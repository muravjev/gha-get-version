import * as core from '@actions/core';
import { action } from 'action';
import { setRepo } from './utils/setRepo';
import { setInputs } from './utils/helpers';

jest.spyOn(core, 'group').mockImplementation((_, fn) => fn());
jest.spyOn(core, 'info').mockImplementation();

const mockSetFailed = jest.spyOn(core, 'setFailed').mockImplementation();
const mockSetOutput = jest.spyOn(core, 'setOutput').mockImplementation();

describe('tags-action', () => {
    setRepo('tags');
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const hash = 'd38a638';

    const data = [
        {
            match: '', //< c3.4.5-0-gd38a638
            prefix: ['', 'c', 'v'],
            bumped: ['3.4.5', '3.4.5', '4.0.0', '3.5.0', '3.4.6'],
            suffix: ['', '', `@${hash}`]
        },
        {
            match: 'a*', // a1.2.3-2-gd38a638
            prefix: ['', 'a', 'v'],
            bumped: ['1.2.3', '1.2.3', '2.0.0', '1.3.0', '1.2.4'],
            suffix: ['', '.2', `#2@${hash}`]
        },
        {
            match: 'b*', // b2.3.4-1-gd38a638
            prefix: ['', 'b', 'v'],
            bumped: ['2.3.4', '2.3.4', '3.0.0', '2.4.0', '2.3.5'],
            suffix: ['', '.1', `#1@${hash}`]
        },
        {
            match: 'c*', //< c3.4.5-0-gd38a638
            prefix: ['', 'c', 'v'],
            bumped: ['3.4.5', '3.4.5', '4.0.0', '3.5.0', '3.4.6'],
            suffix: ['', '', `@${hash}`]
        },
        {
            match: '*d', //< 0.0.0-3-gd38a638
            prefix: ['', '', 'v'],
            bumped: ['0.0.0', '0.0.0', '1.0.0', '0.1.0', '0.0.1'],
            suffix: ['', '.3', `#3@${hash}`]
        }
    ] as const;

    const matches = ['*', 'a*', 'b*', 'c*', '*d'];
    const bumps = ['', 'none', 'major', 'minor', 'patch'];
    const prefixes = ['', '{prefix}', 'v'];
    const suffixes = ['', '.{commits}', '-{prerelease}+{metadata}#{commits}@{hash}'];

    const cases = matches
        .map(match =>
            bumps.map(bump =>
                prefixes.map(prefix =>
                    suffixes.map(suffix => [match, bump, prefix, suffix] as const)
                )
            )
        )
        .flat(3);

    it.each(cases)('%s %s "%s{major}.{minor}.{patch}%s"', async (match, bump, prefix, suffix) => {
        setInputs({
            match,
            bump,
            trim: 'prefix|prerelease|metadata|commits|hash',
            format: prefix + '{major}.{minor}.{patch}' + suffix
        });
        await action();
        const mi = matches.indexOf(match);
        const bi = bumps.indexOf(bump);
        const pi = prefixes.indexOf(prefix);
        const si = suffixes.indexOf(suffix);

        const d = data[mi];
        const version_ = d.bumped[bi];
        const prefix_ = d.prefix[pi];
        const suffix_ = d.suffix[si];

        const version = `${prefix_}${version_}${suffix_}`;

        expect(mockSetFailed).not.toBeCalled();
        expect(mockSetOutput).toHaveBeenCalledWith('version', version);
    });
});
