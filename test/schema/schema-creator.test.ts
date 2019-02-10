import { InjectableResolver, InjectableType } from '../../src/common/injectable-interfaces';
import { PolarisSchemaCreator } from '../../src/schema/utils/schema-creator';

describe('schema-creator tests', () => {
    const typeImplMock: { [T in keyof InjectableType]: any } = {} as any;
    const resolverImplMock: { [T in keyof InjectableResolver]: any } = {
        resolver: jest.fn(),
    } as any;

    test('generateSchema - with types and resolvers - creates the schema with provided types', () => {
        const types = [typeImplMock];
        const resolvers = [resolverImplMock];
        jest.spyOn(types, 'map');
        jest.spyOn(resolvers, 'map');
        const schemaCreator = new PolarisSchemaCreator(types, resolvers);
        const schema = schemaCreator.generateSchema();

        expect(types.map).toHaveBeenCalled();
        expect(resolvers.map).toHaveBeenCalled();
        expect(resolverImplMock.resolver).toHaveBeenCalled();
        expect(schema.def).toContain('schema {query: Query, mutation: Mutation}');
    });
});
