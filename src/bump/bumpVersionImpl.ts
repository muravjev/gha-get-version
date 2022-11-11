import type { Bump, Version } from 'types';

function increment(version: Version, key: Exclude<Bump, '' | 'none'>) {
    const value = Number(version[key]);
    version[key] = String(value + 1);
}

function reset(version: Version, key: Exclude<Bump, '' | 'none' | 'major'>) {
    version[key] = '0';
}

export async function bumpVersionImpl(version: Version, bump: Bump) {
    const clone = { ...version }; //JSON.parse(JSON.stringify(version));
    switch (bump) {
        case '':
            return clone;
        case 'none':
            return clone;
        case 'major':
            reset(clone, 'minor');
            reset(clone, 'patch');
            break;
        case 'minor':
            reset(clone, 'patch');
            break;
        case 'patch':
            break;
        default:
            throw new Error(`Unsupported bump key '${bump}'`);
    }
    increment(clone, bump);
    return clone;
}
