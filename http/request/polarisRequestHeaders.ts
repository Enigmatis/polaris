export class PolarisRequestHeaders {
    private readonly _dataVersion: number;
    private readonly _isSnapshot: boolean;
    private readonly _includeLinkedOperation: boolean;
    private readonly _snapshotPageSize: number;
    private readonly _isPolling: boolean;
    private readonly _requestId: string;
    private readonly _upn: string;
    private readonly _eventKind: string;
    private readonly _realityId: number;
    private readonly _requestingSystemId: string;
    private readonly _requestingSystemName: string;

    constructor(dataVersion: number, isSnapshot: boolean, includeLinkedOperation: boolean, snapshotPageSize: number, isPolling: boolean, requestId: string, upn: string, eventKind: string, realityId: number, requestingSystemId: string, requestingSystemName: string) {
        this._dataVersion = dataVersion;
        this._isSnapshot = isSnapshot;
        this._includeLinkedOperation = includeLinkedOperation;
        this._snapshotPageSize = snapshotPageSize;
        this._isPolling = isPolling;
        this._requestId = requestId;
        this._upn = upn;
        this._eventKind = eventKind;
        this._realityId = realityId;
        this._requestingSystemId = requestingSystemId;
        this._requestingSystemName = requestingSystemName;
    }

    get dataVersion(): number {
        return this._dataVersion;
    }

    get isSnapshot(): boolean {
        return this._isSnapshot;
    }

    get includeLinkedOperation(): boolean {
        return this._includeLinkedOperation;
    }

    get snapshotPageSize(): number {
        return this._snapshotPageSize;
    }

    get isPolling(): boolean {
        return this._isPolling;
    }

    get requestId(): string {
        return this._requestId;
    }

    get upn(): string {
        return this._upn;
    }

    get eventKind(): string {
        return this._eventKind;
    }

    get realityId(): number {
        return this._realityId;
    }

    get requestingSystemId(): string {
        return this._requestingSystemId;
    }

    get requestingSystemName(): string {
        return this._requestingSystemName;
    }
}
