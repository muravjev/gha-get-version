import type { Version } from 'types';

const tagRegex = /^(.*?)([\d][^@]*?)(?:-([\d]+)-g([\da-z]+))$/;
const semverReg =
    /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?(?:\.(0|[1-9]\d*))?(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

export async function parseVersionTagImpl(version: string): Promise<Version> {
    const tagArray = tagRegex.exec(version);
    if (tagArray == null) {
        throw new Error('Invalid tag format.');
    }

    const prefix = tagArray.at(1);
    const semver = tagArray.at(2);
    const commits = tagArray.at(3);
    const hash = tagArray.at(4);
    if (semver == null) {
        throw new Error('Invalid version format. (version: null).');
    }

    const semverArray = semverReg.exec(semver);
    if (semverArray == null) {
        throw new Error(`Invalid version format. (version: '${semver}').`);
    }

    const major = semverArray.at(1);
    const minor = semverArray.at(2);
    const patch = semverArray.at(3);
    const prerelease = semverArray.at(4);
    const metadata = semverArray.at(5);

    return {
        prefix,
        major,
        minor,
        patch,
        prerelease,
        metadata,
        commits,
        hash
    };
}
