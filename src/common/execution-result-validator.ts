import * as joi from 'joi';

const executionResultSchema = joi.object().keys({
    result: joi.any(),
    executionMetadata: joi.any(),
});

export function isExecutionResultResponse(candidate: object): boolean {
    if (!candidate) {
        return false;
    }
    return !joi.validate(candidate, executionResultSchema, { stripUnknown: true }).error;
}
