let fs = require('fs');

export let readJsonFromFile = function (filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};
