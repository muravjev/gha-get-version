import { group } from '@actions/core';
import { info, infoInputs } from 'utils/info';

import { parseVersionTagImpl } from './parseVersionTagImpl';

export async function parseVersionTag(versionTag: string) {
    return group('Parse version tag', async () => {
        infoInputs({ versionTag });
        return parseVersionTagImpl(versionTag)
            .then(async version => {
                info(`Version successfully parsed.`);
                return version;
            })
            .catch(async e => {
                info('Failed to parse version.', e);
                throw new Error('Failed to parse version.');
            });
    });
}
