import * as joi from 'joi';

const irrelevantEntitiesResponseSchema = joi.object().keys({
    relevantEntities: joi.array().items(joi.any()),
    irrelevantEntities: joi.array().items(joi.any()),
});

export function isIrrelevantEntitiesResponse(candidate: object): boolean {
    if (!candidate) {
        return false;
    }
    return !joi.validate(candidate, irrelevantEntitiesResponseSchema, { stripUnknown: true }).error;
}
