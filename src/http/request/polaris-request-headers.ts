import { HeaderNames } from '../header-names';

export class PolarisRequestHeaders {
    readonly dataVersion?: number; // not needed
    readonly isSnapshot?: boolean;
    readonly includeLinkedOperation?: boolean;
    readonly snapshotPageSize?: number;
    readonly requestId?: string;
    readonly upn?: string; //
    readonly eventKind?: string; //
    readonly realityId?: string; //
    readonly requestingSystemId?: string; //
    readonly requestingSystemName?: string;

    constructor(headers: any) {
        this.dataVersion = headers[HeaderNames.DATA_VERSION];
        this.isSnapshot = headers[HeaderNames.SNAPSHOT];
        this.includeLinkedOperation = headers[HeaderNames.INCLUDE_LINKED_OPER];
        this.snapshotPageSize = headers[HeaderNames.SNAPSHOT_PAGE_SIZE];
        this.requestId = headers[HeaderNames.REQUEST_ID];
        this.upn = headers[HeaderNames.UPN];
        this.eventKind = headers[HeaderNames.EVENT_KIND];
        this.realityId = headers[HeaderNames.REALITY_ID];
        this.requestingSystemId = headers[HeaderNames.REQUESTING_SYS];
        this.requestingSystemName = headers[HeaderNames.REQUESTING_SYS_NAME];
    }
}
