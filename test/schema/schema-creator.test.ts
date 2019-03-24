import {
    InjectableResolver,
    InjectableType,
    PolarisServerConfig,
} from '../../src/common/injectable-interfaces';
import { PolarisSchemaCreator } from '../../src/schema/utils/schema-creator';

describe('schema-creator tests', () => {
    test('generateSchema - with types and resolvers - creates the schema with provided types and resolvers', () => {
        const types: InjectableType[] = [
            { definition: 'foo' },
            { definition: 'bar' },
            { definition: 'hello' },
            { definition: 'world' },
        ];
        const resolvers: InjectableResolver[] = [
            { resolver: jest.fn(() => ({ first: jest.fn() })) },
            { resolver: jest.fn(() => ({ second: jest.fn() })) },
            { resolver: jest.fn(() => ({ third: jest.fn() })) },
            { resolver: jest.fn(() => ({ fourth: jest.fn() })) },
        ];

        const properties: any = {
            polarisProperties: { includeSubscription: false },
        };

        const schemaCreator = new PolarisSchemaCreator(types, resolvers, properties);
        const schema = schemaCreator.generateSchema();

        expect(schema.def).toContain('schema {query: Query, mutation: Mutation}');
        for (const type of types) {
            expect(schema.def).toContain(type.definition);
        }
        const expectedResolvers = Object.assign({}, ...resolvers.map(x => x.resolver()));
        expect(Object.keys(schema.resolvers)).toEqual(Object.keys(expectedResolvers));
    });
});
