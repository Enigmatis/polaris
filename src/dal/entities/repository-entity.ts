export interface RepositoryEntity {
    id: string;
    deleted: boolean;
    createdBy?: string;
    lastUpdatedBy?: string;
    creationDate: string;
    lastUpdateDate: string;
    dataVersion: number;
    realityId: string;
    classification?: string;
    secretGroups?: string[];
}

export function isRepositoryEntity(object: any): boolean {
    const joi = require('joi');
    const schema = joi.object().keys({
        id: joi.string().required(),
        deleted: joi.boolean().required(),
        createdBy: joi.string(),
        lastUpdatedBy: joi.string(),
        creationDate: joi.string().required(),
        lastUpdateDate: joi.string().required(),
        dataVersion: joi.number().required(),
        realityId: joi.string().required(),
        classification: joi.string(),
        secretGroups: joi.array().items(joi.string()),
    });
    return !joi.validate(object, schema, { stripUnknown: true }).err;
}
