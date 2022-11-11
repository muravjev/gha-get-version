// const regex =
//   /^(.*?)(:?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)(?:\-([\d]+)\-g([\da-z]+))?$/;

const tagRegex = /^(.*?)([\d][^@]*?)(?:-([\d]+)-g([\da-z]+))?$/;
// const semverReg =
//   /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
const semverReg =
    /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?(?:\.(0|[1-9]\d*))?(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

export type Version = {
    major: string | undefined;
    minor: string | undefined;
    patch: string | undefined;
    prerelise: string | undefined;
    build: string | undefined;
    prefix: string | undefined;
    commits: string | undefined;
    hash: string | undefined;
};

async function parseVersion(tag: string): Promise<Version> {
    const tagArray = tagRegex.exec(tag);
    if (tagArray == null) {
        throw new Error(`Invalid tag format (tag: '${tag}').`);
    }

    const prefix = tagArray.at(1);
    const semver = tagArray.at(2);
    const commits = tagArray.at(3);
    const hash = tagArray.at(4);
    if (semver == null) {
        throw new Error(`Invalid version format (version: null, tag: '${tag}').`);
    }

    const semverArray = semverReg.exec(semver);
    if (semverArray == null) {
        throw new Error(`Invalid version format (version: '${semver}', tag: '${tag}').`);
    }

    const major = semverArray.at(1);
    const minor = semverArray.at(2);
    const patch = semverArray.at(3);
    const prerelise = semverArray.at(4);
    const build = semverArray.at(5);

    return {
        prefix,
        major,
        minor,
        patch,
        prerelise,
        build,
        commits,
        hash
    };
}

// <prefix>.<major>.<minor>.<patch>-<pre-release>-<metadata>+<commits>+<hash>

export { parseVersion };
