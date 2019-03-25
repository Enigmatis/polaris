import * as joi from 'joi';

const schema = joi.object().keys({
    result: joi.array().items(joi.any()),
    irr: joi.array().items(joi.any()),
});

export function isContainsIrrelevant(candidate: object): boolean {
    if (!candidate) {
        return false;
    }
    return !joi.validate(candidate, schema, { stripUnknown: true }).error;
}
