
export class PolarisRequestHeaders {
    readonly dataVersion?: number;
    readonly isSnapshot?: boolean;
    readonly includeLinkedOperation?: boolean;
    readonly snapshotPageSize?: number;
    readonly requestId?: string;
    readonly upn?: string;
    readonly eventKind?: string;
    readonly realityId?: string;
    readonly requestingSystemId?: string;
    readonly requestingSystemName?: string;

    constructor(headers: any) {
        const joi = require('joi');
        const schema = joi.object().keys({
            'data-version': joi.number(),
            'snap-request': joi.boolean(),
            'include-linked-oper': joi.boolean(),
            'snap-page-size': joi.boolean(),
            'request-id': joi.string(),
            upn: joi.string(),
            'event-kind': joi.string(),
            'reality-id': joi.string(),
            'requesting-sys': joi.string(),
            'requesting-sys-name': joi.string(),
        });
        const validHeaders = joi.validate(headers, schema, { stripUnknown: true });
        if (!validHeaders.error) {
            headers = validHeaders.value;
            this.dataVersion = headers['data-version'];
            this.isSnapshot = headers['snap-request'];
            this.includeLinkedOperation = headers['include-linked-oper'];
            this.snapshotPageSize = headers['snap-page-size'];
            this.requestId = headers['request-id'];
            this.upn = headers.upn;
            this.eventKind = headers['event-kind'];
            this.realityId = headers['reality-id'];
            this.requestingSystemId = headers['requesting-sys'];
            this.requestingSystemName = headers['requesting-sys-name'];
        }
    }
}

export interface HeadersConfiguration {
    dataVersion?: boolean;
    realityId?: boolean;
}
