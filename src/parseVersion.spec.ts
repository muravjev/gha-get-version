import type { Version } from './parseVersion';
import { parseVersion } from './parseVersion';

type Case = {
    version: string;
    expects: Version;
};

const versions = [
    ['1', '1'], //< <major>
    ['1.2', '1', '2'], //< <major>.<minor>
    ['1.2.3', '1', '2', '3'], //< <major>.<minor>.<patch>
    ['1.2.3-rc', '1', '2', '3', 'rc'], //< <major>.<minor>.<patch>-<pre-release>
    ['1.2.3-rc.4', '1', '2', '3', 'rc.4'], //< <major>.<minor>.<patch>-<pre-release>
    ['1.2.3-rc.4+build.5', '1', '2', '3', 'rc.4', 'build.5'] //< <major>.<minor>.<patch>-<pre-release>-<metadata>
];

const prefixes = [
    '', //< none
    'v', //< v prefix
    'v.', //< v. prefix
    'package@', //< changesets package prefix
    '@owner/package' //< changesets owner package prefix
];

const suffixes = [
    [''], //< none
    ['-6-gf689fa1', '6', 'f689fa1'] //< git describe suffix
];

describe('parse', () => {
    const cases: Case[] = [];

    for (const s of suffixes) {
        for (const p of prefixes) {
            for (const v of versions) {
                const version = p + v[0] + s[0];
                const major = v.at(1);
                const minor = v.at(2);
                const patch = v.at(3);
                const prerelise = v.at(4);
                const build = v.at(5);
                const prefix = p;
                const commits = s.at(1);
                const hash = s.at(2);

                cases.push({
                    version,
                    expects: {
                        major,
                        minor,
                        patch,
                        prerelise,
                        build,
                        prefix,
                        commits,
                        hash
                    }
                });
            }
        }
    }

    test.each(cases)('$version', async ({ version, expects }) => {
        const parsed = await parseVersion(version);
        expect(parsed).toEqual(expects);
    });
});
