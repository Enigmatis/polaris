export class PolarisProperties {

    //#region Data Members

    private readonly _port: number;
    private readonly _endpoint: string;

    //#endregion

    //#region Constructor

    constructor(port: number, endpoint: string) {
        this._port = port;
        this._endpoint = endpoint;
    }

    //#endregion

    //#region Getters

    get port(): number {
        return this._port;
    }

    get endpoint(): string {
        return this._endpoint;
    }

//#endregion
}
