import { PolarisLogger, PolarisLogProperties } from '@enigmatis/polaris-logs';
import { inject, injectable } from 'inversify';
import { LogConfig, PolarisServerConfig } from '../common/injectable-interfaces';
import { POLARIS_TYPES } from '../inversion-of-control/polaris-types';
import { PolarisContext } from '../server/polaris-context';

@injectable()
export class GraphqlLogger<TContext extends PolarisContext = PolarisContext> {
    private polarisLogger: PolarisLogger;

    constructor(
        @inject(POLARIS_TYPES.LogConfig) logConfig: LogConfig,
        @inject(POLARIS_TYPES.PolarisServerConfig) propertiesConfig: PolarisServerConfig,
    ) {
        this.polarisLogger = new PolarisLogger(
            propertiesConfig.getApplicationLogProperties(),
            logConfig.getLogConfiguration(),
        );
    }

    fatal(
        message: string,
        options: {
            context?: TContext;
            polarisLogProperties?: PolarisLogProperties;
        },
    ): void {
        this.polarisLogger.fatal(
            message,
            options && this.buildLogProperties(options.context, options.polarisLogProperties),
        );
    }

    error(
        message: string,
        options: {
            context?: TContext;
            polarisLogProperties?: PolarisLogProperties;
        },
    ): void {
        this.polarisLogger.error(
            message,
            options && this.buildLogProperties(options.context, options.polarisLogProperties),
        );
    }

    warn(
        message: string,
        options: {
            context?: TContext;
            polarisLogProperties?: PolarisLogProperties;
        },
    ): void {
        this.polarisLogger.warn(
            message,
            options && this.buildLogProperties(options.context, options.polarisLogProperties),
        );
    }

    info(
        message: string,
        options: {
            context?: TContext;
            polarisLogProperties?: PolarisLogProperties;
        },
    ): void {
        this.polarisLogger.info(
            message,
            options && this.buildLogProperties(options.context, options.polarisLogProperties),
        );
    }

    trace(
        message: string,
        options: {
            context?: TContext;
            polarisLogProperties?: PolarisLogProperties;
        },
    ): void {
        this.polarisLogger.trace(
            message,
            options && this.buildLogProperties(options.context, options.polarisLogProperties),
        );
    }

    debug(
        message: string,
        options: {
            context?: TContext;
            polarisLogProperties?: PolarisLogProperties;
        },
    ): void {
        this.polarisLogger.debug(
            message,
            options && this.buildLogProperties(options.context, options.polarisLogProperties),
        );
    }

    private buildLogProperties(
        context?: TContext,
        polarisLogProperties: PolarisLogProperties = {},
    ): PolarisLogProperties {
        const contextProperties: PolarisLogProperties | undefined = context &&
            context.headers && {
                requestId: context.headers.requestId,
                upn: context.headers.upn,
                eventKind: context.headers.eventKind,
                reality: {
                    id: context.headers.realityId,
                },
                eventKindDescription: {
                    requestingSystemId: context.headers.requestingSystemId,
                },
                request: {
                    requestingSystem: {
                        name: context.headers.requestingSystemName,
                        id: context.headers.requestingSystemId,
                    },
                },
            };
        return { ...contextProperties, ...polarisLogProperties };
    }
}
