import {SchemaDirectiveVisitor} from "graphql-tools";
class PolarisDirectiveWrapper {
    private readonly _directiveName: string;
    private readonly _directiveClass: any;


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
export = PolarisDirectiveWrapper;