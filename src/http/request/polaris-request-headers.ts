import { PolarisRequestHeaders } from '@enigmatis/utills';
import * as joi from 'joi';

const headersSchema = joi.object().keys({
    'data-version': joi.number(),
    'snap-request': joi.boolean(),
    'include-linked-oper': joi.boolean(),
    'snap-page-size': joi.number(),
    'request-id': joi.string(),
    upn: joi.string(),
    'event-kind': joi.string(),
    'reality-id': joi.number(),
    'requesting-sys': joi.string(),
    'requesting-sys-name': joi.string(),
});

export const getHeaders = (candidate: object): PolarisRequestHeaders => {
    const { error, value: validatedHeaders } = joi.validate(candidate, headersSchema, {
        stripUnknown: true,
    }) as { error: joi.ValidationError; value: { [key: string]: any } };
    if (error) {
        throw error;
    } else {
        return {
            dataVersion: validatedHeaders['data-version'],
            isSnapshot: validatedHeaders['snap-request'],
            includeLinkedOperation: validatedHeaders['include-linked-oper'],
            snapshotPageSize: validatedHeaders['snap-page-size'],
            requestId: validatedHeaders['request-id'],
            upn: validatedHeaders.upn,
            eventKind: validatedHeaders['event-kind'],
            realityId: validatedHeaders['reality-id'],
            requestingSystemId: validatedHeaders['requesting-sys'],
            requestingSystemName: validatedHeaders['requesting-sys-name'],
        };
    }
};
