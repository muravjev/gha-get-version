import { defaults, Version } from 'types';

const invalidTrimFieldsRegex = /(?<=^|\|)(major|minor)(?=\||$)/;
const prefixRegex = /(?:^|(?<=})).*?(?={(.*?)})/g;
const valueRegex = /{(.*?)}/g;

type TrimFields = { [key in keyof Version]: boolean };

async function getTrimmed(trim: string): Promise<TrimFields> {
    const invalids = trim.match(invalidTrimFieldsRegex);
    if (invalids !== null) {
        throw new Error(`Field '${invalids[1]}' cannot be trimmed.`);
    }
    return trim.split('|').reduce((a, c) => ({ ...a, [c]: true }), {});
}

async function trimFormat(format: string, version: Version, regex: RegExp, fields: TrimFields) {
    return format.replace(regex, function (match: string, key: keyof Version) {
        if (key in version == false) {
            throw new Error(`Unsupported version key '${key}'.`);
        }
        if (fields[key]) {
            const value = version[key];
            const def = defaults[key];
            if (value === '' || value === def) {
                return '';
            }
        }
        return match;
    });
}

export async function trimVersionFormatImpl(format: string, version: Version, trim: string) {
    const fields = await getTrimmed(trim);
    const trimmedPrefixFormat = await trimFormat(format, version, prefixRegex, fields);
    const trimmedValuesFormat = await trimFormat(trimmedPrefixFormat, version, valueRegex, fields);
    return trimmedValuesFormat;
}
