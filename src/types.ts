export type Version = Partial<{
    prefix: string;
    major: string;
    minor: string;
    patch: string;
    prerelease: string;
    metadata: string;
    commits: string;
    hash: string;
}>;

export type Bump = '' | 'none' | 'major' | 'minor' | 'patch';

export const defaults: Version = {
    prefix: undefined,
    major: '0',
    minor: '0',
    patch: '0',
    prerelease: undefined,
    metadata: undefined,
    commits: '0',
    hash: undefined
};
