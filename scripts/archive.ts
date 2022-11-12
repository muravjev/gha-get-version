import adm_zip from 'adm-zip';

import repos from '../configs/repos';

const zip = new adm_zip();
zip.addLocalFolder(repos.path);
zip.writeZip(repos.arch);
console.log(`Repos archived to '${repos.arch}'.`);
