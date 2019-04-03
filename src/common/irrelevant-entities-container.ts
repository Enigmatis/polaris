export class IrrelevantEntitiesContainer {
    irrelevantContainer: { [key: string]: string[] };

    constructor() {
        this.irrelevantContainer = {};
    }

    addIrrelevantEntitiesOfQuery(queryKey: string, irrelevantEntities: string[]): void {
        this.irrelevantContainer[queryKey] = irrelevantEntities;
    }
}
