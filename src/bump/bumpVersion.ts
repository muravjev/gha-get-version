import type { Bump, Version } from 'types';

import { group } from '@actions/core';
import { info, infoInputs } from 'utils/info';

import { bumpVersionImpl } from './bumpVersionImpl';

export async function bumpVersion(version: Version, bump: string) {
    return group('Bump version', async () => {
        infoInputs({ version, bump });
        return bumpVersionImpl(version, bump as Bump)
            .then(async version => {
                info(`Version successfully bumped.`);
                return version;
            })
            .catch(async e => {
                info('Failed to bump version.', e);
                throw new Error('Failed to bump version.');
            });
    });
}
