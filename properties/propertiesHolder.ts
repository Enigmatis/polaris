import {readJsonFromFile} from '../utils/FileReader'

export class PropertiesHolder {
    private static _properties: object;

    static get properties(): object {
        return this._properties;
    }

    static loadPropertiesFromFile(filePath: string) {
        this._properties = readJsonFromFile(filePath);
    }
}
