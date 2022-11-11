import repos from '../../configs/repos';

type Repos = 'empty' | 'tags';

export function setRepo(repo: Repos) {
    beforeAll(() => {
        process.env.TESTS_REPOS_PATH = `${repos.path}/${repo}`;
    });

    afterAll(() => {
        delete process.env.TESTS_REPOS_PATH;
    });
}
