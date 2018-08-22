class PolarisPropertiesReader {
    private static _properties: object;

    static get properties(): object {
        return this._properties;
    }

    static readPropertiesFromFile(filePath: string) {
        let propertiesPath = '../' + filePath;
        let fs = require('fs');
        this._properties = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));
    }

    static printProperties() {
        for (let property in this._properties) {
            console.log("key:" + property + ", value:" + this.properties[property]);
        }
    }
}

export = PolarisPropertiesReader;
