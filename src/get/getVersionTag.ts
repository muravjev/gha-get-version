import { group } from '@actions/core';
import { exec } from 'utils/exec';
import { info, infoInputs } from 'utils/info';

async function getVersionTagFromTags(match: string) {
    // Param --long - always return number of commits and hash, even for HEAD.
    return exec('git', ['describe', '--long', '--tags', '--match', `${match}`]);
}

async function getVersionTagFromCommits() {
    const commits = await exec('git', ['rev-list', '--count', 'HEAD']);
    const hash = await exec('git', ['rev-parse', '--short', 'HEAD']);
    return `0.0.0-${commits}-g${hash}`;
}

export async function getVersionTag(match: string) {
    return group('Get version tag', async () => {
        infoInputs({ match });
        if (!match) {
            match = '*';
        }
        return getVersionTagFromTags(match)
            .then(async version => {
                info(`Got version from tag.`);
                return version;
            })
            .catch(async e => {
                info(`Could not find version from tag.`, e);
                return getVersionTagFromCommits()
                    .then(async version => {
                        info(`Got version from commits.`);
                        return version;
                    })
                    .catch(async e => {
                        info('Could not find version from commits.', e);
                        throw new Error('Failed to get version.');
                    });
            });
    });
}
