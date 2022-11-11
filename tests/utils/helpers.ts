export const noop = () => undefined;

export function isError(x: unknown): x is { message: string } {
    if (x && typeof x === 'object' && 'message' in x) {
        return true;
    }
    return false;
}

export function setInput(key: string, value: string) {
    process.env[`INPUT_${key.toUpperCase()}`] = value;
}

export function setInputs(map: { [key: string]: string }) {
    Object.keys(map).forEach(key => setInput(key, map[key]));
}
