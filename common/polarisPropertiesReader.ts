let path = require('path');
let fs = require('fs');

class PolarisPropertiesReader {
    private static _properties: object;

    static get properties(): object {
        return this._properties;
    }

    static readPropertiesFromFile(filePath: string) {
        let propertiesPath = path.join('../', filePath);
        this._properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));
    }

    static printProperties() {
        for (let property in this._properties) {
            console.log("key:" + property + ", value:" + this.properties[property]);
        }
    }
}

export = PolarisPropertiesReader;
