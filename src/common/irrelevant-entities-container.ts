export class IrrelevantEntitiesContainer {
    irrelevantContainer: any;

    constructor() {
        this.irrelevantContainer = {};
    }

    addIrrelevantEntitiesOfQuery(queryKey: string, irrelevantEntities: string[]): void {
        this.irrelevantContainer[queryKey] = irrelevantEntities;
    }

    getIrrelevantEntitiesPerQuery(): any {
        return this.irrelevantContainer;
    }
}
