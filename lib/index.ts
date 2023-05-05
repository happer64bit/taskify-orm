import sqlite3 from 'sqlite3';

class TaskOrm {
    private databaseName: string = ":memory:"; // store on memory as default
    private db = new sqlite3.Database(this.databaseName);

    constructor(file: string) {
        this.databaseName = file
    }

    query(query: string, params: any[]) {
        this.db.serialize(() => {
            const stmt = this.db.prepare(query);
            stmt.run(params);
            stmt.finalize();
        });

        this.db.close();
    }

    createTaskTable(name: string) {
        const tableName = name.toString().replace(/[^a-zA-Z0-9]/g, ""); // sanitize table name
        const query = `CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, isChecked TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

        this.query(query, []);
    }

    createKey(tableName: string, title: string) {
        const sanitizedTableName = tableName.toString().replace(/[^a-zA-Z0-9]/g, ""); // sanitize table name
        const query = `INSERT INTO ${sanitizedTableName} (title, isChecked) VALUES (?, ?)`;
        const params = [title, '0']; // initialize isChecked as '0' (unchecked)

        this.query(query, params);
    }

    deleteKey(tableName: string, id: string) {
        const sanitizedTableName = tableName.toString().replace(/[^a-zA-Z0-9]/g, ""); // sanitize table name
        const query = `DELETE FROM ${sanitizedTableName} WHERE id = ?`;
        const params = [id];

        this.query(query, params);
    }

    deleteTable(tableName: string) {
        const sanitizedTableName = tableName.toString().replace(/[^a-zA-Z0-9]/g, ""); // sanitize table name
        const query = `DROP TABLE IF EXISTS ${sanitizedTableName}`;

        this.query(query, []);
    }

    setChecked(tableName: string, id: string, isChecked: boolean) {
        const sanitizedTableName = tableName.toString().replace(/[^a-zA-Z0-9]/g, ""); // sanitize table name
        const query = `UPDATE ${sanitizedTableName} SET isChecked = ? WHERE id = ?`;
        const params = [isChecked ? '1' : '0', id];
    
        this.query(query, params);
    }
    
    async getAllTable(): Promise<string[]> {
        const query = `SELECT table_name FROM __created__tables__log__`;
        let result: string[] = [];
        await new Promise((resolve, reject) => {
            this.db.all(query, [], (err, rows) => {
                if (err) reject(err);
                else {
                    // @ts-ignore
                    result = rows.map((row) => row.table_name);
                    // @ts-ignore
                    resolve();
                }
            });
        });
        return result;
    }

    async fetchAllInTable(tableName: string): Promise<any[]> {
        const sanitizedTableName = tableName.toString().replace(/[^a-zA-Z0-9]/g, ''); // sanitize table name
        const query = `SELECT * FROM ${sanitizedTableName}`;

        return new Promise((resolve, reject) => {
            this.db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

}

export default TaskOrm