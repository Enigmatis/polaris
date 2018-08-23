export class PolarisProperties {
    private readonly _port: number;
    private readonly _endpoint: string;
    private readonly _playground: string | false;

    constructor(port: number, endpoint: string, playground: string | false) {
        this._port = port;
        this._endpoint = endpoint;
        this._playground = playground;
    }

    get port(): number {
        return this._port;
    }

    get endpoint(): string {
        return this._endpoint;
    }

    get playground(): string | false {
        return this._playground;
    }
}
