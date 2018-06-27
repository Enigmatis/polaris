import {IExecutableSchemaDefinition, SchemaDirectiveVisitor} from "graphql-tools";
export class PolarisDirectiveWrapper {
    private _directiveName: string;
    private _directiveClass: any;


    constructor(directiveName: string, directiveClass: any) {
        this._directiveName = directiveName;
        this._directiveClass = directiveClass;
    }


    get directiveName(): string {
        return this._directiveName;
    }

    get directiveClass(): any {
        return this._directiveClass;
    }

    toDirective(): {
        [name: string]: typeof SchemaDirectiveVisitor;
    } {
        return {[this.directiveName]: this.directiveClass};
    }
}

export class PolarisTypeWrapper implements IExecutableSchemaDefinition {
    private _typeDefs: string[];
    private _resolvers?: any;
    private _schemaDirectives?: {
        [name: string]: typeof SchemaDirectiveVisitor;
    };

    constructor(typeDefs: string[], resolvers?: any, schemaDirectives?: {
        [name: string]: typeof SchemaDirectiveVisitor;
    }) {
        this._typeDefs = typeDefs;
        this._resolvers = resolvers;
        this._schemaDirectives = schemaDirectives;
    }

    get resolvers(): any {
        return this._resolvers;
    }

    get typeDefs(): string[] {
        return this._typeDefs;
    }

    get schemaDirectives(): {
        [name: string]: typeof SchemaDirectiveVisitor;
    } {
        return this._schemaDirectives;
    }
}

// export {PolarisTypeWrapper, PolarisDirectiveWrapper};
