import sqlite3 from 'sqlite3';

type Task = {
  id: number;
  title: string;
  isChecked: boolean;
  created_at: string;
};

class TaskOrm {
  private db: sqlite3.Database;

  constructor(databaseName: string) {
    this.db = new sqlite3.Database(databaseName);
    this.initTable();
  }

  initTable() {
    const query = `CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, isChecked BOOLEAN, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    this.db.run(query);
  }

  async createTask(title: string, isChecked: boolean = false): Promise<Task> {
    const query = `INSERT INTO tasks (title, isChecked) VALUES (?, ?)`;
    const params = [title, isChecked ? 1 : 0];
    const { lastID } = await this.run(query, params);
    return this.getTask(lastID);
  }

  async getTask(id: number): Promise<Task> {
    const query = `SELECT * FROM tasks WHERE id = ?`;
    const params = [id];
    const rows = await this.all(query, params);
    if (rows.length === 0) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return rows[0];
  }

  async updateTask(id: number, title?: string, isChecked?: boolean): Promise<Task> {
    const currentTask = await this.getTask(id);
    const updatedTask: Task = {
      ...currentTask,
      title: title || currentTask.title,
      isChecked: isChecked !== undefined ? isChecked : currentTask.isChecked,
    };
    const query = `UPDATE tasks SET title = ?, isChecked = ? WHERE id = ?`;
    const params = [updatedTask.title, updatedTask.isChecked ? 1 : 0, id];
    await this.run(query, params);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    const query = `DELETE FROM tasks WHERE id = ?`;
    const params = [id];
    await this.run(query, params);
  }

  async getAllTasks(): Promise<Task[]> {
    const query = `SELECT * FROM tasks ORDER BY created_at DESC`;
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

export default TaskOrm;
