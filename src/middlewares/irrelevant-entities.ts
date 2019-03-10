class IrrelevantEntities {
    irrelevantIds: string[];

    constructor() {
        this.irrelevantIds = [];
    }

    getIrrelevant(): string[] {
        return this.irrelevantIds;
    }
}

export const IrrelevantEntitiesContainer = new IrrelevantEntities();
