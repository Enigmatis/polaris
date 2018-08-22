import {GraphQLServer, Options} from 'graphql-yoga'
import {GraphQLSchema} from 'graphql/type';
import {Props} from 'graphql-yoga/dist/types';

export class PolarisGraphQLServer {
    private server: GraphQLServer


    constructor(props: Props) {
        this.server = new GraphQLServer(props);
    }

    public start(options: Options): void {
        if (options == null) {
            options = {};
        }
        options.cors = this.getCors();
        this.server.start(options, ({ port }) =>
            console.log(
                `Server started, listening on port ${port}`,
            ),
        );

    }

    private getCors() {
        return {
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
            "preflightContinue": false,
            "optionsSuccessStatus": 204
        };
    }
};
