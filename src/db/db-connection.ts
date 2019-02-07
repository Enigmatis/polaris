export interface DbConnection {
    initConnection(): Promise<void>;

    closeConnection(): Promise<void>;
}
