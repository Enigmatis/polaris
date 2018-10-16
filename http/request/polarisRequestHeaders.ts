import {HeaderNames} from "../headerNames";

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

    constructor(headers: object) {
        this._dataVersion = headers[HeaderNames.DATA_VERSION];
        this._isSnapshot = headers[HeaderNames.SNAPSHOT];
        this._includeLinkedOperation = headers[HeaderNames.INCLUDE_LINKED_OPER];
        this._snapshotPageSize = headers[HeaderNames.SNAPSHOT_PAGE_SIZE];
        this._isPolling = headers[HeaderNames.POLLING];
        this._requestId = headers[HeaderNames.REQUEST_ID];
        this._upn = headers[HeaderNames.UPN];
        this._eventKind = headers[HeaderNames.EVENT_KIND];
        this._realityId = headers[HeaderNames.REALITY_ID];
        this._requestingSystemId = headers[HeaderNames.REQUESTING_SYS];
        this._requestingSystemName = headers[HeaderNames.REQUESTING_SYS_NAME];
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
