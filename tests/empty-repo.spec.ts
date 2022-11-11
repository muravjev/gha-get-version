import * as core from '@actions/core';
import { action } from 'action';
import { setRepo } from './utils/setRepo';
import { setInput } from './utils/helpers';

jest.spyOn(core, 'group').mockImplementation((_, fn) => fn());
jest.spyOn(core, 'info').mockImplementation();

jest.spyOn(core, 'setOutput').mockImplementation();
const mockSetFailed = jest.spyOn(core, 'setFailed').mockImplementation();

describe('empty-action', () => {
    setRepo('empty');
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('failed to get version', async () => {
        setInput('match', '*');
        await action();
        expect(mockSetFailed).toHaveBeenCalledWith('Failed to get version.');
    });
});
