let path = require('path');
let fs = require('fs');

class PropertiesReader {
    private static _properties: object;

    static get properties(): object {
        return this._properties;
    }

    static readPropertiesFromFile(filePath: string) {
        let propertiesPath = path.join('../', filePath);
        this._properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));
    }
}

export = PropertiesReader;
