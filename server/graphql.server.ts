import {GraphQLServer, Options} from 'graphql-yoga'
import {Props} from 'graphql-yoga/dist/types';

export class PolarisGraphQLServer {
    private server: GraphQLServer;

    constructor(props: Props) {
        this.server = new GraphQLServer(props);
    }

    public start(options: Options): void {
        if (options == null) {
            options = {};
        }
        options.cors = PolarisGraphQLServer.getCors();
        this.server.start(options, ({port}) => {
                console.log(`
                --------
                Polaris server is started on port ${port}                
                / Developed by @enigmatis team /
                `
                );
            }
            ,
        )
        ;

    }

    private static getCors() {
        return {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        };
    }
}
;
