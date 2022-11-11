import { getInput, setOutput, setFailed, info } from '@actions/core';
import { getVersion } from './getVersion';
import { parseVersion } from './parseVersion';

async function run() {
    const match = getInput('match');
    info(`match: '${match}'`);

    const version = await getVersion(match);
    info(`version: '${version}'`);

    const parsed = await parseVersion(version);
    info(`parsed: ${parsed}`);

    setOutput('version', parsed);
}

run().catch(e => {
    info(`catch: ${e.message}`);
    setFailed(e.message);
});
