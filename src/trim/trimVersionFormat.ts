import type { Version } from 'types';

import { group } from '@actions/core';
import { info, infoInputs } from 'utils/info';

import { trimVersionFormatImpl } from './trimVersionFormatImpl';

export async function trimVersionFormat(format: string, version: Version, trim: string) {
    return group('Trim version format', async () => {
        infoInputs({ format, version, trim });
        return trimVersionFormatImpl(format, version, trim)
            .then(async version => {
                info(`Version successfully trimmed.`);
                return version;
            })
            .catch(async e => {
                info('Failed to trim version.', e);
                throw new Error('Failed to trim version.');
            });
    });
}
