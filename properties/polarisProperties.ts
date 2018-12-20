export class PolarisProperties {

    //#region Data Members

    private readonly _port: number;
    private readonly _endpoint: string;
    private readonly _applicationId: string;
    private readonly _applicationName: string;
    private readonly _repositoryVersion: string;
    private readonly _environment: string;
    private readonly _component: string;

    //#endregion

    //#region Constructor

    constructor(port: number, endpoint: string, applicationId: string, applicationName: string, repositoryVersion: string,
                environment: string, component: string) {
        this._port = port;
        this._endpoint = endpoint;
        this._applicationId = applicationId;
        this._applicationName = applicationName;
        this._repositoryVersion = repositoryVersion;
        this._environment = environment;
        this._component = component;
    }

    //#endregion

    //#region Getters

    get port(): number {
        return this._port;
    }

    get endpoint(): string {
        return this._endpoint;
    }

    get applicationId(): string {
        return this._applicationId;
    }

    get applicationName(): string {
        return this._applicationName;
    }

    get repositoryVersion(): string {
        return this._repositoryVersion;
    }

    get environment(): string {
        return this._environment;
    }

    get component(): string {
        return this._component;
    }

//#endregion
}
