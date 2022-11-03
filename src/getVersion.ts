import { exec } from '@actions/exec';

async function getVersion(match: string) {
    let message = '';
    let error = '';
    const options = {
        listeners: {
            stdout: (data: Buffer) => {
                message += data.toString();
            },
            stderr: (data: Buffer) => {
                error += data.toString();
            }
        }
    };

    const args = ['describe', '--tags', '--match', `${match}`];
    return exec('git', args, options).then(
        () => Promise.resolve(message.trim()),
        () => Promise.reject(`Reject ${error}`)
    );
}

export { getVersion };
