class PolarisDirectiveWrapper {
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
}

class PolarisTypeWrapper {
    private _typeDefs: [string];
    private _schemaDirectives: any;

    constructor(typeDefs: [string], schemaDirectives: any = null) {
        this._typeDefs = typeDefs;
        this._schemaDirectives = schemaDirectives;
    }


    get typeDefs(): [string] {
        return this._typeDefs;
    }

    get schemaDirectives(): any {
        return this._schemaDirectives;
    }
}

export {PolarisTypeWrapper, PolarisDirectiveWrapper};
