import * as joi from 'joi';

export class PolarisRequestHeaders {
    dataVersion?: number;
    isSnapshot?: boolean;
    includeLinkedOperation?: boolean;
    snapshotPageSize?: number;
    requestId?: string;
    upn?: string;
    eventKind?: string;
    realityId?: string;
    requestingSystemId?: string;
    requestingSystemName?: string;
    headers: any;

    constructor(headers: any) {
        this.headers = headers;
    }

    validate(): joi.ValidationError | null {
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
        const validHeaders = joi.validate(this.headers, schema, { stripUnknown: true });
        if (!validHeaders.error) {
            this.headers = validHeaders.value;
            this.dataVersion = this.headers['data-version'];
            this.isSnapshot = this.headers['snap-request'];
            this.includeLinkedOperation = this.headers['include-linked-oper'];
            this.snapshotPageSize = this.headers['snap-page-size'];
            this.requestId = this.headers['request-id'];
            this.upn = this.headers.upn;
            this.eventKind = this.headers['event-kind'];
            this.realityId = this.headers['reality-id'];
            this.requestingSystemId = this.headers['requesting-sys'];
            this.requestingSystemName = this.headers['requesting-sys-name'];
        }
        return validHeaders.error;
    }
}

export interface HeadersConfiguration {
    dataVersion?: boolean;
    realityId?: boolean;
}
