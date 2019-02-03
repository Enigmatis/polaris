import { HeaderNames } from '../header-names';

export class PolarisRequestHeaders {
    readonly dataVersion: number;
    readonly isSnapshot: boolean;
    readonly includeLinkedOperation: boolean;
    readonly snapshotPageSize: number;
    readonly isPolling: boolean;
    readonly requestId: string;
    readonly upn: string;
    readonly eventKind: string;
    readonly realityId: number;
    readonly requestingSystemId: string;
    readonly requestingSystemName: string;

    constructor(headers: any) {
        const joi = require('joi');
        this.dataVersion = joi.attempt(headers[HeaderNames.DATA_VERSION], joi.number());
        this.isSnapshot = joi.attempt(headers[HeaderNames.SNAPSHOT], joi.boolean());
        this.includeLinkedOperation = joi.attempt(
            headers[HeaderNames.INCLUDE_LINKED_OPER],
            joi.boolean(),
        );
        this.snapshotPageSize = joi.attempt(headers[HeaderNames.SNAPSHOT_PAGE_SIZE], joi.number());
        this.isPolling = joi.attempt(headers[HeaderNames.POLLING], joi.boolean());
        this.requestId = joi.attempt(headers[HeaderNames.REQUEST_ID], joi.string());
        this.upn = joi.attempt(headers[HeaderNames.UPN], joi.string());
        this.eventKind = joi.attempt(headers[HeaderNames.EVENT_KIND], joi.string());
        this.realityId = joi.attempt(headers[HeaderNames.REALITY_ID], joi.number());
        this.requestingSystemId = joi.attempt(headers[HeaderNames.REQUESTING_SYS], joi.string());
        this.requestingSystemName = joi.attempt(
            headers[HeaderNames.REQUESTING_SYS_NAME],
            joi.string(),
        );
    }
}
export interface HeadersConfiguration {
    dataVersion: boolean;
    realityId: boolean;
}
