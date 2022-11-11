import * as core from '@actions/core';

export async function info(message: string, e: unknown = undefined) {
    core.info(message);
    if (e) {
        const regex = /\n/gi;
        core.info('   > ' + e.toString().replace(regex, '\n   > '));
    }
}

export async function infoInput(name: string, value: string) {
    core.info(`  ${name}: ${value}`);
}

export function infoInputs(map: { [key: string]: string | object }) {
    core.info('with:');
    Object.keys(map).forEach(key => infoInput(key, JSON.stringify(map[key])));
}
