import type { Version } from 'types';

export async function formatVersionImpl(format: string, version: Version) {
    return format.replace(/{(.*?)}/g, function (_: string, key: keyof Version): string {
        if (key in version == false) {
            throw new Error(`Unsupported version key '${key}'.`);
        }
        const value = version[key];
        if (value === undefined) {
            throw new Error(`Value for key '${key}' is undefined.`);
        }
        return value;
    });
}
