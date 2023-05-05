declare class TaskOrm {
    private databaseName;
    private db;
    constructor(file: string);
    query(query: string, params: any[]): void;
    createTaskTable(name: string): void;
    createKey(tableName: string, title: string): void;
    deleteKey(tableName: string, id: string): void;
    getAllTable(): Promise<string[]>;
    fetchAllInTable(tableName: string): Promise<any[]>;
    setChecked(tableName: string, id: string, isChecked: boolean): void;
}

export default TaskOrm;
