class PolarisProperties {
    private readonly _port: number;
    private readonly _yogaProperties: object;

    constructor(port: number, yogaProperties: object) {
        this._port = port;
        this._yogaProperties = yogaProperties;
    }

    get port(): number {
        return this._port;
    }

    get yogaProperties(): object {
        return this._yogaProperties;
    }
}

export = PolarisProperties;
