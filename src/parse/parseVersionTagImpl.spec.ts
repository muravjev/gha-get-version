import type { Version } from 'types';

import { parseVersionTagImpl } from './parseVersionTagImpl';

const VALID_PREFIXES = [
    '', //< none
    'v', //< v prefix
    'v.', //< v. prefix
    'package@', //< changesets package prefix
    '@owner/package' //< changesets owner package prefix
];

const VALID_SUFFIXES = [
    ['-6-gf689fa1', '6', 'f689fa1'] //< git describe suffix
];
const INVALID_SUFFIXES = [
    [''] //< none
];

const VALID_VERSIONS = [
    ['1', '1'], //< <major>
    ['1.2', '1', '2'], //< <major>.<minor>
    ['1.2.3', '1', '2', '3'], //< <major>.<minor>.<patch>
    ['1.2.3-rc', '1', '2', '3', 'rc'], //< <major>.<minor>.<patch>-<prerelease>
    ['1.2.3-rc.4', '1', '2', '3', 'rc.4'], //< <major>.<minor>.<patch>-<prerelease>
    ['1.2.3-rc.4+build.5', '1', '2', '3', 'rc.4', 'build.5'] //< <major>.<minor>.<patch>-<prerelease>+<metadata>
];
const INVALID_VERSIONS = [
    ['1a'], //< invalid semver format
    ['1.2a']
];

describe('parse succeeds', () => {
    const versions = VALID_VERSIONS;
    const prefixes = VALID_PREFIXES;
    const suffixes = VALID_SUFFIXES;
    const cases = suffixes
        .map(s =>
            prefixes.map(p =>
                versions.map(v => {
                    const version = p + v[0] + s[0];
                    const major = v.at(1);
                    const minor = v.at(2);
                    const patch = v.at(3);
                    const prerelease = v.at(4);
                    const metadata = v.at(5);
                    const prefix = p;
                    const commits = s.at(1);
                    const hash = s.at(2);
                    const expects: Version = {
                        major,
                        minor,
                        patch,
                        prerelease,
                        metadata,
                        prefix,
                        commits,
                        hash
                    };

                    return [version, expects] as const;
                })
            )
        )
        .flat(2);

    it.each(cases)('%s', async (version, expects) => {
        const parsed = await parseVersionTagImpl(version);
        expect(parsed).toEqual(expects);
    });
});

describe('parse fails - invalid tag format', () => {
    const versions = VALID_VERSIONS;
    const prefixes = VALID_PREFIXES;
    const suffixes = INVALID_SUFFIXES;
    const cases = suffixes
        .map(s =>
            prefixes.map(p =>
                versions.map(v => {
                    return p + v[0] + s[0];
                })
            )
        )
        .flat(1);

    it.each(cases)('%s', async version => {
        await expect(parseVersionTagImpl(version)).rejects.toThrow('Invalid tag format.');
    });
});

describe('parse fails - invalid version format', () => {
    const versions = INVALID_VERSIONS;
    const prefixes = VALID_PREFIXES;
    const suffixes = VALID_SUFFIXES;
    const cases = suffixes
        .map(s =>
            prefixes.map(p =>
                versions.map(v => {
                    return [p + v[0] + s[0], v[0]] as const;
                })
            )
        )
        .flat(2);

    it.each(cases)('%s', async (tag, version) => {
        await expect(parseVersionTagImpl(tag)).rejects.toThrow(
            `Invalid version format. (version: '${version}').`
        );
    });
});
