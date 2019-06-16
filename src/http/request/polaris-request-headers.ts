import { generateUUIDv4 } from '@bitjourney/uuid-v4';
import { PolarisRequestHeaders } from '@enigmatis/utills';
import { UserInputError } from 'apollo-server-koa';
import * as joi from 'joi';

const headersSchema = joi.object().keys({
    'data-version': joi.number(),
    'snap-request': joi.boolean(),
    'include-linked-oper': joi.boolean(),
    'snap-page-size': joi.number(),
    'request-id': joi.string(),
    'oicd-claim-upn': joi.string(),
    'reality-id': joi.number(),
    'requesting-sys': joi.string(),
    'requesting-sys-name': joi.string(),
});

export const getHeaders = (candidate: object): PolarisRequestHeaders => {
    const { error, value: validatedHeaders } = joi.validate(candidate, headersSchema, {
        stripUnknown: true,
    }) as { error: joi.ValidationError; value: { [key: string]: any } };
    if (error) {
        throw new UserInputError(error.message);
    } else {
        let requestId = validatedHeaders['request-id'];
        if (requestId === undefined) {
            requestId = generateUUIDv4();
        }

        return {
            dataVersion: validatedHeaders['data-version'],
            isSnapshot: validatedHeaders['snap-request'],
            includeLinkedOperation: validatedHeaders['include-linked-oper'],
            snapshotPageSize: validatedHeaders['snap-page-size'],
            requestId,
            upn: validatedHeaders['oicd-claim-upn'],
            realityId: validatedHeaders['reality-id'],
            requestingSystemId: validatedHeaders['requesting-sys'],
            requestingSystemName: validatedHeaders['requesting-sys-name'],
        };
    }
};
