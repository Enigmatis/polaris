export class PolarisProperties {
    private readonly _port: number;
    private readonly _endpoint: string;

    constructor(port: number, endpoint: string) {
        this._port = port;
        this._endpoint = endpoint;
    }

    get port(): number {
        return this._port;
    }

    get endpoint(): string {
        return this._endpoint;
    }
}
