import type { Version } from 'types';

import { group } from '@actions/core';
import { info, infoInputs } from 'utils/info';

import { formatVersionImpl } from './formatVersionImpl';

export async function formatVersion(format: string, version: Version) {
    return group('Format version', async () => {
        infoInputs({ format, version });
        return formatVersionImpl(format, version)
            .then(async version => {
                info(`Version successfully formatted.`);
                return version;
            })
            .catch(async e => {
                info('Failed to format version.', e);
                throw new Error('Failed to format version.');
            });
    });
}
