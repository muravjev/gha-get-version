import { defaults, Version } from 'types';

import { trimVersionFormatImpl } from './trimVersionFormatImpl';

const TRIM_FIELDS_ALL = 'prefix|major|minor|patch|prerelease|metadata|commits|hash';
const TRIM_FIELDS_DEFAULTS = 'prefix|prerelease|metadata|commits|hash';
const TRIM_FIELDS_NONE = '';

const DEFAULTS_VERSION: Version = defaults;
const NON_DEFAULTS_VERSION: Version = {
    prefix: 'F',
    major: 'A',
    minor: 'I',
    patch: 'P',
    prerelease: 'R',
    metadata: 'B',
    commits: 'C',
    hash: 'H'
};

const FORMAT_FULL = '0{prefix}1{major}2{minor}3{patch}4{prerelease}5{metadata}6{commits}7{hash}8';

describe('trim defaults value', () => {
    const version = DEFAULTS_VERSION;
    it.each([
        [FORMAT_FULL, TRIM_FIELDS_NONE, FORMAT_FULL],
        [FORMAT_FULL, TRIM_FIELDS_DEFAULTS, '1{major}2{minor}3{patch}8']
    ])('%s', async (format, fields, expected) => {
        const trimmed = await trimVersionFormatImpl(format, version, fields);
        expect(trimmed).toEqual(expected);
    });
});

describe('trim non-defaults value', () => {
    const version = NON_DEFAULTS_VERSION;
    it.each([
        [FORMAT_FULL, TRIM_FIELDS_NONE, FORMAT_FULL],
        [FORMAT_FULL, TRIM_FIELDS_DEFAULTS, FORMAT_FULL]
    ])('%s', async (format, fields, expected) => {
        const trimmed = await trimVersionFormatImpl(format, version, fields);
        expect(trimmed).toEqual(expected);
    });
});

describe('trim invalid fields', () => {
    it.each([
        [FORMAT_FULL, TRIM_FIELDS_ALL, DEFAULTS_VERSION],
        [FORMAT_FULL, TRIM_FIELDS_ALL, NON_DEFAULTS_VERSION]
    ])('%s', async (format, fields, version) => {
        await expect(trimVersionFormatImpl(format, version, fields)).rejects.toThrow(
            /Field '\w+' cannot be trimmed./
        );
    });
});
