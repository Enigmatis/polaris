import { GraphQLResolveInfo } from 'graphql';
import { IrrelevantEntitiesContainer } from '../../src/common/irrelevant-entities-container';
import { FilterExecutor } from '../../src/middlewares/filter-executor';
import { ResponseMiddlewareParams } from '../../src/middlewares/middleware';
import { PolarisContext } from '../../src/server/polaris-context';

const info: { [T in keyof GraphQLResolveInfo]: any } = {} as any;
const args = {};
const repositoryEntity: any = {
    _doc: {
        deleted: false,
        _id: { id: '5c5bf81a83e6e21ff08710ed' },
        title: 'zero',
        author: 'BiKoV',
        creationDate: {},
        lastUpdateDate: {},
        realityId: 0,
        dataVersion: 2,
    },
};
const onlyRepositoryEntities: any = [repositoryEntity];
const repositoryAndNotRepositoryEntities: any = [
    repositoryEntity,
    {
        _doc: {
            _id: { id: '5c5bf81a83e6e21ff08710ed' },
            title: 'zero',
            author: 'BiKoV',
            creationDate: {},
            lastUpdateDate: {},
            realityId: 0,
            dataVersion: 2,
        },
    },
    { title: 'not a repository entity' },
];
describe('filter resolver tests', () => {
    describe('not a sub entity', () => {
        const root = undefined;
        test('data version filter off', () => {
            const context: PolarisContext = {
                headers: { dataVersion: 3, realityId: 0 },
                body: {},
                irrelevantEntities: new IrrelevantEntitiesContainer(),
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result: onlyRepositoryEntities,
            };
            const filterExecutor = new FilterExecutor({
                allowDataVersionMiddleware: false,
                allowRealityMiddleware: true,
            });
            expect(filterExecutor.filterRootEntities(middlewareParams)).toEqual(
                onlyRepositoryEntities[0],
            );
        });
        test('reality id filter off', () => {
            const context: PolarisContext = {
                headers: { realityId: 1 },
                body: {},
                irrelevantEntities: new IrrelevantEntitiesContainer(),
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result: onlyRepositoryEntities,
            };
            const filterExecutor = new FilterExecutor({
                allowRealityMiddleware: false,
                allowDataVersionMiddleware: true,
            });
            expect(filterExecutor.filterRootEntities(middlewareParams)).toEqual(
                onlyRepositoryEntities[0],
            );
        });
        test('combined repository entities and not repository entities', () => {
            const context: PolarisContext = {
                headers: { realityId: 1 },
                body: {},
                irrelevantEntities: new IrrelevantEntitiesContainer(),
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result: repositoryAndNotRepositoryEntities,
            };
            const filterExecutor = new FilterExecutor({
                allowRealityMiddleware: false,
                allowDataVersionMiddleware: false,
            });
            expect(filterExecutor.filterRootEntities(middlewareParams)).toEqual(
                repositoryAndNotRepositoryEntities,
            );
        });
    });
    describe('sub entity', () => {
        const root: any = { realityId: 0, dataVersion: 1 };
        test('not a repository entity', () => {
            const entity = 'this is not a repository entity';
            const context: PolarisContext = {
                headers: { realityId: 1 },
                body: {},
                irrelevantEntities: new IrrelevantEntitiesContainer(),
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result: entity,
            };
            const filterExecutor = new FilterExecutor({
                allowDataVersionMiddleware: true,
                allowRealityMiddleware: true,
            });
            expect(filterExecutor.filterSubEntity(middlewareParams)).toEqual(entity);
        });
        test('is a repository entity and reality id filter off', () => {
            const context: PolarisContext = {
                headers: { realityId: 1 },
                body: {},
                irrelevantEntities: new IrrelevantEntitiesContainer(),
            };
            const middlewareParams: ResponseMiddlewareParams = {
                root,
                args,
                context,
                info,
                result: onlyRepositoryEntities[0]._doc,
            };
            const filterExecutor = new FilterExecutor({
                allowRealityMiddleware: false,
                allowDataVersionMiddleware: true,
            });
            expect(filterExecutor.filterSubEntity(middlewareParams)).toEqual(
                onlyRepositoryEntities[0]._doc,
            );
        });
    });
});
