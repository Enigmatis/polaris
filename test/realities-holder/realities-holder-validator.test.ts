import 'reflect-metadata';
import { PolarisContext, RealitiesHolder } from '../../src/main';
import { RealitiesHolderValidator } from '../../src/realities-holder/realities-holder-validator';

describe('realities-holder-validator tests', () => {
    const polarisContextMock: { [T in keyof PolarisContext]: any } = {
        headers: {
            realityId: jest.fn(),
        },
    } as any;

    test('validating supported reality', () => {
        const realitiesHolderMock: { [T in keyof RealitiesHolder]: any } = {
            isRealitySupported: () => true,
        } as any;

        const realitiesHolderValidator = new RealitiesHolderValidator(realitiesHolderMock);

        expect(() => {
            realitiesHolderValidator.validateRealitySupport(polarisContextMock);
        }).not.toThrow();
    });

    test('validating unsupported reality', () => {
        const realitiesHolderMock: { [T in keyof RealitiesHolder]: any } = {
            isRealitySupported: () => false,
        } as any;

        const realitiesHolderValidator = new RealitiesHolderValidator(realitiesHolderMock);

        expect(() => {
            realitiesHolderValidator.validateRealitySupport(polarisContextMock);
        }).toThrow();
    });
});
