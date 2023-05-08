import sqlite3 from 'sqlite3';

interface Taskify {
  id: number;
  title: string;
  isChecked: boolean;
  created_at: string;
}

declare class TaskifyOrm {
  private db: sqlite3.Database;

  constructor(databaseName: string);

  initTable(tableName?: string): void;

  createTask(title: string, isChecked?: boolean, tableName?: string): Promise<Taskify>;

  getTask(id: number, tableName?: string): Promise<Taskify>;

  updateTask(id: number, title?: string, isChecked?: boolean, tableName?: string): Promise<Taskify>;

  deleteTask(id: number, tableName?: string): Promise<void>;

  getAllTasks(tableName?: string): Promise<Taskify[]>;

  run(query: string, params?: any[]): Promise<sqlite3.RunResult>;

  all(query: string, params?: any[]): Promise<any[]>;
}

export default TaskifyOrm;
