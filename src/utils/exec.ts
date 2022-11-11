import * as core from '@actions/core';
import { ExecOptions, getExecOutput } from '@actions/exec';

export async function exec(commandLine: string, args?: string[]) {
    const options: ExecOptions = {
        cwd: process.env.TESTS_REPOS_PATH,
        failOnStdErr: false,
        ignoreReturnCode: true,
        silent: !core.isDebug()
    };

    return getExecOutput(commandLine, args, options).then(output => {
        if (output.exitCode == 0) {
            return output.stdout.trim();
        }
        throw new Error(output.stderr.trim());
    });
}
