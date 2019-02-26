import * as joi from 'joi';
export interface RepositoryEntity {
    id: string;
    deleted: boolean;
    createdBy?: string;
    lastUpdatedBy?: string;
    creationDate: string;
    lastUpdateDate: string;
    dataVersion: number;
    realityId: number;
    classification?: string;
    secretGroups?: string[];
}

const schema = joi.object().keys({
    _id: joi.object().required(),
    deleted: joi.boolean().required(),
    createdBy: joi.string(),
    lastUpdatedBy: joi.string(),
    creationDate: joi.object().required(),
    lastUpdateDate: joi.object().required(),
    dataVersion: joi.number().required(),
    realityId: joi.number().required(),
    classification: joi.string(),
    secretGroups: joi.array().items(joi.string()),
});

export function isRepositoryEntity(candidate: object): boolean {
    return !joi.validate(candidate, schema, { stripUnknown: true }).error;
}
