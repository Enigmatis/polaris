import { getHeaders } from '../../../src/http/request/polaris-request-headers';

describe('polaris-request-headers tests', () => {
    describe('data version header', () => {
        test('numeral header', () => {
            const headers = { 'data-version': 500 };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.dataVersion).toBe(headers['data-version']);
        });

        test('not numeral header', () => {
            const headers = { 'data-version': 'wow' };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a number');
        });
    });

    describe('snap request header', () => {
        test('boolean header', () => {
            const headers = { 'snap-request': true };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.isSnapshot).toBe(headers['snap-request']);
        });

        test('not boolean header', () => {
            const headers = { 'snap-request': 'wow' };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a boolean');
        });
    });

    describe('include linked oper header', () => {
        test('boolean header', () => {
            const headers = { 'include-linked-oper': true };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.includeLinkedOperation).toBe(
                headers['include-linked-oper'],
            );
        });

        test('not boolean header', () => {
            const headers = { 'include-linked-oper': 'wow' };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a boolean');
        });
    });

    describe('snap page size header', () => {
        test('numeral header', () => {
            const headers = { 'snap-page-size': 55 };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.snapshotPageSize).toBe(headers['snap-page-size']);
        });

        test('not numeral header', () => {
            const headers = { 'snap-page-size': 'wow' };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a number');
        });
    });

    describe('request-id header', () => {
        test('string header', () => {
            const headers = { 'request-id': 'wow' };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.requestId).toBe(headers['request-id']);
        });

        test('not string header', () => {
            const headers = { 'request-id': 55 };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a string');
        });
    });

    describe('upn header', () => {
        test('string header', () => {
            const headers = { upn: 'wow' };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.upn).toBe(headers.upn);
        });

        test('not string header', () => {
            const headers = { upn: 55 };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a string');
        });
    });

    describe('event kind header', () => {
        test('string header', () => {
            const headers = { 'event-kind': 'wow' };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.eventKind).toBe(headers['event-kind']);
        });

        test('not string header', () => {
            const headers = { 'event-kind': 55 };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a string');
        });
    });

    describe('reality id header', () => {
        test('number header', () => {
            const headers = { 'reality-id': 55 };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.realityId).toBe(headers['reality-id']);
        });

        test('not number header', () => {
            const headers = { 'reality-id': 'wow' };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a number');
        });
    });

    describe('requesting sys header', () => {
        test('string header', () => {
            const headers = { 'requesting-sys': 'wow' };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.requestingSystemId).toBe(headers['requesting-sys']);
        });

        test('not string header', () => {
            const headers = { 'requesting-sys': 55 };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a string');
        });
    });

    describe('requesting sys header', () => {
        test('string header', () => {
            const headers = { 'requesting-sys-name': 'wow' };
            const polarisRequestHeaders = getHeaders(headers);
            expect(polarisRequestHeaders.requestingSystemName).toBe(headers['requesting-sys-name']);
        });

        test('not string header', () => {
            const headers = { 'requesting-sys-name': 55 };
            expect(() => {
                getHeaders(headers);
            }).toThrowError('must be a string');
        });
    });
});
