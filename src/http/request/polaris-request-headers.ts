import { HeaderNames } from '../header-names';

export class PolarisRequestHeaders {
    public readonly dataVersion: number;
    public readonly isSnapshot: boolean;
    public readonly includeLinkedOperation: boolean;
    public readonly snapshotPageSize: number;
    public readonly isPolling: boolean;
    public readonly requestId: string;
    public readonly upn: string;
    public readonly eventKind: string;
    public readonly realityId: number;
    public readonly requestingSystemId: string;
    public readonly requestingSystemName: string;

    constructor(headers: any) {
        this.dataVersion = headers[HeaderNames.DATA_VERSION];
        this.isSnapshot = headers[HeaderNames.SNAPSHOT];
        this.includeLinkedOperation = headers[HeaderNames.INCLUDE_LINKED_OPER];
        this.snapshotPageSize = headers[HeaderNames.SNAPSHOT_PAGE_SIZE];
        this.isPolling = headers[HeaderNames.POLLING];
        this.requestId = headers[HeaderNames.REQUEST_ID];
        this.upn = headers[HeaderNames.UPN];
        this.eventKind = headers[HeaderNames.EVENT_KIND];
        this.realityId = headers[HeaderNames.REALITY_ID];
        this.requestingSystemId = headers[HeaderNames.REQUESTING_SYS];
        this.requestingSystemName = headers[HeaderNames.REQUESTING_SYS_NAME];
    }
}
