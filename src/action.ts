import { getInput, setOutput, setFailed, info } from '@actions/core';

import { getVersionTag } from 'get/getVersionTag';
import { parseVersionTag } from 'parse/parseVersionTag';
import { bumpVersion } from 'bump/bumpVersion';
import { trimVersionFormat } from 'trim/trimVersionFormat';
import { formatVersion } from 'format/formatVersion';

async function run() {
    const match = getInput('match');
    const bump = getInput('bump');
    const trim = getInput('trim');
    const format = getInput('format');

    const versionTag = await getVersionTag(match);
    info(`version tag: '${versionTag}'`);

    const parsedVersion = await parseVersionTag(versionTag);
    info(`parsed version: ${JSON.stringify(parsedVersion)}`);

    const bumpedVersion = await bumpVersion(parsedVersion, bump);
    info(`bumped version: ${JSON.stringify(bumpedVersion)}`);

    const trimmedFormat = await trimVersionFormat(format, bumpedVersion, trim);
    info(`trimmed format: ${trimmedFormat}`);

    const formattedVersion = await formatVersion(trimmedFormat, bumpedVersion);
    info(`formatted version: ${formattedVersion}`);

    setOutput('version', formattedVersion);
}

export async function action() {
    return run().catch(e => setFailed(e.message));
}
