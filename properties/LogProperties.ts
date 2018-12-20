export class LogProperties {

    //#region Data Members

    private readonly _loggerLevel: string;
    private readonly _logstashHost: string;
    private readonly _logstashPort: number;

    //#endregions

    //#region Constructor

    constructor(loggerLevel: string, logstashHost: string, logstashPort: number) {
        this._loggerLevel = loggerLevel;
        this._logstashHost = logstashHost;
        this._logstashPort = logstashPort;
    }

    //#endregion

    //#region Setters

    get loggerLevel(): string {
        return this._loggerLevel;
    }

    get logstashHost(): string {
        return this._logstashHost;
    }

    get logstashPort(): number {
        return this._logstashPort;
    }

    //#endregion
}