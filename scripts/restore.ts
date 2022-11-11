import fs from 'fs';
import adm_zip from 'adm-zip';

import repos from '../configs/repos';

if (fs.existsSync(repos.path)) {
    console.log(`Repos '${repos.path}' already exist.`);
    process.exit();
}

const unzip = new adm_zip(repos.arch);
unzip.extractAllTo(repos.path, true);
console.log(`Repos restored to '${repos.path}'.`);
