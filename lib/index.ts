import sqlite3 from 'sqlite3';

type Taskify = {
  id: number;
  title: string;
  isChecked: boolean;
  created_at: string;
};

class TaskifyOrm {
  private db: sqlite3.Database;

  constructor(databaseName: string) {
    this.db = new sqlite3.Database(databaseName);
    this.initTable();
  }

  initTable(tableName: string = 'tasks') {
    const query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, isChecked BOOLEAN, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    this.db.run(query);
  }

  async createTask(title: string, isChecked: boolean = false, tableName: string = 'tasks'): Promise<Taskify> {
    const query = `INSERT INTO ${tableName} (title, isChecked) VALUES (?, ?)`;
    const params = [title, isChecked ? 1 : 0];
    const { lastID } = await this.run(query, params);
    return this.getTask(lastID, tableName);
  }

  async getTask(id: number, tableName: string = 'tasks'): Promise<Taskify> {
    const query = `SELECT * FROM ${tableName} WHERE id = ?`;
    const params = [id];
    const rows = await this.all(query, params);
    if (rows.length === 0) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return rows[0];
  }

  async updateTask(id: number, title?: string, isChecked?: boolean, tableName: string = 'tasks'): Promise<Taskify> {
    const currentTask = await this.getTask(id, tableName);
    const updatedTask: Taskify = {
      ...currentTask,
      title: title || currentTask.title,
      isChecked: isChecked !== undefined ? isChecked : currentTask.isChecked,
    };
    const query = `UPDATE ${tableName} SET title = ?, isChecked = ? WHERE id = ?`;
    const params = [updatedTask.title, updatedTask.isChecked ? 1 : 0, id];
    await this.run(query, params);
    return updatedTask;
  }

  async deleteTask(id: number, tableName: string = 'tasks'): Promise<void> {
    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    const params = [id];
    await this.run(query, params);
  }

  async getAllTasks(tableName: string = 'tasks'): Promise<Taskify[]> {
    const query = `SELECT * FROM ${tableName} ORDER BY created_at DESC`;
    const rows = await this.all(query);
    return rows;
  }

  async run(query: string, params: any[] = []): Promise<sqlite3.RunResult> {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  async all(query: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, function (err, rows) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export default TaskifyOrm;
